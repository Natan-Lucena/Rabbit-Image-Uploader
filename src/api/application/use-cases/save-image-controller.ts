import { Request, Response } from "express";
import { BaseController } from "../../shared/infra/http/base-controller";
import { SaveImageUseCase } from "./save-image";
import { saveImageSchema } from "../schemas/save-image.schema";
import { formatValidationErrors } from "../../shared/core/validation-erros";

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
    const validation = await saveImageSchema.safeParseAsync(req.params);
    if (!validation.success) {
      const errors = formatValidationErrors(validation.error);
      return this.clientError(res, undefined, errors);
    }

    const result = await this.saveImageUseCase.execute({
      externalId: validation.data.externalId,
      file,
    });
    if (!result.ok) {
      throw new Error(result.error);
    }
    return this.created(res, result.value);
  }
}
