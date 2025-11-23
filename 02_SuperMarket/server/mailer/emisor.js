const nodemailer = require("nodemailer");

async function enviarCorreo(usuario, clave)
{
    let emisor = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: { user: "c044ed920df5c6", pass: "5e660aab760aa5" }
    });
    
    let mensaje = `
    Hola, hemos sido notificados sobre el olvido de tu contraseña.
    Por ahora inicia sesión con esta contraseña provisional y luego cámbiala por una más segura.
    
    Usuario: ${usuario} 
    Clave: ${clave}
    `;
    
    let email = {
        from: '<nodemailer@mailer.com>',
        to: `${usuario}`,
        subject: "Cambio de contraseña SuperMarket",
        text: mensaje
    };
    
    await emisor.sendMail(email);
};

function randomPassword()
{
    const randomSelect = (cadena) => cadena.charAt(Math.floor(Math.random() * cadena.length));
    const letras = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";

    let password = "";
    password += randomSelect(letras).toUpperCase();
    for(let i=0 ; i < 6 ; i++) password += randomSelect(letras);
    password += randomSelect(numeros);

    return password;
}

module.exports = {enviarCorreo, randomPassword};