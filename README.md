# Napptilus Test Project

Este proyecto es una prueba técnica desarrollada para Napptilus. La aplicación está construida utilizando React, Redux Toolkit y Vite para asegurar un rendimiento óptimo y una fácil mantenibilidad.

## Tecnologías Utilizadas

- **React**
- **Redux Toolkit y RTK Query** 
- **Vite**
- **TailwindCSS**
- **Redux remember**
- **Storage con IndexedDB**

## Configuración del Entorno de Desarrollo

Sigue estos pasos para configurar y levantar el proyecto en tu entorno local:

### 1. Clonar el Repositorio

Primero, clona el repositorio desde GitHub:

```bash
git clone https://github.com/Javoto17/napptilus-test.git
cd napptilus-test
```

### 2. Instalar Dependencias

Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 3. Levantar el Servidor de Desarrollo

Para levantar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5713`.

## Estructura del Proyecto

A continuación, se describe brevemente la estructura del proyecto:

```
napptilus-test/
│
├── public/              # Archivos estáticos públicos
├── src/                 # Código fuente de la aplicación
│   ├── store/           # Configuración del store de Redux Toolkit
│   ├── components/      # Componentes reutilizables
│   ├── features/        # Funcionalidades y slices de Redux
│   ├── pages/           # Páginas de la aplicación
│   ├── services/        # Configuración y endpoints de RTK Query
│   ├── utils/           # Funciones de utilidad
│   ├── App.jsx          # Componente principal de la aplicación
│   ├── main.jsx         # Punto de entrada de la aplicación
│   └── index.css        # Estilos globales
│
├── package.json         # Dependencias y scripts de npm
├── vite.config.js       # Configuración de Vite
└── README.md            # Documentación del proyecto
```

### Documentación

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux remember](https://github.com/zewish/redux-remember)
- [Tailwind CSS](https://tailwindcss.com/)
- [IDB Keyval](https://github.com/jakearchibald/idb-keyval#readme)