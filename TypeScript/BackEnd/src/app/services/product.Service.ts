import { Request, Response } from 'express';
import productModel, { IProduct } from '../models/product.Model';
import versionModel from '../models/version.Model';
import { Op, Sequelize } from 'sequelize';

class ProductServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IProduct[] = await productModel.findAll();
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  getAllProVer = async (_req: Request, res: Response) => {
    try {
      const result = await versionModel.findAll({
        include: [
          {
            model: productModel
          },
        ],
      });
    
      res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  

  createItem = async (req: Request, res: Response) => {
    try {
      const existingProduct: IProduct | null = await productModel.findOne({
        where: { product_Name: req.body.product_Name },
      });

      if (existingProduct) {
        res.status(409).json({ message: 'Product already exists' });
      } else {
        const result = await productModel.create({
          product_Name: req.body.product_Name,
          is_Delete: 0,
          description: req.body.description,
          category_Id: req.body.category_Id, //
        });

        res.status(201).json(result);
      }
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      const existingProduct: IProduct | null = await productModel.findByPk(req.body.id);

      if (!existingProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await existingProduct.update({
          category_Id: req.body.category_Id, //
          product_Name: req.body.product_Name,
          description: req.body.description,
        });

        res.status(200).json({ message: 'Product updated successfully', product: existingProduct });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingProduct: IProduct | null = await productModel.findByPk(req.body.id);

      if (!existingProduct) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await existingProduct.update({ is_Delete: 1 });

        res.status(200).json({ message: 'Product deleted successfully', product: existingProduct });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };

  // fix

  getAllInfoProByIdVer = async (req: Request, res: Response) => {
    const{id}=req.params;
    try {
      //Lấy thông tin version theo id version
      const version = await versionModel.findByPk(id);
      if(!version)
      {
        res.status(404).json({ message: 'Not found' });
      }
      else
      {
        //Lấy thông tin bảng product và version
        const product = await productModel.findOne({
          where: {id: version.product_Id},
          include: [
            {
              model: versionModel,
            }]
        });
        if(!product)
        {
          res.status(404).json({ message: 'Not found' });
        }
        else
        {
          res.status(200).json({ ...version.dataValues, product });
        }
      }
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };












}

export default new ProductServices();
