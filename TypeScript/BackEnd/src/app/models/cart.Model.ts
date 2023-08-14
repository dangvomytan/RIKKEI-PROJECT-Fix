import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import UserModel from './user.Model'

interface ICartAttributes{
    id?: number;
    user_Id: number;
    is_Delete:number;                                                                                             
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface ICart extends Model<ICartAttributes>, ICartAttributes {}

const cartModel = sequelize.define<ICart>('tbl_carts', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    user_Id: {
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
cartModel.belongsTo(UserModel, { foreignKey: 'user_Id', onDelete: 'CASCADE',onUpdate: 'CASCADE'  });
UserModel.hasOne(cartModel,{ foreignKey: 'user_Id'});


//thuc hien tao bang
cartModel.sync()
.then(() => {
  console.log('Create table cart successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default cartModel;
