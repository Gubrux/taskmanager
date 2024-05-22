import { Resend } from "resend";

const resend = new Resend("re_4QpKbAib_9LsoZiyKZUGkmGTXCzY4Wc24");

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: IEmail): Promise<void> => {
        try {
            const { error } = await resend.emails.send({
                from: "Ticked <onboarding@resend.dev>",
                to: [user.email],
                subject: "Confirmacion de cuenta en Ticked",
                html: `<p>Hola ${user.name}.</p>
                    <p>Visita el siguiente enlace para confirmar tu cuenta</p>
                    <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                    <p>Ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos luego de recibir este correo</p>`,
            });

            if (error) {
                console.error(
                    "Error al enviar el correo de confirmación:",
                    error
                );
            }
        } catch (error) {
            console.error("Error al enviar el correo de confirmación:", error);
        }
    };

    static sendPasswordResetToken = async (user: IEmail): Promise<void> => {
        try {
            const { error } = await resend.emails.send({
                from: "Acme <onboarding@resend.dev>", // Ajusta el remitente según tus necesidades
                to: [user.email],
                subject: "Reestablece tu contraseña",
                html: `<p>Hola ${user.name}, has solicitado el cambio de contraseña. Si esto fue un accidente, ignora este correo.</p>
                    <p>Visita el siguiente enlace para reestablecer tu contraseña:</p>
                    <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer tu contraseña</a>
                    <p>Ingresa el código: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos.</p>`,
            });

            if (error) {
                console.error(
                    "Error al enviar el correo de reestablecimiento de contraseña:",
                    error
                );
            }
        } catch (error) {
            console.error(
                "Error al enviar el correo de reestablecimiento de contraseña:",
                error
            );
        }
    };
}
