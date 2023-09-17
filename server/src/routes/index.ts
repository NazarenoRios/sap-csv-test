import { Router } from "express";
const router = Router();

import users from "./user.routes";
import files from "./file.routes";

router.use("/users", users);
router.use("/files", files);

export default router;
