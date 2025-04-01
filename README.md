# Liga de Heroes - Frontend

Este repositorio contiene el frontend para la aplicación Liga de Heroes, una plataforma completa para jugadores de League of Legends que permite administrar cuentas, visualizar estadísticas, crear builds de campeones y acceder a información detallada del juego.

## Características Principales

- **Perfil de Usuario**: Visualización de estadísticas de jugador usando la API de Riot
- **Catálogo Interactivo**: Exploración de campeones e ítems con información detallada
- **Sistema de Builds**: Creación y gestión de builds para campeones con sincronización en tiempo real
- **Autenticación Completa**: Registro, login, verificación de email y recuperación de contraseña
- **Comunicación WebSocket**: Sincronización en tiempo real de builds entre dispositivos

## Tecnologías Utilizadas

- **React 19**: Biblioteca principal para la interfaz de usuario
- **React Router 7**: Navegación y gestión de rutas
- **Tailwind CSS 4**: Framework de estilos utilitarios
- **DaisyUI**: Componentes pre-diseñados para Tailwind
- **WebSockets**: Comunicación en tiempo real
- **Axios**: Cliente HTTP para comunicación con la API
- **Vite**: Herramienta de construcción y desarrollo

## Estructura del Proyecto

```
frontend/
│
├── public/               # Archivos estáticos
│   ├── images/           # Imágenes e ilustraciones
│   └── lol_data/         # Datos locales de LoL (DDragon)
│
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── common/       # Componentes comunes (header, navbar, etc.)
│   │   └── layout/       # Layouts de la aplicación
│   │
│   ├── context/          # Contextos de React
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   │
│   ├── hooks/            # Custom hooks
│   │   ├── useAuth.js       # Hook para autenticación
│   │   ├── useBuildManager.js  # Hook para gestión de builds
│   │   └── useWebSocket.js  # Hook para WebSocket
│   │
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Account/         # Páginas de cuenta y perfil
│   │   ├── Auth/            # Páginas de autenticación
│   │   ├── Builds/          # Sistema de builds
│   │   ├── Catalog/         # Catálogo de campeones e ítems
│   │   └── Home/            # Página de inicio
│   │
│   ├── routes/           # Configuración de rutas
│   │
│   ├── services/         # Servicios para comunicación con APIs
│   │   ├── api.js           # Cliente base de Axios
│   │   ├── authService.js   # Servicios de autenticación
│   │   ├── buildsService.js # Servicios para builds
│   │   ├── characterService.js # Servicios de campeones
│   │   ├── itemsService.js  # Servicios de ítems
│   │   └── websocketService.js # Servicio WebSocket
│   │
│   ├── utils/            # Utilidades
│   │
│   ├── App.jsx           # Componente principal
│   └── main.jsx          # Punto de entrada
│
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
└── README.md             # Documentación
```

## Sistema de Builds con WebSocket

Una de las características principales de la aplicación es el sistema de builds con sincronización en tiempo real mediante WebSocket.

### Características clave

- **Sincronización en tiempo real** de cambios en builds entre dispositivos
- **Recuperación automática ante desconexiones** con cola de cambios pendientes
- **Almacenamiento local** de cambios no sincronizados
- **Interfaz visual de estado de sincronización** para informar al usuario
- **Operaciones avanzadas**: añadir/eliminar ítems, cambiar estadísticas, subir de nivel, etc.

### Arquitectura WebSocket

El frontend implementa un sistema robusto de comunicación WebSocket:

- **WebSocketService**: Gestiona la conexión, reconexión automática, autenticación y sincronización
- **useWebSocket**: Hook personalizado para integrar WebSocket en componentes React
- **useBuildManager**: Hook de alto nivel para gestionar builds con operaciones específicas

## Estructura de Rutas

### Rutas Públicas

- `/` - Página principal
- `/catalog/character-list` - Lista de campeones
- `/catalog/character-detail/:characterId` - Detalles de campeón
- `/catalog/item-list` - Lista de items
- `/catalog/item-detail/:itemId` - Detalles de item
- `/builds` - Sistema de builds (accesible sin cuenta, pero requiere autenticación para guardar)

