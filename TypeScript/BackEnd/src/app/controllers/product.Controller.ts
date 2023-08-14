import { Response, Request } from 'express';
import productServices from '../services/product.Service';

class ProductController {
    async product_GetAll(req: Request, res: Response) {
        productServices.getAll(req, res);
    }

    async product_CreateItem(req: Request, res: Response) {
        const { category_Id, product_Name } = req.body;
        if (!category_Id || !product_Name ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            productServices.createItem(req, res);
        }
    }

    async product_UpdateItem(req: Request, res: Response) {
        const { id, category_Id, product_Name } = req.body;
        if (!id || !category_Id || !product_Name ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            productServices.updateItem(req, res);
        }
    }

    async product_IsDeleteItem(req: Request, res: Response) {
        const { id } = req.body;
        if (!id ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            productServices.isDeleteItem(req, res);
        }
    }
}

export default new ProductController();
