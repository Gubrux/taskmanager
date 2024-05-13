import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

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
    body("email").isEmail().withMessage("email no es valido"),
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
    body("email").notEmpty().withMessage("El email no es valido"),
    body("password").notEmpty().withMessage("La contraseña es invalida"),
    handleInputErrors,
    AuthController.login
);
router.post(
    "/request-code",
    body("email").notEmpty().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.requestConfirmationCode
);
router.post(
    "/forgot-password",
    body("email").notEmpty().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.forgotPassword
);
router.post(
    "/validate-token",
    body("token").notEmpty().withMessage("El token es requerido"),
    handleInputErrors,
    AuthController.validateToken
);
router.post(
    "/update-password/:token",
    param("token").isNumeric().withMessage("El token es invalido"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("la contraseña debe tener al menos 8 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.updatePassWithToken
);

router.get("/user", authenticate, AuthController.user);

export default router;
