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

### Configuración del Backend

Cambiar a la rama del backend:

```bash
git checkout backend
```

### Configurar la base de datos:

El dump de la base de datos se encuentra en la carpeta del backend bajo el archivo database_dump.sql.
Crea una base de datos en MySQL:

```sql
CREATE DATABASE gestion_notas;
```

Importa el dump:

```bash
mysql -u <usuario> -p gestion_notas < ruta/al/archivo/database_dump.sql
```

Abre el archivo src/main/resources/application.properties o application.yml y ajusta las credenciales de conexión a tu base de datos MySQL.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gestion_notas
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### Compilar y ejecutar el backend:

Dentro de la carpeta backend, ejecuta los siguientes comandos para descargar las dependencias y ejecutar la aplicación.

```bash
mvn clean install
mvn spring-boot:run
```
El servidor backend debería estar disponible en [(http://localhost:8080)].

### Configuración del Frontend

Cambiar a la rama del frontend:

```bash
git checkout frontend
```

Dentro de la carpeta del frontend, ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

### Configurar la API del backend:

Si es necesario, ajusta la URL de la API del backend en el archivo src/config.js o en el archivo correspondiente donde configures el endpoint de la API:

```javascript
const API_URL = 'http://localhost:8080/api'; // Ajusta la URL si es necesario
```

Después de instalar las dependencias, ejecuta el siguiente comando para arrancar el servidor de desarrollo:

```bash
npm start
```
El frontend estará disponible en [http://localhost:3000].

Ejecutar ambos servicios simultáneamente

El backend se ejecutará en: 
    [http://localhost:8080].

El frontend se ejecutará en: 
    [http://localhost:3000].

El frontend está configurado para hacer peticiones al backend alojado en http://localhost:8080. Si todo está configurado correctamente, deberías poder usar la aplicación desde el frontend, conectándose al backend.

> [!IMPORTANT] Notas adicionales
>Si necesitas reiniciar la base de datos en algún momento, puedes volver a importar el archivo database_dump.sql en MySQL.
>Asegúrate de que ambos servidores (frontend y backend) estén corriendo simultáneamente para poder acceder a la funcionalidad completa de la aplicación.
>Puedes usar herramientas como Postman para probar los endpoints del backend.

### Solución de problemas
Errores con la base de datos: Verifica que el servidor de MySQL esté ejecutándose y que las credenciales en application.properties sean correctas.
Problemas con CORS: Si hay problemas de CORS, asegúrate de que el backend tenga configurado correctamente el soporte de CORS en el archivo WebConfig.java.