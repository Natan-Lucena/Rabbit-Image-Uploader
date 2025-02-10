import * as express from "express";
import { ControllerFactory } from "../factory/controller-factory";
import { Multer } from "../../infrastructure/upload/multer-config";

const router = express.Router();
const saveImageController = ControllerFactory.saveImageController();

router.post(
  "/save-image/:externalId",
  Multer.getUploader(10).single("file"),
  (req: express.Request, res: express.Response) =>
    saveImageController.execute(req, res)
);

export { router };
