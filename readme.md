# Task Manager

Este proyecto es una aplicación de gestión de tareas con un backend basado en Node.js y Express, y un frontend creado con React y Vite.

## Requisitos

- Node.js
- npm o yarn
- MongoDB Atlas (o una instancia de MongoDB local)
- Una cuenta en Mailtrap (para enviar correos electrónicos)

## Configuración del Backend

1. Clona el repositorio y navega hasta el directorio del backend:
    ```sh
    git clone <URL_DEL_REPOSITORIO>
    cd <directorio_del_backend>
    ```

2. Instala las dependencias del backend:
    ```sh
    npm install
    ```

3. Crea un archivo `.env` en el directorio del backend con el siguiente contenido, reemplazando `<yourkey>` y otros valores con tus propias credenciales:
    ```dotenv
    DATABASE_URL=mongodb+srv://root:<yourkey>@cluster0.vrclhgb.mongodb.net/taskmanager
    SMTP_HOST=sandbox.smtp.mailtrap.io
    SMTP_PORT=2525
    SMTP_USER=<tu_usuario_mailtrap>
    SMTP_PASS=<tu_contraseña_mailtrap>
    JWT_SECRET=<tu_jwt_secreto>
    ```

4. Inicia el servidor del backend:
    ```sh
    npm run dev
    ```

   El servidor debería estar corriendo en `http://localhost:4000`.

## Configuración del Frontend

1. Navega hasta el directorio del frontend:
    ```sh
    cd <directorio_del_frontend>
    ```

2. Instala las dependencias del frontend:
    ```sh
    npm install
    ```

3. Crea un archivo `.env.local` en el directorio del frontend con el siguiente contenido:
    ```dotenv
    VITE_API_URL=http://localhost:4000/api
    ```

4. Inicia el servidor de desarrollo del frontend:
    ```sh
    npm run dev
    ```

   La aplicación de frontend debería estar corriendo en `http://localhost:5173`.

## Dependencias

### Frontend
- @chakra-ui/pin-input@2.1.0
- @dnd-kit/core@6.1.0
- @headlessui/react@1.7.19
- @heroicons/react@2.1.3
- @tailwindcss/forms@0.5.7
- @tanstack/react-query-devtools@5.34.2
- @tanstack/react-query@5.34.2
- @types/node@20.12.8
- @types/react-dom@18.3.0
- @types/react@18.3.1
- @typescript-eslint/eslint-plugin@7.8.0
- @typescript-eslint/parser@7.8.0
- @vitejs/plugin-react-swc@3.6.0
- autoprefixer@10.4.19
- axios@1.6.8
- eslint-plugin-react-hooks@4.6.2
- eslint-plugin-react-refresh@0.4.6
- eslint@8.57.0
- postcss@8.4.38
- react-dom@18.3.1
- react-hook-form@7.51.4
- react-router-dom@6.23.0
- react-toastify@10.0.5
- react@18.3.1
- tailwindcss@3.4.3
- typescript@5.4.5
- vite@5.2.11
- zod@3.23.6

### Backend
- @types/bcrypt@5.0.2
- @types/cors@2.8.17
- @types/express@4.17.21
- @types/jsonwebtoken@9.0.6
- @types/morgan@1.9.9
- @types/nodemailer@6.4.15
- bcrypt@5.1.1
- colors@1.4.0
- cors@2.8.5
- dotenv@16.4.5
- express-validator@7.0.1
- express@4.19.2
- jsonwebtoken@9.0.2
- mongoose@8.3.3
- morgan@1.10.0
- nodemailer@6.9.13
- nodemon@3.1.0
- ts-node@10.9.2
- typescript@5.4.5

## Notas

- Asegúrate de reemplazar los valores de las variables de entorno con tus propias credenciales y configuraciones.
- Puedes obtener las credenciales para Mailtrap registrándote en [Mailtrap](https://mailtrap.io/) y creando un inbox.
- Si necesitas cambiar el puerto del backend o del frontend, asegúrate de actualizar las URLs correspondientes en los archivos `.env` y `.env.local`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cualquier cambio importante antes de realizar un pull request.

## Licencia

[MIT](LICENSE)
