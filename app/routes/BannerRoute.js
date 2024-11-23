import express from "express";
import { getAll } from "../controllers/BannerController.js";

const router = express.Router();

router.get("/banner", getAll);

export default router;
