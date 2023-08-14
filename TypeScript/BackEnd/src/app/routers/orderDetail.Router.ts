import express from 'express';
const router = express.Router();

import orderDetailController from '../controllers/orderDetail.Controller';

router.get("/get-all",orderDetailController.orderDetail_GetAll);
router.post("/create",orderDetailController.orderDetail_CreateItem);
router.patch("/update",orderDetailController.orderDetail_UpdateItem);
router.patch("/is-delete",orderDetailController.orderDetail_IsDeleteItem );

export default router