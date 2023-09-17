import { Router } from "express";
import { searchUsers } from "../controllers/user.controllers";
const router = Router();

router.get("/", searchUsers);

export default router;
