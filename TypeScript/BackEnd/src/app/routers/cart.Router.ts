import express from 'express';
const router = express.Router();

import cartController from '../controllers/cart.Controller';

router.get("/get-all",cartController.cart_GetAll);
router.post("/create",cartController.cart_CreateItem);
router.patch("/update",cartController.cart_UpdateItem);
router.patch("/is-delete",cartController.cart_IsDeleteItem );

export default router