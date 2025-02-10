import { SaveImageUseCase } from "../../application/use-cases/save-image";
import { AwsS3FileStorage } from "../../infrastructure/services/file-storage-impl";

export class UseCaseFactory {
  static saveImageUseCase(): SaveImageUseCase {
    const fileStorage = new AwsS3FileStorage();
    return new SaveImageUseCase(fileStorage);
  }
}
