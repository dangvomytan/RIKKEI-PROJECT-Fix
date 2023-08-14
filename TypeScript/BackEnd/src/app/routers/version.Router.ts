import express from 'express';
const router = express.Router();

import versionController from '../controllers/version.Controller';

router.get("/get-all",versionController.version_GetAll);
router.post("/create",versionController.version_CreateItem);
router.patch("/update",versionController.version_UpdateItem);
router.patch("/is-delete",versionController.version_IsDeleteItem);

export default router