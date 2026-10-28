# Portfólio — Eduardo Leite

Portfólio pessoal em React com visual inspirado nas imagens da pasta `stylereference`. A página apresenta Ninho, Codei e CheckSerie, os projetos públicos mais recentes do [GitHub de Eduardo](https://github.com/oeduardodev?tab=repositories) consultados em 27/10/2026.

## Executar

Requer Node.js 20.19+ ou 22.12+ e npm.

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
- `public/eduardo-avatar.png`: foto pública do perfil do GitHub, armazenada localmente.

Os projetos são uma seleção editorial salva no código para que o site funcione sem depender da API do GitHub em tempo de execução. Para atualizar a seleção, edite `src/data/projects.js` após conferir os repositórios e seus links.
