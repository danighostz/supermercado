# Resumen del Proyecto - Supermarket
Supermarket es una aplicación web desarrollada como parte del curso de Programación en la Web en la Universidad Industrial de Santander. El objetivo principal de esta aplicación es implementar un servicio en línea para supermercados, proporcionando funcionalidades clave para usuarios y administradores.

# Tecnologías Utilizadas:
* **Front-end:** React.js, React Router, Bootstrap
* **Back-end:** Node.js, Express.js
* **Base de Datos:** PostgreSQL con Sequelize ORM
* **Correo Electrónico:** Nodemailer para envío de correos
* **Otros:** HTML, CSS

# Funcionalidades Destacadas:
* **Enrutamiento y Páginas Privadas:** Implementación de rutas privadas y públicas en el front-end para diferentes secciones como la página principal, registro de usuarios, manejo de inventario, entre otros.
* **Integración Front-end y Back-end:** Acoplamiento de componentes front-end con el back-end para interactuar con la base de datos y realizar operaciones como registro de usuarios, gestión de inventario, y envío de correos.
* **Servidor con Node.js:** Implementación de un servidor manejador de peticiones HTTP utilizando Node.js y Express.js para manejar las solicitudes del cliente.
* **Envío de Correos Electrónicos:** Uso de Nodemailer en el back-end para enviar correos electrónicos, por ejemplo, para recuperación de contraseña.
* **Base de Datos con Sequelize:** Cliente de base de datos implementado con Sequelize ORM para interactuar con la base de datos PostgreSQL, gestionando datos como usuarios, categorías, productos y detalles de facturas.
* **Gestión de Inventario:** Página dedicada al manejo de inventario, permitiendo agregar, eliminar y previsualizar productos y categorías.
* **Autenticación y Autorización:** Implementación de un sistema de registro y login de usuarios con validación de correos electrónicos y contraseñas.
* **Rutas Dinámicas:** Uso de React Router para manejar rutas dinámicas en el front-end, permitiendo una navegación fluida entre diferentes secciones de la aplicación.

Este repositorio contiene el código fuente completo de la aplicación Supermarket, incluyendo tanto el front-end desarrollado en React.js como el back-end desarrollado en Node.js, con descripciones de las implementaciones detalladas de las funcionalidades mencionadas anteriormente en los correspondientes Informes 1 y 2.

# Instrucciones para ejecutar el proyecto
1. Abra la carpeta "02_SuperMarket" en Visual Studio.
2. Abra un nuevo terminal en Visual Studio e introduzca:
```
cd server
npm install
```
Esto creara la carpeta "node_modules" e instalara las dependencias necesarias.
3. Ya finalizadas las instalaciones en el mismo terminal introduzca:
```
npm run dev
```
Esto inicializara el servidor en el puerto 5000 y no dejara introducir mas comandos.
4. Ahora cree un nuevo terminal sin cerrar el anterior e introduzca:
```
cd client
npm install
```
Esto realizara lo mismo que en server pero demorara un poco mas.
5. Ya finalizadas las instalaciones en el mismo terminal introduzca:
```
npm start
```
Esto inicializara el front-end en el puerto 3000 y abrira la pagina en el navegador automaticamente.
# Importante
No cierre Visual Studio ni ninguno de los terminales, si lo hace podria detener la ejecucion del servidor o del front-end.
