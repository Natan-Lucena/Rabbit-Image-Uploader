export interface ISaveFileRequest {
  externalId: string;
  file: Express.Multer.File;
}

export interface ISaveFileResponse {
  url: string;
}

export interface FileStorage {
  saveFile({ externalId, file }: ISaveFileRequest): Promise<ISaveFileResponse>;
}
