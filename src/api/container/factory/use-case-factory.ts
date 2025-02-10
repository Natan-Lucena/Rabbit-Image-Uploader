import { SaveImageUseCase } from "../../application/use-cases/save-image";
import { AwsS3FileStorage } from "../../infrastructure/services/file-storage-impl";
import { RabbitMQPublisher } from "../../infrastructure/services/pub-sub-impl";

export class UseCaseFactory {
  static saveImageUseCase(): SaveImageUseCase {
    const fileStorage = new AwsS3FileStorage();
    if (!process.env.RABBITMQ_URL) {
      throw new Error("RabbitMQ URL não definido");
    }
    const pubSub = new RabbitMQPublisher(process.env.RABBITMQ_URL);
    return new SaveImageUseCase(fileStorage, pubSub);
  }
}
