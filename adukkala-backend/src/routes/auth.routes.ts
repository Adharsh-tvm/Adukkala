import { Router } from "express";
import { authController } from "../container";
import { validate } from "../middleware/validate.middleware";
import { googleLoginSchema, loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/google", validate(googleLoginSchema), authController.googleLogin); 

export default router;