### Rutas de Autenticación

- `/login` - Inicio de sesión
- `/register` - Registro de usuario
- `/verify-email` - Verificación de correo electrónico
- `/forgot-password` - Recuperación de contraseña
- `/reset-password` - Confirmación de restablecimiento de contraseña

### Rutas Protegidas (requieren autenticación)

- `/account/profile` - Perfil de usuario

## Instalación y Configuración

### Requisitos Previos

- Node.js (v16 o superior)
- Backend de Liga de Heroes corriendo en localhost:3000 (o la URL configurada)

### Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/liga-de-heroes-frontend.git
   cd liga-de-heroes-frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea o modifica el archivo `.env` en la raíz del proyecto:
   ```
   # URL base de la API REST
   VITE_API_URL=http://localhost:3000
   
   # URL del WebSocket
   VITE_API_WS_URL=ws://localhost:3000
   
   # Modo de desarrollo
   VITE_NODE_ENV=development
   
   # Tiempo de cache (en minutos) para datos poco cambiantes
   VITE_CACHE_DURATION=15
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto asignado por Vite).

### Compilación para Producción

```bash
npm run build
```

Los archivos optimizados para producción se generarán en el directorio `dist/`.

## Uso del Sistema de Builds

### Conexión WebSocket

La aplicación establece una conexión WebSocket con el servidor cuando el usuario navega a la página de builds:

```javascript
// Ejemplo de uso del hook useWebSocket
const { 
  connectionStatus, 
  authStatus, 
  socketState,
  addEventListener, 
  updateBuild, 
  getBuild,
  initializeBuild 
} = useWebSocket('ws://localhost:3000');
```

### Gestión de Builds

El hook `useBuildManager` proporciona una API para gestionar builds:

```javascript
// Ejemplo de uso del hook useBuildManager
const {
  currentBuild,
  connectionStatus,
  syncStatus,
  errorMessage,
  initializeBuild,
  loadBuild,
  addItem,
  removeItem,
  updateLevel,
  updateStat,
  resetBuild
} = useBuildManager();

// Cargar un build existente
loadBuild('champion-123');

// Añadir un item
addItem('champion-123', { id: 'item-456', name: 'Item Name', ... });

// Actualizar nivel
updateLevel('champion-123', 16);
```

## Integración con la API de Riot y DDragon

La aplicación utiliza dos fuentes principales de datos:

1. **API de Riot Games** (a través del backend): Para datos de jugadores y partidas
2. **DDragon** (almacenados localmente): Para datos estáticos de campeones, ítems y recursos

Los datos de DDragon se almacenan localmente en `public/lol_data/` para mejorar el rendimiento y reducir las llamadas a la API.

## Sistema de Autenticación

El frontend implementa un flujo completo de autenticación:

1. **Registro**: Con validación de nombre de invocador
2. **Verificación por Email**: Proceso seguro con tokens
3. **Login**: Autenticación mediante JWT
4. **Recuperación de Contraseña**: Flujo completo con correo electrónico

El estado de autenticación se gestiona globalmente mediante `AuthContext` y se persiste usando localStorage.

## Gestión de Estado

- **Context API**: Para estado global (auth)
- **Custom Hooks**: Para lógica de negocio reutilizable
- **Estado local**: Para componentes específicos

## Solución de Problemas Comunes

### Problemas de Conexión WebSocket

Si experimentas problemas con la sincronización en tiempo real:

1. Verifica que el backend esté funcionando correctamente
2. Comprueba que las URLs en el archivo `.env` sean correctas
3. Revisa la consola del navegador para mensajes de error
4. Utiliza el botón de reconexión en la interfaz de builds

### Datos de Campeones o Ítems no Disponibles

Si los datos del catálogo no se cargan:

1. Asegúrate de que los archivos DDragon estén correctamente en `public/lol_data/`
2. Verifica la ruta de importación en los servicios relacionados
3. Comprueba si hay errores en la consola del navegador

## Contribución

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva característica'`)
4. Sube los cambios (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia

[MIT](LICENSE)