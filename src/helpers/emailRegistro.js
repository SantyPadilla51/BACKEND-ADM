import nodemailer from "nodemailer";

const emailRegistro = async ({ email, nombre, token }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "padillaezequiel597@gmail.com",
            pass: "wuns toxh fgch foab",
        },
    });

    //Enviar email
    const sendEmail = await transporter.sendMail({
        from:'"Administrador de Pacientes" <padilllaezequiel597@gmail.com>',
        to: email,
        subject: "Registro de usuario",
        text: "Comprueba tu cuenta",
        html: `
            <h1>Hola ${nombre}!</h1>
            <p>Gracias por registrarte en nuestro sitio web. Para confirmar tu cuenta, haz click en el siguiente enlace:</p>
            <a href="http://localhost:5173/confirmar-cuenta/${token}">Confirmar Cuenta</a>
        `,
    })
}

export default emailRegistro;
