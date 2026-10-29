# Portfólio — Eduardo Leite

Portfólio pessoal em React com visual inspirado nas imagens da pasta `stylereference`. A página apresenta QualiQ, Codei e Ninho, com capturas dos projetos. As três galerias alternam as imagens automaticamente em ciclo contínuo a cada cinco segundos e mostram as capturas inteiras, sem cortes. Também é possível avançar ao clicar ou tocar.

## Executar

Requer Node.js 24.x e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.jsx`: conteúdo, navegação, alternância PT/EN e componentes da página.
- `src/App.css`: layout responsivo e identidade visual.
- `src/data/projects.js`: projetos selecionados, tecnologias e links.
- `public/projects/`: capturas exibidas nos cards dos projetos.
- `public/eduardo-avatar.png`: foto pública do perfil do GitHub, armazenada localmente.

Os projetos são uma seleção editorial salva no código para que o site funcione sem depender da API do GitHub em tempo de execução. Para atualizar a seleção, edite `src/data/projects.js` e as imagens em `public/projects/`.
