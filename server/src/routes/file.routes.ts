import { Router } from "express";
import { addCsv } from "../controllers/files.controller";
import handleFileUpload from "../middleware/fileUpload";

const router = Router();

router.post("/", handleFileUpload, addCsv);

export default router;
