import express from 'express';
const router = express.Router();

import cartItemController from '../controllers/cartItem.Controller';

router.post("/add-to-cart",cartItemController.cartItem_AddToCart);
router.get("/get-cartitem-by-cart/:id",cartItemController.cartItem_GetCartItemByCart);
router.delete("/delete-cartitem-by-id/:id",cartItemController.cartItem_DeleteCartItemByID);
router.patch("/update-quantity-cartitem-by-id/:id",cartItemController.cartItem_UpdateQuantityCartitemById);

export default router