import { Request, Response } from 'express';
import userModel, { IUser } from '../models/user.Model';
import jwt from 'jsonwebtoken';
import sceret from '../../configs/jwt.config';
import bcrypt from 'bcryptjs';
import cartModel from '../models/cart.Model';
let refreshTokenArr:any[] = []

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

  // createItem = async (req: Request, res: Response) => {
  //   try {
  //     const existingUser: IUser | null = await userModel.findOne({
  //       where: { email: req.body.email },
  //     });

  //     if (existingUser) {
  //       res.status(409).json({ message: 'Email already exists' });
  //     } else {
  //       const result = await userModel.create({
  //         first_Name: req.body.first_Name,
  //         last_Name: req.body.last_Name,
  //         email: req.body.email,
  //         password: req.body.password,
  //         is_Delete: 0,
  //       });
  //       res.status(201).json(result);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // };

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      // Kiểm tra xem email đã tồn tại chưa
      const checkEmail = await userModel.findOne({ where: { email } });
      if (checkEmail) {
        res.status(400).json({ message: 'Email already exists' });
      }
      else
        if (password.length < 6) {
          res.status(401).json({ message: 'Mật khẩu phải ít nhất 6 ký tự' });
        }
        else {
          // Mã hóa mật khẩu
          const saltRounds = 10;
          const hashPassword = await bcrypt.hash(password, saltRounds);
          // Tạo một người dùng mới
          const newUser = await userModel.create({
            first_Name: req.body.first_Name,
            last_Name: req.body.last_Name,
            email: req.body.email,
            password: hashPassword,
            is_Delete: 0,
          });
          // Tạo một giỏ hàng mới cho người dùng
          await cartModel.create({ user_Id: Number(newUser.id), is_Delete: 0 });
          res.status(201).json({ message: 'Đăng ký người dùng thành công', data: newUser });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
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


  login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    console.log(email);
     try {
      const findUser:IUser | null = await userModel.findOne({ where: { email } });
        if (!findUser) {
          res.status(404).json({ message: 'Email not found' });
        } else {
         const myPass = await bcrypt.compare(password, findUser.password);
         if(myPass)
         {
          console.log(">>>",findUser.dataValues); //dataValues =>>> Giá trị trả về của object
          
          const accessToken = jwt.sign(findUser.dataValues, sceret.sceretKey,{expiresIn: "60s"}); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m
          const accessTokenRefresh = jwt.sign(findUser.dataValues, sceret.sceretKeyRefresh,{expiresIn: "365d"}) // Tạo refreshToken để dự trữ
          refreshTokenArr.push(accessTokenRefresh)// push refresh token vào 1 mảng để lưu trữ
          const {password, ...data} = findUser.dataValues;  //loại bỏ password ra khỏi phần data trả về frontend,destructuring
          res.cookie("accessTokenRefresh",accessTokenRefresh,{//Lưu refreshToken vào cookie khi đăng nhập thành công
              httpOnly:true,
              secure:true,
              sameSite:"strict"
          })
          res.status(200).json({
            data,
            accessToken
          })
        }
        else
        {
          res.status(401).json({msg: "Password wrong"});
        }
        }
     } catch (error) {
        console.error(error);

        res.status(500).json({msg: "Server error"});
     }
  }


}

export default new UserServices();