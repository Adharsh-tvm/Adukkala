import { Router } from "express";
import { googleLogin, login, register } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { googleLoginSchema, loginSchema, registerSchema } from "../validators/auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/google",validate(googleLoginSchema), googleLogin); 

export default router;