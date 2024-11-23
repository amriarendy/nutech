import express from "express";
import {
  profile,
  update,
  uploadImage,
} from "../controllers/ProfileController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { validatePhotoUpdate } from "../utils/validate/GlobalValidate.js";

const router = express.Router();

router.get("/profile", verifyToken, profile);
router.put("/profile/update", verifyToken, update);
router.put("/profile/image", verifyToken, validatePhotoUpdate, uploadImage);

export default router;
