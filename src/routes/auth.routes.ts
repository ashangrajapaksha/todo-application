import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
const authController = new AuthController();

// Public routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

// Protected routes
router.get("/profile", authenticateToken, authController.getProfile);

export default router;
