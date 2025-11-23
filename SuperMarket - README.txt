INSTRUCCIONES PARA CORRER EL PROYECTO:

1. Abra la carpeta "02_SuperMarket" en Visual Studio.

2. Abra un nuevo terminal en Visual Studio e introduzca:

cd server
npm install

Esto creara la carpeta "node_modules" e instalara las dependencias necesarias.

3. Ya finalizadas las instalaciones en el mismo terminal introduzca:

npm run dev

Esto inicializara el servidor en el puerto 5000 y no dejara introducir mas comandos.

4. Ahora cree un nuevo terminal sin cerrar el anterior e introduzca:

cd client
npm install

Esto realizara lo mismo que en server pero demorara un poco mas.

5. Ya finalizadas las instalaciones en el mismo terminal introduzca:

npm start

Esto inicializara el front-end en el puerto 3000 y abrira la pagina en el navegador automaticamente.

IMPORTANTE:
No cierre Visual Studio ni ninguno de los terminales, si lo hace
podria detener la ejecucion del servidor o del front-end.