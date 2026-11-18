import { useEffect } from "react";
import { toCanvas } from "html-to-image";

export const CLICKS_TO_BREAK = 8;
const CLICK_WINDOW = 1800;
const BREAK_DURATION = 260;
const BROKEN_HOLD = 300;
const REBUILD_DURATION = 300;
const SHATTER_DURATION = BREAK_DURATION + BROKEN_HOLD + REBUILD_DURATION;
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

async function captureCard(card) {
  const bounds = card.getBoundingClientRect();
  const stage = document.createElement("div");
  const clone = card.cloneNode(true);
  Object.assign(stage.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${bounds.width}px`,
    height: `${bounds.height}px`,
    pointerEvents: "none",
  });
  clone.removeAttribute("data-glitch-prop");
  clone.removeAttribute("data-damage");
  clone.removeAttribute("data-reveal");
  clone.removeAttribute("role");
  clone.removeAttribute("tabindex");
  clone.removeAttribute("aria-describedby");
  clone.classList.remove("is-breaking", "is-charging", "is-tapped");
  Object.assign(clone.style, {
    position: "relative",
    inset: "auto",
    left: "0",
    top: "0",
    width: `${bounds.width}px`,
    height: `${bounds.height}px`,
    margin: "0",
    transform: "none",
    translate: "none",
    animation: "none",
    opacity: "1",
    visibility: "visible",
  });
  clone.style.removeProperty("--charge");
  clone.style.removeProperty("--damage-opacity");
  stage.append(clone);
  document.body.append(stage);

  try {
    return await toCanvas(clone, { pixelRatio: 1, cacheBust: false });
  } finally {
    stage.remove();
  }
}

function makeSnapshotFragments(snapshot, bounds, impactX, impactY) {
  const columns = Math.min(snapshot.width, clamp(Math.round(bounds.width / 130), bounds.width > 120 ? 2 : 1, 5));
  const rows = Math.min(snapshot.height, clamp(Math.round(bounds.height / 95), bounds.height > 120 ? 2 : 1, 4));
  const scaleX = snapshot.width / bounds.width;
  const scaleY = snapshot.height / bounds.height;
  const fragments = [];

  for (let column = 0; column < columns; column += 1) {
    const sourceX = Math.round((column * snapshot.width) / columns);
    const nextX = Math.round(((column + 1) * snapshot.width) / columns);
    for (let row = 0; row < rows; row += 1) {
      const sourceY = Math.round((row * snapshot.height) / rows);
      const nextY = Math.round(((row + 1) * snapshot.height) / rows);
      const x = sourceX / scaleX;
      const y = sourceY / scaleY;
      const width = (nextX - sourceX) / scaleX;
      const height = (nextY - sourceY) / scaleY;
      const distanceX = x + width / 2 - impactX;
      const distanceY = y + height / 2 - impactY;
      const distance = Math.hypot(distanceX, distanceY) || 1;
      const reach = 25 + Math.random() * 60 + distance * 0.2;

      fragments.push({
        x,
        y,
        width,
        height,
        sourceX,
        sourceY,
        sourceWidth: nextX - sourceX,
        sourceHeight: nextY - sourceY,
        dx: (distanceX / distance) * reach + (Math.random() - 0.5) * 35,
        dy: (distanceY / distance) * reach + (Math.random() - 0.5) * 35,
        delay: Math.random() * 80 + Math.min(50, distance * 0.15),
      });
    }
  }

  return fragments;
}

function startPixelBurst(overlay, card, bounds, impactX, impactY, snapshot) {
  const cardStyle = getComputedStyle(card);
  overlay.style.setProperty(
    "--glitch-impact-color",
    parseFloat(cardStyle.borderTopWidth) > 0 ? cardStyle.borderTopColor : cardStyle.color,
  );
  const pixels = makeSnapshotFragments(snapshot, bounds, impactX, impactY);
  const leftPadding = Math.ceil(Math.max(0, ...pixels.map((pixel) => -Math.min(pixel.x, pixel.x + pixel.dx))) + 16);
  const topPadding = Math.ceil(Math.max(0, ...pixels.map((pixel) => -Math.min(pixel.y, pixel.y + pixel.dy))) + 16);
  const rightPadding = Math.ceil(Math.max(0, ...pixels.map((pixel) => Math.max(pixel.x, pixel.x + pixel.dx) + pixel.width - bounds.width)) + 16);
  const bottomPadding = Math.ceil(Math.max(0, ...pixels.map((pixel) => Math.max(pixel.y, pixel.y + pixel.dy) + pixel.height - bounds.height)) + 16);
  const canvas = document.createElement("canvas");
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = bounds.width + leftPadding + rightPadding;
  const height = bounds.height + topPadding + bottomPadding;
  canvas.className = "glitch-shatter__canvas";
  canvas.style.left = `${-leftPadding}px`;
  canvas.style.top = `${-topPadding}px`;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil(height * ratio);
  overlay.append(canvas);

  const context = canvas.getContext("2d");
  if (!context) return () => {};
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.imageSmoothingEnabled = false;
  const start = performance.now();
  let frame = 0;

  const draw = (now) => {
    const elapsed = now - start;
    context.clearRect(0, 0, width, height);
    for (const pixel of pixels) {
      let displacement;
      if (elapsed < BREAK_DURATION) {
        const progress = clamp((elapsed - pixel.delay) / (BREAK_DURATION - pixel.delay), 0, 1);
        displacement = 1 - (1 - progress) ** 3;
      } else if (elapsed < BREAK_DURATION + BROKEN_HOLD) {
        displacement = 1;
      } else {
        const progress = clamp((elapsed - BREAK_DURATION - BROKEN_HOLD) / REBUILD_DURATION, 0, 1);
        displacement = 1 - progress ** 3;
      }
      const x = pixel.x + pixel.dx * displacement + leftPadding;
      const y = pixel.y + pixel.dy * displacement + topPadding;
      context.drawImage(
        snapshot,
        pixel.sourceX, pixel.sourceY, pixel.sourceWidth, pixel.sourceHeight,
        x, y, pixel.width, pixel.height,
      );
    }
    if (elapsed < SHATTER_DURATION) frame = requestAnimationFrame(draw);
  };

  draw(start);
  return () => cancelAnimationFrame(frame);
}

export function useGlitchProps(reducedMotion, language) {
  useEffect(() => {
    if (reducedMotion) return;

    let disposed = false;
    const cards = [...document.querySelectorAll("[data-glitch-prop]")];
    const overlays = new Set();
    const pixelBursts = new Map();
    const timers = new Set();
    const listeners = [];

    const later = (callback, delay) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);
      timers.add(timer);
      return timer;
    };

    const shatter = (card, event, snapshot) => {
      const bounds = card.getBoundingClientRect();
      const impactX = event && "clientX" in event ? event.clientX - bounds.left : bounds.width / 2;
      const impactY = event && "clientY" in event ? event.clientY - bounds.top : bounds.height / 2;
      const overlay = document.createElement("div");
      overlay.className = "glitch-shatter";
      overlay.setAttribute("aria-hidden", "true");
      Object.assign(overlay.style, {
        left: `${bounds.left}px`,
        top: `${bounds.top}px`,
        width: `${bounds.width}px`,
        height: `${bounds.height}px`,
      });
      overlay.style.setProperty("--impact-x", `${impactX}px`);
      overlay.style.setProperty("--impact-y", `${impactY}px`);

      document.body.append(overlay);
      overlays.add(overlay);
      pixelBursts.set(overlay, startPixelBurst(overlay, card, bounds, impactX, impactY, snapshot));
      card.classList.remove("is-charging", "is-tapped");
      card.removeAttribute("data-damage");
      card.style.removeProperty("--charge");
      card.style.removeProperty("--damage-opacity");
      card.classList.add("is-breaking");

      later(() => {
        pixelBursts.get(overlay)?.();
        pixelBursts.delete(overlay);
        overlay.remove();
        overlays.delete(overlay);
        card.classList.remove("is-breaking");
      }, SHATTER_DURATION + 34);
    };

    cards.forEach((card) => {
      let clicks = 0;
      let lastClick = 0;
      let resetTimer = 0;
      let capturing = false;
      let snapshotPromise = null;

      const getSnapshot = () => {
        if (!snapshotPromise) snapshotPromise = captureCard(card).catch(() => null);
        return snapshotPromise;
      };

      const activate = async (event) => {
        if (capturing || card.classList.contains("is-breaking")) return;
        const now = performance.now();
        if (now - lastClick > CLICK_WINDOW) clicks = 0;
        lastClick = now;
        clicks += 1;
        window.clearTimeout(resetTimer);
        timers.delete(resetTimer);

        if (clicks >= CLICKS_TO_BREAK) {
          clicks = 0;
          capturing = true;
          card.classList.add("is-capturing");
          const impact = "clientX" in event
            ? { clientX: event.clientX, clientY: event.clientY }
            : null;
          const snapshot = (await getSnapshot()) || (await captureCard(card).catch(() => null));
          card.classList.remove("is-capturing");
          capturing = false;
          snapshotPromise = null;
          if (disposed || !card.isConnected) return;
          if (snapshot) {
            shatter(card, impact, snapshot);
          } else {
            card.classList.remove("is-charging", "is-tapped");
            card.removeAttribute("data-damage");
            card.style.removeProperty("--charge");
            card.style.removeProperty("--damage-opacity");
          }
          return;
        }

        card.style.setProperty("--charge", `${Math.round((clicks / CLICKS_TO_BREAK) * 100)}%`);
        card.style.setProperty("--damage-opacity", String(Math.min(0.9, 0.22 + clicks * 0.09)));
        card.setAttribute("data-damage", String(clicks));
        card.classList.add("is-charging");
        card.classList.remove("is-tapped");
        // Restart the small feedback pulse for each click.
        void card.offsetWidth;
        card.classList.add("is-tapped");
        later(() => card.classList.remove("is-tapped"), 180);
        resetTimer = later(() => {
          clicks = 0;
          snapshotPromise = null;
          card.classList.remove("is-charging");
          card.removeAttribute("data-damage");
          card.style.removeProperty("--charge");
          card.style.removeProperty("--damage-opacity");
        }, CLICK_WINDOW);
        if (clicks === CLICKS_TO_BREAK - 3) void getSnapshot();
      };

      const click = (event) => {
        if (event.target.closest("a, button, input, select, textarea")) return;
        activate(event);
      };
      const keydown = (event) => {
        if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        activate(event);
      };

      card.addEventListener("click", click);
      card.addEventListener("keydown", keydown);
      listeners.push(() => {
        card.removeEventListener("click", click);
        card.removeEventListener("keydown", keydown);
      });
    });

    return () => {
      disposed = true;
      listeners.forEach((remove) => remove());
      timers.forEach((timer) => window.clearTimeout(timer));
      pixelBursts.forEach((stop) => stop());
      overlays.forEach((overlay) => overlay.remove());
      cards.forEach((card) => {
        card.classList.remove("is-breaking", "is-charging", "is-tapped", "is-capturing");
        card.removeAttribute("data-damage");
        card.style.removeProperty("--charge");
        card.style.removeProperty("--damage-opacity");
      });
    };
  }, [reducedMotion, language]);
}
