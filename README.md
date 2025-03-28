This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🚀 Tech Lead Skill Dashboard
Tech Lead Skill Dashboard é um painel interativo, responsivo e altamente visual que apresenta o domínio técnico de um profissional sênior em tecnologia. O projeto combina gráficos dinâmicos, animações sofisticadas e integração com o GitHub para representar com precisão as habilidades técnicas, métricas de produtividade e expertise arquitetural de um Tech Lead.

🧠 Funcionalidades Avançadas
🎯 Visualização analítica de skills por meio de gráficos circulares, radiais e de linha.

📊 Gráficos dinâmicos com Chart.js & Recharts para representar evolução e distribuição de habilidades.

🔁 Integração real com a GitHub API, exibindo projetos, estrelas, linguagens e tendências.

🧩 Sidebar interativa e futurista, com transições suaves, efeitos de glow e navegação entre seções.

🚀 Scroll infinito animado de repositórios usando CardProject com controle de direção e pausa.

🌐 Visual responsivo, compatível com desktops widescreen e otimizado para escalabilidade.

💡 UI com design neon + glassmorphism, simulando dashboards modernos estilo DevOps e portfólios de liderança.

🧪 Tecnologias Aplicadas
Next.js + React: Estrutura SSR com foco em performance e modularidade.

TypeScript: Tipagem avançada para segurança e escalabilidade do código.

TailwindCSS: Estilização de alto desempenho com classes utilitárias modernas.

Framer Motion: Animações suaves e responsivas com base em estados.

Chart.js + Recharts: Gráficos de linha, área e radar com efeitos visuais e gradientes.

Styled-components: Customização CSS avançada, aplicada no componente ReactIcon.

GitHub API: Consumo em tempo real para listar e mapear repositórios e linguagens.

📐 Metodologias e Arquitetura
Componentização Avançada: Separação de responsabilidades (Charts, CardSkill, Sidebar, CardProject).

Clean Architecture: Organização clara e modular para escalar o projeto futuramente.

Motion-First Design: Animações nativas baseadas em interações (hover, scroll, tempo).

Mobile Responsiveness (em progresso): Design pensado para escalabilidade visual.

Design System Visual Futurista: Baseado em conceitos de neon, vidro e sombra dinâmica.

📁 Estrutura de Componentes
Componente	Função
Dashboard.tsx	Painel principal com integração de charts, radar e skills
ChartSkill.tsx	Cards com ícones e progresso circular animado (com CircleProgress)
Chart.tsx	Gráfico de linha com distribuições técnicas e tooltip customizado
Charts.tsx	Gráfico de área com métricas diárias (ações, commits, queries)
MiniCard.tsx	Scroll animado de mini repositórios com hover glow
CardProject.tsx	Scroll horizontal automático e manual dos repositórios do GitHub
SideBar.tsx	Menu lateral com navegação temática, avatar e links funcionais
ReactIcon.tsx	Efeito visual animado do símbolo do React com CSS via styled-components
CardSkill.tsx	Alternativa de exibição detalhada das skills (substituído por radar)
🌍 Deploy & Uso
Este projeto pode ser facilmente publicado no Vercel, Netlify ou GitHub Pages via Next.js export estático.

bash
Copiar
Editar
# Instalação
yarn install

# Desenvolvimento local
yarn dev

# Build para produção
yarn build
yarn start
📌 Você pode adicionar variáveis como GITHUB_USERNAME para tornar a integração dinâmica por ambiente.

🏆 Ideal para...
Portfólios técnicos de desenvolvedores sêniores

Demonstrações de habilidades analíticas em entrevistas

Apresentações de arquitetura e liderança técnica

Showcase para equipes de DevOps, Fullstack e Engenharia de Software

🧬 Exemplo de stack exibida no radar:
React.js, Next.js, Node.js, TypeScript, PostgreSQL

C#, Python, Java, Docker, GitHub Actions, Cloud

Arquitetura de Software, QA Lead, Backend e Frontend

📎 Autor
Desenvolvido por @devopscomputer com foco em excelência visual e técnica.
Conceito de Tech Lead com experiência em múltiplas stacks, arquitetura moderna e engenharia de software de alto nível.

