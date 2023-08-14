import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import ProductModel from './product.Model'
import userModel from './user.Model'

interface IOrderAttributes{
    id?: number;
    product_Id: number;
    product_Name:string;
    user_Id: number;
    quantity:number;
    sum_Total:number;                                                                                             
    is_Delete:number;
    is_Status:number;
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface IOrder extends Model<IOrderAttributes>, IOrderAttributes {}

const OrderModel = sequelize.define<IOrder>('tbl_orders', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    product_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sum_Total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    is_Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_Delete:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, 
{
    timestamps: true,
});
OrderModel.belongsTo(userModel, { foreignKey: 'user_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
OrderModel.belongsTo(ProductModel, { foreignKey: 'product_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
userModel.hasMany(OrderModel,{ foreignKey: 'user_Id'});
ProductModel.hasMany(OrderModel,{foreignKey: 'product_Id'});

//thuc hien tao bang
OrderModel.sync()
.then(() => {
  console.log('Create table order successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default OrderModel;
