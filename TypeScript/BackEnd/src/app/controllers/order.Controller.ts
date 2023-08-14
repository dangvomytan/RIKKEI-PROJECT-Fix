import { Response, Request } from 'express';
import orderServices from '../services/order.Service';

class OrderController {
    async order_GetAll(req: Request, res: Response) {
        orderServices.getAll(req, res);
    }

    async order_CreateItem(req: Request, res: Response) {
        orderServices.createItem(req, res);
    }

    async order_UpdateItem(req: Request, res: Response) {
        orderServices.updateItem(req, res);
    }

    async order_IsDeleteItem(req: Request, res: Response) {
        orderServices.isDeleteItem(req, res);
    }
}

export default new OrderController();
