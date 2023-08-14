import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';

import ProductModel from './product.Model'

interface IVersionAttributes{
    id?: number;
    product_Id:number
    version_Name: string;
    price:number;
    inventory:number;
    image:string;
    specification:string;
    is_Delete:number;
    description: string;
}
// tao giao dien "Iversion" ke thua cac phuong thuc tu Model sequelize
export interface IVersion extends Model<IVersionAttributes>, IVersionAttributes {}

const VersionModel = sequelize.define<IVersion>('tbl_version', {
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
    version_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    specification: {
        type: DataTypes.TEXT,
        allowNull: true,
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
VersionModel.belongsTo(ProductModel,{foreignKey: 'product_Id',onDelete: 'CASCADE', onUpdate: 'CASCADE'})
ProductModel.hasMany(VersionModel, { foreignKey: 'product_Id' });


//thuc hien tao bang
VersionModel.sync()
.then(() => {
  console.log('Create table version successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default VersionModel;
