import { Response, Request } from 'express';
import cartItemServices from '../services/cartItem.Service';

class cartItemController {
    async cartItem_GetAll(req: Request, res: Response) {
        cartItemServices.getAll(req, res);
    }

    async cartItem_CreateItem(req: Request, res: Response) {
        cartItemServices.createItem(req, res);
    }

    async cartItem_UpdateItem(req: Request, res: Response) {
        cartItemServices.updateItem(req, res);
    }

    async cartItem_DeleteItem(req: Request, res: Response) {
        cartItemServices.DeleteItem(req, res);
    }
}

export default new cartItemController();
