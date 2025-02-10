import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const multerErrorHandlerMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "THIS FILE IS TO LARGE",
      });
    }
  }

  next(err);
};
