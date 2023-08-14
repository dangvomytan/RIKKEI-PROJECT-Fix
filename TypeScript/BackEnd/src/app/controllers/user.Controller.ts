import { Response, Request } from 'express';
import userServices from '../services/user.Service';

class UserController {
    async user_GetAll(req: Request, res: Response) {
        userServices.getAll(req, res);
    }

    async user_CreateItem(req: Request, res: Response) {
        const { first_Name, last_Name, email, password} = req.body;
        if (!first_Name || !last_Name || !password || !email ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            userServices.createItem(req, res);
        }
    }

    async user_UpdateItem(req: Request, res: Response) {
        const { id, first_Name, last_Name, email, password} = req.body;
        if (!id || !first_Name || !last_Name || !password || !email) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            userServices.updateItem(req, res);
        }
    }

    async user_IsDeleteItem(req: Request, res: Response) {
        const { id } = req.body;
        if (!id ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            userServices.isDeleteItem(req, res);
        }
    }
}

export default new UserController();
