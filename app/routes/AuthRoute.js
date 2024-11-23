import express from "express";
import { signIn, signOut, register } from "../controllers/AuthController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  validateAuth,
  validateRegister,
} from "../utils/validate/AuthValidate.js";

const router = express.Router();

router.post("/login", validateAuth, signIn);
router.post("/register", validateRegister, register);
router.delete("/logout", signOut);
router.get("/token", refreshToken);

export default router;
