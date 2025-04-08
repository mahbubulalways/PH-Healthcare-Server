import { Router } from "express";
import { adminController } from "./admin.controllers";

const router = Router();
router.get("/", adminController.getAllAdminC);
router.get("/:id", adminController.getAdminByIdC);
router.patch("/update/:id", adminController.updateAdminByIdC);
router.patch("/delete/:id", adminController.deleteAdminByIdC);
router.patch("/delete-soft/:id", adminController.softDeleteAdminByIdC);
export default router;
