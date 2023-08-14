import express, { Express, Response, Request } from "express";
import categoryServices from '../services/category.Service'

class categoryController {
    async category_GetAll(req: Request, res: Response) {
            categoryServices.getAll(req, res);
    }
    async category_CreateItem(req: Request, res: Response) {
        // Kiểm tra dữ liệu đầu vào
        const { category_Name} = req.body;
        if (!category_Name) {
            res.status(400).json({ message: 'Missing required data' });
        }
        else {
            categoryServices.createItem(req, res);
        }

    }
    async category_UpdateItem(req: Request, res: Response) {
        // Kiểm tra dữ liệu đầu vào
        const { id, category_Name } = req.body;
        if (!id || !category_Name ) {
            res.status(400).json({ message: 'Missing required data' });
        }
        else {
            categoryServices.updateItem(req, res);
        }

    }
    async category_IsDeleteItem(req: Request, res: Response) {
        // Kiểm tra dữ liệu đầu vào
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: 'Missing required data' });
        }
        else {
            categoryServices.isDeleteItem(req, res);
        }

    }
}
export default new categoryController()