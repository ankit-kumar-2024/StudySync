# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

src/
├── components/
│ ├── common/
│ │ └── Icons.jsx
│ └── layout/
│ ├── AppLayout.jsx
│ ├── Footer.jsx
│ ├── Header.jsx
│ ├── LeftSidebar.jsx
│ └── RightSidebar.jsx
├── pages/
│ ├── AssignmentsPage.jsx <-- Added (Module 6)
│ ├── BooksPage.jsx
│ ├── ChatPage.jsx
│ ├── DashboardPage.jsx
│ ├── LoginPage.jsx
│ ├── ProfilesettingsPage.jsx
│ ├── RegisterPage.jsx
│ ├── StudyPlannerPage.jsx <-- Added (Module 7)
│ ├── TasksPage.jsx <-- Aligned to Section 7.2 task schema
│ ├── TestsPage.jsx
│ └── Welcome.jsx
├── App.jsx
├── main.jsx
└── router.jsx <-- Updated with /planner & /assignments routes
