import { Request, Response } from 'express';
import adminModel, { IAdmin } from '../models/admin.Model';

class AdminServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IAdmin[] = await adminModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const existingAdmin: IAdmin | null = await adminModel.findOne({
        where: { user_Name: req.body.user_Name },
      });

      if (existingAdmin) {
        res.status(409).json({ message: 'User name already exists' });
      } else {
        const result = await adminModel.create({
          full_Name: req.body.full_Name,
          user_Name: req.body.user_Name,
          password: req.body.password,
          role: req.body.role,
          is_Delete: 0,
        });

        res.status(201).json(result);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const existingAdmin: IAdmin | null = await adminModel.findByPk(req.body.id);

      if (!existingAdmin) {
        res.status(404).json({ message: 'Admin not found' });
      } else {
        await existingAdmin.update({
          full_Name: req.body.full_Name,
          password: req.body.password,
          role: req.body.role,
          is_Delete: 0,
        });

        res.status(200).json({ message: 'Admin updated successfully', admin: existingAdmin });
      }
    } catch (error) {
      console.error('Error updating admin:', error);
      res.status(500).json({ message: 'Error updating admin' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingAdmin: IAdmin | null = await adminModel.findByPk(req.body.id);

      if (!existingAdmin) {
        res.status(404).json({ message: 'Admin not found' });
      } else {
        await existingAdmin.update({ is_Delete: 1 });

        res.status(200).json({ message: 'Admin deleted successfully', admin: existingAdmin });
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      res.status(500).json({ message: 'Error deleting admin' });
    }
  };
}

export default new AdminServices();
