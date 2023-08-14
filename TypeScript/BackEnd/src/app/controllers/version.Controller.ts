import { Response, Request } from 'express';
import versionServices from '../services/version.Service';

class VersionController {
    async version_GetAll(req: Request, res: Response) {
        versionServices.getAll(req, res);
    }

    async version_CreateItem(req: Request, res: Response) {
        const {product_Id, version_Name, price, inventory, image } = req.body;
        if (!product_Id || !version_Name || !price || !inventory || !image ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            versionServices.createItem(req, res);
        }
    }

    async version_UpdateItem(req: Request, res: Response) {
        const { id, product_Id, version_Name, price, inventory, image } = req.body;
        if (!id || !product_Id || !version_Name || !price || !inventory || !image) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            versionServices.updateItem(req, res);
        }
    }

    async version_IsDeleteItem(req: Request, res: Response) {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            versionServices.isDeleteItem(req, res);
        }
    }
}

export default new VersionController();
