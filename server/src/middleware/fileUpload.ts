import { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./src/uploads/", // Ruta relativa para llegar a "src/uploads"
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  },
});

const upload = multer({ storage });

const handleFileUpload = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        // Maneja los errores de carga de archivos aquí
        return res.status(400).json({ message: "Error uploading file." });
      }
      next();
    });
  };
};

export default handleFileUpload("csv");
