import express from 'express';
const router = express.Router();

import categoryController from '../controllers/categry.Controller'

router.get("/get-all",categoryController.category_GetAll);
router.post("/create",categoryController.category_CreateItem);
router.patch("/update",categoryController.category_UpdateItem);
router.patch("/is-delete",categoryController.category_IsDeleteItem);

export default router