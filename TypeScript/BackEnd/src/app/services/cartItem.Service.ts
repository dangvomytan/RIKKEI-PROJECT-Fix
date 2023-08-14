import { Request, Response } from 'express';
import cartItemModel, { IcartItem } from '../models/cartItem.Model';

class CartItemServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IcartItem[] = await cartItemModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const result = await cartItemModel.create({
        cartItem_Id: req.body.cartItem_Id,
        product_Id: req.body.product_Id,
        version_Id: req.body.version_Id,
        quantity: req.body.quantity,
      });

      res.status(201).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const existingCartItem: IcartItem | null = await cartItemModel.findByPk(req.body.id);

      if (!existingCartItem) {
        res.status(404).json({ message: 'CartItem not found' });
      } else {
        await existingCartItem.update({
          cartItem_Id: req.body.cartItem_Id,
          product_Id: req.body.product_Id,
          version_Id: req.body.version_Id,
          quantity: req.body.quantity,
        });

        res.status(200).json({ message: 'CartItem updated successfully', cartItem: existingCartItem });
      }
    } catch (error) {
      console.error('Error updating CartItem:', error);
      res.status(500).json({ message: 'Error updating CartItem' });
    }
  };

  DeleteItem = async (req: Request, res: Response) => {
    try {
        const existingCartItem: IcartItem | null = await cartItemModel.findByPk(req.body.id);
  
        if (!existingCartItem) {
          res.status(404).json({ message: 'CartItem not found' });
        } else {
          await existingCartItem.destroy();
  
          res.status(200).json({ message: 'CartItem deleted successfully', cartItem: existingCartItem });
        }
      } catch (error) {
        console.error('Error deleting CartItem:', error);
        res.status(500).json({ message: 'Error deleting CartItem' });
      }
    };
}

export default new CartItemServices();
