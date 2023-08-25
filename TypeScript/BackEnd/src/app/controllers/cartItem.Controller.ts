import { Response, Request } from 'express';
import cartItemServices from '../services/cartItem.Service';

class cartItemController {
    async cartItem_AddToCart(req: Request, res: Response) {
        cartItemServices.addToCart(req, res);
    }

    async cartItem_GetCartItemByCart(req: Request, res: Response) {
        cartItemServices.getCartItemByCart(req, res);
    }

    async cartItem_DeleteCartItemByID(req: Request, res: Response) {
        cartItemServices.deleteCartItemByID(req, res);
    }
    async cartItem_UpdateQuantityCartitemById(req: Request, res: Response) {
        cartItemServices.updateQuantityCartitemById(req, res);
    }
    
}

export default new cartItemController();
