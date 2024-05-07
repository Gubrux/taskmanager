import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail) => {
        await transporter.sendMail({
            from: '"Fred Foo 👻" <admin@admin.net>',
            to: user.email,
            subject: "Hello ✔",
            text: "Hello world?",
            html: `<p>hola ${user.name} tenemos tus datos 😈😈</p>
                <p>Visita el siguiente enlace para confirmar tu cuenta</p>
                <a href="">Confirmar cuenta</a>
                <p>Ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos luego de recibir este correo</p>
            `,
        });
    };
}
