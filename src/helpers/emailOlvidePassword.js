import nodemailer from "nodemailer";

const emailOlvidePassword = async ({ email, nombre, token }) => {
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
        from: '"Administrador de Pacientes" <padilllaezequiel597@gmail.com>',
        to: email,
        subject: "Olvide mi Password",
        text: "Restablece tu password",
        html: `
            <h1>Hola ${nombre}!</h1>
            <p>Para restablcer tu password, haz click en el siguiente enlace:</p>
            <a href="http://localhost:5173/olvide-password/${token}">Restablecer Password</a>
        `,
    })
}

export default emailOlvidePassword;
