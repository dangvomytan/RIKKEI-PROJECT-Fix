
import { Request, Response } from 'express';

import categoryModel, { ICategory } from '../models/category.Model'


class categoryServices {

  getAll = async (_req: Request, res: Response) => {
    try {
      const result: ICategory[] = await categoryModel.findAll();
      res.status(200).json(result)
    } catch (error) {
      console.log(error.messege);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {

      // Kiểm tra sự tồn tại của danh mục dựa trên tên
      const existingCategory: ICategory | null = await categoryModel.findOne({
        where: { category_Name: req.body.category_Name },
      });

      if (existingCategory) {
        res.status(409).json({ message: 'Category already exists' });
      }
      else {
        const result = await categoryModel.create(
          {
            category_Name: req.body.category_Name,
            is_Delete: 0,
            description: req.body.description,
          }
        );
        res.status(201).json(result)
      }

    }
    catch (error) {
      console.log(error.messege);
      res.status(500).send('Internal Server Error');
    }
  };

  updateItem = async (req: Request, res: Response) => {
    try {
      // Tìm danh mục cần cập nhật
      const existingCategoryToUpdate: ICategory | null = await categoryModel.findByPk(req.body.id);

      if (!existingCategoryToUpdate) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        // Kiểm tra sự tồn tại của danh mục khác có cùng tên
        const existingCategoryByName: ICategory | null = await categoryModel.findOne({
          where: { category_Name: req.body.category_Name },
        });

        if (existingCategoryByName && existingCategoryByName.id !== existingCategoryToUpdate.id) {
          res.status(409).json({ message: 'Category with the same name already exists' });
        } else {
          // Thực hiện cập nhật
          await existingCategoryToUpdate.update({
            category_Name: req.body.category_Name,
            is_Delete: 0,
            description: req.body.description,
          });

          res.status(200).json({ message: 'Category updated successfully', category: existingCategoryToUpdate });
        }
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Error updating category' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      // Tìm danh mục cần cập nhật
      const existingCategory: ICategory | null = await categoryModel.findByPk(req.body.id);
      if (!existingCategory) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        // Thực hiện cập nhật
        await existingCategory.update({
          is_Delete: 1,
        });
  
        res.status(200).json({ message: 'Category updated successfully', category: existingCategory });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ message: 'Error updating category' });
    }
  };
}
export default new categoryServices();