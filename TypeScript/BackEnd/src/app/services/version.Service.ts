import { Request, Response } from 'express';
import versionModel, { IVersion } from '../models/version.Model';

class VersionServices {
  getAll = async (_req: Request, res: Response) => {
    try {
      const result: IVersion[] = await versionModel.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  createItem = async (req: Request, res: Response) => {
    try {
        const result = await versionModel.create({
          version_Name: req.body.version_Name,
          price: req.body.price,
          inventory: req.body.inventory,
          image: req.body.image,
          specification: req.body.specification,
          is_Delete: 0,
          description: req.body.description,
          product_Id: req.body.product_Id,
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
      const existingVersion: IVersion | null = await versionModel.findByPk(req.body.id);

      if (!existingVersion) {
        res.status(404).json({ message: 'Version not found' });
      } else {
        await existingVersion.update({
          product_Id: req.body.product_Id,
          version_Name: req.body.version_Name,
          price: req.body.price,
          inventory: req.body.inventory,
          image: req.body.image,
          specification: req.body.specification,
          is_Delete: 0,
          description: req.body.description,
        });

        res.status(200).json({ message: 'Version updated successfully', version: existingVersion });
      }
    } catch (error) {
      console.error('Error updating version:', error);
      res.status(500).json({ message: 'Error updating version' });
    }
  };

  isDeleteItem = async (req: Request, res: Response) => {
    try {
      const existingVersion: IVersion | null = await versionModel.findByPk(req.body.id);

      if (!existingVersion) {
        res.status(404).json({ message: 'Version not found' });
      } else {
        await existingVersion.update({ is_Delete: 1 });

        res.status(200).json({ message: 'Version deleted successfully', version: existingVersion });
      }
    } catch (error) {
      console.error('Error deleting version:', error);
      res.status(500).json({ message: 'Error deleting version' });
    }
  };
}

export default new VersionServices();