import express from 'express';
const router = express.Router();

import userController from '../controllers/user.Controller';

router.get("/get-all",userController.user_GetAll);
router.post("/create",userController.user_CreateItem);
router.patch("/update",userController.user_UpdateItem);
router.patch("/is-delete",userController.user_IsDeleteItem );

export default router