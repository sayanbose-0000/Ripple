import { Router } from "express";
import { login, profile, signup } from "../controllers/authController.js";
import { UPLOAD } from "../configs/config.js";

const authRoutes = Router();

authRoutes.post("/signup", UPLOAD.single("dp"), signup);
authRoutes.post("/login", login);
authRoutes.get("/profile", profile)

export default authRoutes;