import { Request, Response } from 'express';
import orderModel, { IOrder } from '../models/order.Model';

class OrderServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IOrder[] = await orderModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
        const result = await orderModel.create({
          product_Id: req.body.product_Id,
          product_Name: req.body.product_Name,
          user_Id: req.body.user_Id,
          quantity: req.body.quantity,
          sum_Total: req.body.sum_Total,
          is_Status: 0,
          is_Delete: 0,
        });

        res.status(201).json(result);
      }
     catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const existingOrder: IOrder | null = await orderModel.findByPk(req.body.id);

      if (!existingOrder) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        await existingOrder.update({
          product_Id: req.body.product_Id,
          product_Name: req.body.product_Name,
          user_Id: req.body.user_Id,
          quantity: req.body.quantity,
          sum_Total: req.body.sum_Total,
          is_Status: req.body.is_Status,
          is_Delete: 0,
        });

        res.status(200).json({ message: 'Order updated successfully', order: existingOrder });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingOrder: IOrder | null = await orderModel.findByPk(req.body.id);

      if (!existingOrder) {
        res.status(404).json({ message: 'Order not found' });
      } else {
        await existingOrder.update({ is_Delete: 1 });

        res.status(200).json({ message: 'Order deleted successfully', order: existingOrder });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Error deleting order' });
    }
  };
}

export default new OrderServices();
