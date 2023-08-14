import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Sequelize, Model } from 'sequelize';


interface ICategoryAttributes{
    id?: number;
    category_Name: string;
    is_Delete:number;
    description: string;
}
// tao giao dien "ICategory" ke thua cac phuong thuc tu Model sequelize
export interface ICategory extends Model<ICategoryAttributes>, ICategoryAttributes {}

const categoryModel = sequelize.define<ICategory>('tbl_category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
        unique:true,
    },
    category_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    is_Delete:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, 
{
    timestamps: true,
});

//thuc hien tao bang
categoryModel.sync()
.then(() => {
  console.log('Create table category successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default categoryModel;
