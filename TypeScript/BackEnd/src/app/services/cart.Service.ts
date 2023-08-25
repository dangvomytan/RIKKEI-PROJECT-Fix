import { Request, Response } from 'express';
import cartModel, { ICart } from '../models/cart.Model';
import versionModel from '../models/version.Model';
import productModel  from '../models/product.Model';
import CartItemModel from '../models/cartItem.Model';
import VersionModel from '../models/version.Model';
import { log } from 'console';

class CartServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: ICart[] = await cartModel.findAll();
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  getByUser = async (req: Request, res: Response) => {
    try {
      const result = await cartModel.findOne({
        where: { user_Id: req.params.id } 
      });
      res.status(200).json(result);
    } catch (error: any) {
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
    } catch (error:any) {
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

  getAllByUser = async(req: Request, res: Response) => {
    const id_user:any = req.params.id;
    try {
          const cartUser = await cartModel.findOne({where: {user_Id:id_user}})
console.log(5555,cartUser);
const cartId = 18;

const result = await CartItemModel.findAll({
  attributes: ['id'], // Thêm các cột bạn muốn lấy thông tin
  include: [
    {
      model: productModel,
      required: true, // Sử dụng INNER JOIN thay vì LEFT JOIN
    },
    {
      model: VersionModel,
      required: true, // Sử dụng INNER JOIN thay vì LEFT JOIN
    },
  ],
  where: {
    cart_Id: cartId,
  },
});
console.log(66666,result);

       res.status(200).json({ data: result });
    } catch (error) {
       console.log(error);
       res.status(500).json({ message: 'error server' });
    }
 }

}

export default new CartServices();
