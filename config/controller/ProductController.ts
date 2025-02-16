import { Request, RequestHandler, Response } from "express";
import multer, { StorageEngine, FileFilterCallback, Multer } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/'); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};

const upload: RequestHandler = multer({
  storage: storage,
  limits: { fileSize: 7 * 1024 * 1024 },
  fileFilter: fileFilter,
}).single("image");

export default upload;
