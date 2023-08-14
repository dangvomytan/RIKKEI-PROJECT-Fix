import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import OrderModel from './order.Model'

interface IOrderDetailAttributes{
    id?: number;
    order_Id: number;
    full_Name:string;
    address:String;
    phone:number;
    method:string;
    is_Delete:number;                                                                                             
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface IOrderDetail extends Model<IOrderDetailAttributes>, IOrderDetailAttributes {}

const orderDetailModel = sequelize.define<IOrderDetail>('tbl_orderDetails', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    order_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    full_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    method: {
        type: DataTypes.STRING,
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
orderDetailModel.belongsTo(OrderModel, { foreignKey: 'order_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
OrderModel.hasOne(orderDetailModel,{ foreignKey: 'order_Id'});


//thuc hien tao bang
orderDetailModel.sync()
.then(() => {
  console.log('Create table orderDetail successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default orderDetailModel;
