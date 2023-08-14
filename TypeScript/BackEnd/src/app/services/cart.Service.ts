import { Request, Response } from 'express';
import cartModel, { ICart } from '../models/cart.Model';

class CartServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: ICart[] = await cartModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const result = await cartModel.create({
        user_Id: req.body.user_Id,
        is_Delete: 0,
      });

      res.status(201).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const existingCart: ICart | null = await cartModel.findByPk(req.body.id);

      if (!existingCart) {
        res.status(404).json({ message: 'Cart not found' });
      } else {
        await existingCart.update({
          user_Id: req.body.user_Id,
          is_Delete: 0,
        });

        res.status(200).json({ message: 'Cart updated successfully', cart: existingCart });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      res.status(500).json({ message: 'Error updating cart' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingCart: ICart | null = await cartModel.findByPk(req.body.id);

      if (!existingCart) {
        res.status(404).json({ message: 'Cart not found' });
      } else {
        await existingCart.update({ is_Delete: 1 });

        res.status(200).json({ message: 'Cart deleted successfully', cart: existingCart });
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
      res.status(500).json({ message: 'Error deleting cart' });
    }
  };
}

export default new CartServices();
