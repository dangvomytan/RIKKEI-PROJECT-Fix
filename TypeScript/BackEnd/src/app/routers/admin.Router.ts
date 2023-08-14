import express from 'express';
const router = express.Router();

import adminController from '../controllers/admin.Controller';

router.get("/get-all",adminController.admin_GetAll);
router.post("/create",adminController.admin_CreateItem);
router.patch("/update",adminController.admin_UpdateItem);
router.patch("/is-delete",adminController.admin_IsDeleteItem );

export default router