# Gestión de Notas

Este proyecto es una aplicación web para la gestión de notas de estudiantes, que incluye un backend en Spring Boot y un frontend en React. 

## Requisitos previos

Asegúrate de tener instaladas las siguientes herramientas:

- **Git**: Para clonar el repositorio.
- **Java 11+**: Para ejecutar el backend de Spring Boot.
- **Node.js + npm**: Para ejecutar el frontend de React.
- **MySQL**: Para la base de datos.
- **Maven**: Para manejar las dependencias del backend (ya viene integrado con Spring Boot).
  
## Instrucciones para levantar el proyecto

### Clonar el repositorio

Primero, clona el repositorio. Este contiene dos ramas: `backend` para el backend con Spring Boot y `frontend` para la parte de React.

```bash
git clone <URL_DEL_REPOSITORIO>
```

## Estructura del proyecto

El proyecto está dividido en dos componentes principales:

1. **Frontend (React con Vite)**: Proporciona la interfaz gráfica para interactuar con la calculadora.
2. **Backend (Java)**: Se ejecuta como una función **AWS Lambda** y maneja las operaciones matemáticas de la calculadora. La Lambda está expuesta mediante un endpoint de **API Gateway**, permitiendo interacciones HTTP.

## Instalación

### 1. Clonar el repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/gaspergt/calculator.git
cd calculator
```

### 2. Branch del Frontend (React con Vite)

En la rama `frontend` encontraremos el código para levantar el proyecto React. Para trabajar con el frontend, cambia a esa rama con el siguiente comando:

```bash
git checkout frontend
```

Luego, sigue estos pasos para levantar el proyecto:

1. **Instalar las dependencias del frontend**:
    ```bash
    npm install
    ```

2. **Ejecutar el frontend en modo desarrollo**:
    ```bash
    npm run dev
    ```

    Esto lanzará el servidor de desarrollo de Vite y la interfaz gráfica estará disponible en `http://localhost:3000`.