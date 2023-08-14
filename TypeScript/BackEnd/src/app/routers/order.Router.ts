import express from 'express';
const router = express.Router();

import orderController from '../controllers/order.Controller';

router.get("/get-all",orderController.order_GetAll);
router.post("/create",orderController.order_CreateItem);
router.patch("/update",orderController.order_UpdateItem);
router.patch("/is-delete",orderController.order_IsDeleteItem );

export default router