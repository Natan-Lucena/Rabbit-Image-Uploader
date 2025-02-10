import { SaveImageController } from "../../application/use-cases/save-image-controller";
import { UseCaseFactory } from "./use-case-factory";

export class ControllerFactory {
  static saveImageController(): SaveImageController {
    const saveImageUseCase = UseCaseFactory.saveImageUseCase();
    return new SaveImageController(saveImageUseCase);
  }
}
