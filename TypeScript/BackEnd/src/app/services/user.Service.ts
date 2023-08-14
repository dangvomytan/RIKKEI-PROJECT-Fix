import { Request, Response } from 'express';
import userModel, { IUser } from '../models/user.Model';

class UserServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IUser[] = await userModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const existingUser: IUser | null = await userModel.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        const result = await userModel.create({
          first_Name: req.body.first_Name,
          last_Name: req.body.last_Name,
          email: req.body.email,
          password: req.body.password,
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
      const existingUser: IUser | null = await userModel.findByPk(req.body.id);

      if (!existingUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await existingUser.update({
          first_Name: req.body.first_Name,
          last_Name: req.body.last_Name,
          password: req.body.password,
          is_Delete: 0,
        });

        res.status(200).json({ message: 'User updated successfully', User: existingUser });
      }
    } catch (error) {
      console.error('Error updating User:', error);
      res.status(500).json({ message: 'Error updating User' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingUser: IUser | null = await userModel.findByPk(req.body.id);

      if (!existingUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await existingUser.update({ is_Delete: 1 });

        res.status(200).json({ message: 'User deleted successfully', User: existingUser });
      }
    } catch (error) {
      console.error('Error deleting User:', error);
      res.status(500).json({ message: 'Error deleting User' });
    }
  };
}

export default new UserServices();