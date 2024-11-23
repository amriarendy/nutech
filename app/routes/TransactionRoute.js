import express from "express";
import {
  balance,
  topup,
  transaction,
  history,
} from "../controllers/TransactionController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/balance", verifyToken, balance);
router.post("/topup", verifyToken, topup);
router.post("/transaction", verifyToken, transaction);
router.get("/transaction/history", verifyToken, history);

export default router;
