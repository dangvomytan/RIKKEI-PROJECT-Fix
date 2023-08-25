import { Request, Response } from 'express';
import cartItemModel, { IcartItem } from '../models/cartItem.Model';
import productModel from '../models/product.Model';
import { where } from 'sequelize';
import VersionModel from '../models/version.Model';

class CartItemServices {

  addToCart = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { cart_Id, product_Id, version_Id, quantity } = req.body;
    try {
      const checkItem = await cartItemModel.findOne({ where: { version_Id } });
      if (!checkItem) {
        const result: IcartItem = await cartItemModel.create({
          cart_Id: cart_Id,
          product_Id: product_Id,
          version_Id: version_Id,
          quantity: quantity,
        });
        res.status(201).json(result);
      }  
      else
      {
        checkItem.quantity = Number(checkItem.quantity) + Number(quantity);   
        await checkItem.save();   
        res.status(200).json({ message: 'Updated successfully!' });
      }
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateQuantityCartitemById = async (req: Request, res: Response) => {
    const id =req.params.id;
    try {
      const existingCartItem: IcartItem | null = await cartItemModel.findByPk(id);
      if (!existingCartItem) {
        res.status(404).json({ message: 'CartItem not found' });
      } else {
        await existingCartItem.update({
          quantity: req.body.quantity,
        });

        res.status(200).json({ message: 'CartItem updated successfully', cartItem: existingCartItem });
      }
    } catch (error) {
      console.error('Error updating CartItem:', error);
      res.status(500).json({ message: 'Error updating CartItem' });
    }
  };

  getCartItemByCart = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    try {
      const cart: IcartItem[] = await cartItemModel.findAll({
        where:{cart_Id:id},
        include: [{model: productModel},{model: VersionModel}],
      });
      res.status(200).json(cart);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  deleteCartItemByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const existingCartItem: IcartItem | null = await cartItemModel.findByPk(id);

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
  }

}

export default new CartItemServices();
