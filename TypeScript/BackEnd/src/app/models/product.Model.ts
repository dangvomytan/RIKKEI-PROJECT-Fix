import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import categoryModel from './category.Model'

interface IProductAttributes{
    id?: number;
    category_Id:number
    product_Name: string;
    is_Delete:number;
    description: string;
}
// tao giao dien "Iproduct" ke thua cac phuong thuc tu Model sequelize
export interface IProduct extends Model<IProductAttributes>, IProductAttributes {}

const productModel = sequelize.define<IProduct>('tbl_product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    category_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    is_Delete:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, 
{
    timestamps: true,
});
productModel.belongsTo(categoryModel,{foreignKey: 'category_Id',onDelete: 'CASCADE', onUpdate: 'CASCADE'})
categoryModel.hasMany(productModel, { foreignKey: 'category_Id' });


//thuc hien tao bang
productModel.sync()
.then(() => {
  console.log('Create table product successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default productModel;
