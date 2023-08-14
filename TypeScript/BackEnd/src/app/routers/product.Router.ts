import express from 'express';
const router = express.Router();

import productController from '../controllers/product.Controller';

router.get("/get-all",productController.product_GetAll);
router.post("/create",productController.product_CreateItem);
router.patch("/update",productController.product_UpdateItem);
router.patch("/is-delete",productController.product_IsDeleteItem);

export default router