import { Request, Response } from "express";
import { BaseController } from "../../shared/infra/http/base-controller";
import { SaveImageUseCase } from "./save-image";

export class SaveImageController extends BaseController {
  constructor(private readonly saveImageUseCase: SaveImageUseCase) {
    super();
  }

  async executeImpl(req: Request, res: Response): Promise<Response | void> {
    const file = req.file;

    if (!file) {
      return this.clientError(res, "No file uploaded.");
    }

    if (!file.mimetype.startsWith("image/")) {
      return this.clientError(
        res,
        "Invalid file type. Please upload an image (JPEG or PNG)."
      );
    }

    const result = await this.saveImageUseCase.execute({
      externalId: req.params.externalId,
      file,
    });
    if (!result.ok) {
      throw new Error(result.error);
    }
    return this.created(res, result.value);
  }
}
