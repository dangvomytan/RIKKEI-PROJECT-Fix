import { Response, Request } from 'express';
import cartServices from '../services/cart.Service';

class cartDetailController {
    async cart_GetAll(req: Request, res: Response) {
        cartServices.getAll(req, res);
    }

    async cart_CreateItem(req: Request, res: Response) {
        cartServices.createItem(req, res);
    }

    async cart_UpdateItem(req: Request, res: Response) {
        cartServices.updateItem(req, res);
    }

    async cart_IsDeleteItem(req: Request, res: Response) {
        cartServices.isDeleteItem(req, res);
    }
}

export default new cartDetailController();
