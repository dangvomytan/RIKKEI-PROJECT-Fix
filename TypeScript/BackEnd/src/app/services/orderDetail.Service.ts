import { Request, Response } from 'express';
import orderDetailModel, { IOrderDetail } from '../models/orderDetail.Model';

class OrderDetailServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IOrderDetail[] = await orderDetailModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
      const result = await orderDetailModel.create({
        order_Id: req.body.order_Id,
        full_Name: req.body.full_Name,
        address: req.body.address,
        phone: req.body.phone,
        method: req.body.method,
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
      const existingorderDetail: IOrderDetail | null = await orderDetailModel.findByPk(req.body.id);

      if (!existingorderDetail) {
        res.status(404).json({ message: 'orderDetail not found' });
      } else {
        await existingorderDetail.update({
          order_Id: req.body.order_Id,
          full_Name: req.body.full_Name,
          address: req.body.address,
          phone: req.body.phone,
          method: req.body.method,
          is_Delete: 0,
        });

        res.status(200).json({ message: 'orderDetail updated successfully', orderDetail: existingorderDetail });
      }
    } catch (error) {
      console.error('Error updating orderDetail:', error);
      res.status(500).json({ message: 'Error updating orderDetail' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingorderDetail: IOrderDetail | null = await orderDetailModel.findByPk(req.body.id);

      if (!existingorderDetail) {
        res.status(404).json({ message: 'orderDetail not found' });
      } else {
        await existingorderDetail.update({ is_Delete: 1 });

        res.status(200).json({ message: 'orderDetail deleted successfully', orderDetail: existingorderDetail });
      }
    } catch (error) {
      console.error('Error deleting orderDetail:', error);
      res.status(500).json({ message: 'Error deleting orderDetail' });
    }
  };
}

export default new OrderDetailServices();
