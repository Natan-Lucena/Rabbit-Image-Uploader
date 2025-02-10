import * as express from "express";
import { ControllerFactory } from "../factory/controller-factory";
import { Multer } from "../../infrastructure/upload/multer-config";
import { multerErrorHandlerMiddleware } from "../../infrastructure/middlewares/max-size-multer-middleware";

const router = express.Router();
const saveImageController = ControllerFactory.saveImageController();

router.post(
  "/save-image/:externalId",
  Multer.getUploader(10).single("file"),
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    saveImageController.execute(req, res),
  multerErrorHandlerMiddleware
);

export { router };
