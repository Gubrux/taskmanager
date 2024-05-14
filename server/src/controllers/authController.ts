import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;
            const userExists = await User.findOne({ email });
            if (userExists) {
                const error = new Error("El email ya esta en uso");
                return res.status(409).json({ error: error.message });
            }
            // Create a new user
            const user = new User(req.body);
            // Hash the password
            user.password = await hashPassword(password);

            //generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Send confirmation email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            // Save the user and the token
            await Promise.allSettled([token.save(), user.save()]);
            res.send("Usuario creado!!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token }).populate("user");
            if (!tokenExists) {
                const error = new Error("Token invalido");
                return res.status(404).json({ error: error.message });
            }
            const user = await User.findById(tokenExists.user.id);
            user.confirmed = true;
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send("Cuenta confirmada!!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }
            if (!user.confirmed) {
                const token = new Token();
                token.user = user.id;
                token.token = generateToken();

                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });

                const error = new Error(
                    "La cuenta no ha sido confirmada, hemos enviado un nuevo email de confirmación"
                );
                return res.status(401).json({ error: error.message });
            }

            const isPasswordCorrect = await checkPassword(
                password,
                user.password
            );
            if (!isPasswordCorrect) {
                const error = new Error("Contraseña incorrecta");
                return res.status(401).json({ error: error.message });
            }
            const token = generateJWT({ id: user._id });
            res.send(token);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    };
    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("El usuario no esta registrado");
                return res.status(409).json({ error: error.message });
            }
            if (user.confirmed) {
                const error = new Error("La cuenta ya ha sido confirmada");
                return res.status(403).json({ error: error.message });
            }

            //generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Send confirmation email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            // Save the user and the token
            await Promise.allSettled([token.save(), user.save()]);
            res.send("se envio un nuevo token");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al solicitar el token de confirmación");
        }
    };
    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error("El usuario no esta registrado");
                return res.status(409).json({ error: error.message });
            }
            //generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            await token.save();
            // Send confirmation email
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token,
            });
            res.send("Revisa tu correo para reestablecer tu contraseña");
        } catch (error) {
            console.error(error);
            res.status(500).send(
                "Error al reestablecer la contraseña, intentalo mas tarde"
            );
        }
    };
    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({ token }).populate("user");
            if (!tokenExists) {
                const error = new Error("Token invalido");
                return res.status(404).json({ error: error.message });
            }
            res.send("Token valido, puedes reestablecer tu contraseña");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al validar el token");
        }
    };
    static updatePassWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const tokenExists = await Token.findOne({ token });
            if (!tokenExists) {
                const error = new Error("Token invalido");
                return res.status(404).json({ error: error.message });
            }
            const user = await User.findById(tokenExists.user);
            user.password = await hashPassword(password);
            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
            res.send("La contraseña ha sido actualizada!!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al actualizar la contraseña");
        }
    };
    static user = async (req: Request, res: Response) => {
        return res.json(req.user);
    };
    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            const error = new Error("El email ya esta en uso");
            return res.status(409).json({ error: error.message });
        }
        req.user.name = name;
        req.user.email = email;
        try {
            await req.user.save();
            res.send("Perfil actualizado");
        } catch (error) {
            res.status(500).send("Error al actualizar el perfil");
        }
    };
    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const { current_password, password } = req.body;

        const user = await User.findById(req.user.id);

        const isPasswordCorrect = await checkPassword(
            current_password,
            user.password
        );
        if (!isPasswordCorrect) {
            const error = new Error("La contraseña actual es incorrecta");
            return res.status(401).json({ error: error.message });
        }

        try {
            user.password = await hashPassword(password);
            await user.save();
            res.send("Contraseña actualizada");
        } catch (error) {
            res.status(500).send("Error al actualizar la contraseña");
        }
    };
    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body;

        const user = await User.findById(req.user.id);

        const isPasswordCorrect = await checkPassword(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error("La contraseña es incorrecta");
            return res.status(401).json({ error: error.message });
        }
        res.send("La contraseña es correcta");
    };
}
