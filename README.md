# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Estructura del proyecto
```
liga-de-heroes/
├── public/                    # Archivos estáticos
│   ├── favicon.ico
│   ├── logo.svg
│   └── assets/
│       ├── images/
│       │   ├── champions/     # Imágenes de campeones
│       │   └── items/         # Imágenes de items
│       └── icons/             # Íconos del sistema
│
├── src/                       # Código fuente principal
│   ├── assets/                # Assets importados directamente en código
│   │   └── styles/            # Estilos globales
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── common/            # Componentes genéricos (Button, Card, Modal, etc.)
│   │   ├── layout/            # Componentes de estructura (Header, Footer, Sidebar)
│   │   ├── auth/              # Componentes relacionados con autenticación
│   │   ├── champions/         # Componentes específicos de campeones
│   │   ├── builds/            # Componentes para sistema de builds
│   │   ├── items/             # Componentes para items y equipamiento
│   │   └── comparator/        # Componentes para comparativas
│   │
│   ├── pages/                 # Páginas principales
│   │   ├── Home/
│   │   ├── ChampionCatalog/
│   │   ├── ChampionDetail/
│   │   ├── BuildCreator/
│   │   ├── ItemCatalog/
│   │   ├── Comparator/
│   │   ├── Profile/
│   │   ├── Auth/
│   │   └── Contact/
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.js         # Hook para autenticación
│   │   ├── useChampions.js    # Hook para gestión de campeones
│   │   ├── useItems.js        # Hook para gestión de items
│   │   ├── useBuilds.js       # Hook para gestión de builds
│   │   └── useComparison.js   # Hook para comparativas
│   │
│   ├── services/              # Servicios y APIs
│   │   ├── api/
│   │   │   ├── client.js      # Configuración base (Axios, Fetch)
│   │   │   ├── champions.js   # Endpoints para campeones
│   │   │   ├── items.js       # Endpoints para items
│   │   │   ├── builds.js      # Endpoints para builds
│   │   │   ├── auth.js        # Endpoints para autenticación
│   │   │   └── user.js        # Endpoints para usuario
│   │   │
│   │   ├── auth/              # Servicios de autenticación
│   │   │   ├── authProvider.js    # Proveedor de autenticación
│   │   │   ├── googleAuth.js      # Integración con Google
│   │   │   ├── facebookAuth.js    # Integración con Facebook
│   │   │   └── githubAuth.js      # Integración con GitHub
│   │   │
│   │   └── storage/           # Servicios para almacenamiento local
│   │       ├── localStorage.js
│   │       └── favorites.js
│   │
│   ├── utils/                 # Utilidades y helpers
│   │   ├── formatter.js       # Formateo de datos
│   │   ├── validators.js      # Validaciones
│   │   ├── calculations.js    # Cálculos para stats y builds
│   │   └── constants.js       # Constantes del sistema
│   │
│   ├── context/               # Context API de React
│   │   ├── AuthContext.jsx    # Contexto de autenticación
│   │   ├── UIContext.jsx      # Contexto para UI (temas, etc.)
│   │   ├── ChampionsContext.jsx  # Contexto para campeones
│   │   └── BuildsContext.jsx     # Contexto para builds
│   │
│   ├── router/                # Configuración de rutas
│   │   └── index.jsx
│   │
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── vite-env.d.ts          # Declaraciones de tipos para Vite
│
├── .eslintrc.js               # Configuración de ESLint
├── .prettierrc                # Configuración de Prettier
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias
└── README.md                  # Documentación del proyecto
```