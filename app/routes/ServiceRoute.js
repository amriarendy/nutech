import express from "express";
import { getAll } from "../controllers/ServiceController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/service", verifyToken, getAll);

export default router;
