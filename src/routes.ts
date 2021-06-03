import { Router } from "express";
import multer from "multer";
import { multerConfig } from "./config/multer";

import { UploadController } from "./controllers/uploadController";

const router = Router();

const uploadController = new UploadController();

router.post("/uploads", multer(multerConfig).single("file"), uploadController.store);
router.get("/uploads", uploadController.index);

export { router };