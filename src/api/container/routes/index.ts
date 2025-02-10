import { Router } from "express";
import { ControllerFactory } from "../factory/controller-factory";
import { Multer } from "../../infrastructure/upload/multer-config";

const MAX_MSISDN_IMAGE_SIZE_IN_BYTES = 1024 * 80;

const router = Router();
const saveImageController = ControllerFactory.saveImageController();

router.post(
  "/save-image",
  Multer.getUploader(MAX_MSISDN_IMAGE_SIZE_IN_BYTES).single("file"),
  (req, res) => {
    saveImageController.execute(req, res);
  }
);

export { router };
