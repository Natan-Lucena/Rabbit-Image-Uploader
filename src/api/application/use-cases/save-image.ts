import { Image } from "../../domain/entities/image";
import { failure, Result, success } from "../../shared/core/result";
import { ImageDto } from "../dtos/image-dto";
import { FileStorage } from "../services/file-storage";

interface Request {
  externalId: string;
  file: Express.Multer.File;
}

export class SaveImageUseCase {
  constructor(private fileStorage: FileStorage) {}

  async execute(
    data: Request
  ): Promise<Result<ImageDto, "ERROR_SAVING IMAGE">> {
    const { externalId, file } = data;
    try {
      const { url } = await this.fileStorage.saveFile({ externalId, file });
      const image = Image.create(externalId, url);
      return success({ externalId: image.externalId, url: image.url });
    } catch (error) {
      return failure("ERROR_SAVING IMAGE");
    }
  }
}
