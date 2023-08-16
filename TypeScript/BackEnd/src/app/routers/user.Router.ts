import express from 'express';
const router = express.Router();

import userController from '../controllers/user.Controller';
import checkAuthentication from '../middlewares/checkAuth';

router.get("/get-all",checkAuthentication,userController.user_GetAll);
router.post("/create",userController.user_CreateItem);
router.patch("/update",userController.user_UpdateItem);
router.patch("/is-delete",userController.user_IsDeleteItem );

router.post("/register",userController.user_Register);
router.post("/login",userController.user_Login)

export default router