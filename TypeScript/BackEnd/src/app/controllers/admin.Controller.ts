import { Response, Request } from 'express';
import adminServices from '../services/admin.Service';

class AdminController {
    async admin_GetAll(req: Request, res: Response) {
        adminServices.getAll(req, res);
    }

    async admin_CreateItem(req: Request, res: Response) {
        const { full_Name, user_Name, password, role } = req.body;
        if (!full_Name || !user_Name || !password || !role ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            adminServices.createItem(req, res);
        }
    }

    async admin_UpdateItem(req: Request, res: Response) {
        const { id, full_Name, user_Name, password, role } = req.body;
        if (!id || !full_Name || !user_Name || !password || !role) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            adminServices.updateItem(req, res);
        }
    }

    async admin_IsDeleteItem(req: Request, res: Response) {
        const { id } = req.body;
        if (!id ) {
            res.status(400).json({ message: 'Missing required data' });
        } else {
            adminServices.isDeleteItem(req, res);
        }
    }
}

export default new AdminController();
