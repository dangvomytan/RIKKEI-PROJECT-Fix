import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import CartModel from './cart.Model'
import ProductModel from './product.Model'
import VersionModel from './version.Model'

interface IcartItemAttributes{
    id?: number;
    cartItem_Id: number;
    product_Id: number;
    version_Id:number;
    quantity:number;                                                                                           
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface IcartItem extends Model<IcartItemAttributes>, IcartItemAttributes {}

const cartItemModel = sequelize.define<IcartItem>('tbl_cartItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    cartItem_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    version_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, 
{
    timestamps: true,
});
cartItemModel.belongsTo(CartModel, { foreignKey: 'cart_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
CartModel.hasMany(cartItemModel,{ foreignKey: 'cart_Id'});
cartItemModel.belongsTo(ProductModel, { foreignKey: 'product_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
ProductModel.hasMany(cartItemModel,{ foreignKey: 'product_Id'});
cartItemModel.belongsTo(VersionModel, { foreignKey: 'version_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
VersionModel.hasOne(cartItemModel,{ foreignKey: 'version_Id'});

//thuc hien tao bang
cartItemModel.sync()
.then(() => {
  console.log('Create table cartItem successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default cartItemModel;
