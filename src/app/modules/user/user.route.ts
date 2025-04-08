import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router();
router.post("/create-admin", userController.createUserC);
export default router;
