import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
    "/create-account",
    body("name").notEmpty().withMessage("Name is required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("la contraseña debe tener al menos 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    body("email").isEmail().withMessage("email es invalido"),
    handleInputErrors,
    AuthController.createAccount
);

router.post(
    "/confirm-account",
    body("token").notEmpty().withMessage("El token es requerido"),
    handleInputErrors,
    AuthController.confirmAccount
);
router.post(
    "/login",
    body("email").notEmpty().withMessage("El email no valido"),
    body("password").notEmpty().withMessage("La contraseña es invalida"),
    handleInputErrors,
    AuthController.login
);
router.post(
    "/request-code",
    body("email").notEmpty().withMessage("El email no valido"),
    handleInputErrors,
    AuthController.requestConfirmationCode
);

export default router;
