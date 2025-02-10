import multer from "multer";
export class Multer {
  constructor() {}

  static getUploader(fileSize: number) {
    return multer({
      storage: multer.memoryStorage(),
      limits: { fileSize },
    });
  }
}
