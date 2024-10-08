import { Router } from "express";
import { login, profile, signup, search, logout } from "../controllers/authController.js";
import { UPLOAD } from "../configs/config.js";

const authRoutes = Router();

authRoutes.post("/signup", UPLOAD.single("dp"), signup);
authRoutes.post("/login", login);
authRoutes.get("/profile", profile)
authRoutes.get("/search", search)
authRoutes.post("/logout", logout)

export default authRoutes;