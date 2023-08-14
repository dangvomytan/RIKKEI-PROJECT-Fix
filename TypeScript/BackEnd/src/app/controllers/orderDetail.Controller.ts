import { Response, Request } from 'express';
import orderDetailServices from '../services/orderDetail.Service';

class orderDetailDetailController {
    async orderDetail_GetAll(req: Request, res: Response) {
        orderDetailServices.getAll(req, res);
    }

    async orderDetail_CreateItem(req: Request, res: Response) {
        orderDetailServices.createItem(req, res);
    }

    async orderDetail_UpdateItem(req: Request, res: Response) {
        orderDetailServices.updateItem(req, res);
    }

    async orderDetail_IsDeleteItem(req: Request, res: Response) {
        orderDetailServices.isDeleteItem(req, res);
    }
}

export default new orderDetailDetailController();
