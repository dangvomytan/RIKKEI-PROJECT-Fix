import express from 'express';
const router = express.Router();

import cartItemController from '../controllers/cartItem.Controller';

router.get("/get-all",cartItemController.cartItem_GetAll);
router.post("/create",cartItemController.cartItem_CreateItem);
router.patch("/update",cartItemController.cartItem_UpdateItem);
router.delete("/delete",cartItemController.cartItem_DeleteItem );

export default router