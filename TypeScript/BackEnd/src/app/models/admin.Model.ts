import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';


interface IAdminAttributes{
    id?: number;
    full_Name: string;
    user_Name:string;
    password:string;
    role:number;
    is_Delete:number;
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface IAdmin extends Model<IAdminAttributes>, IAdminAttributes {}

const AdminModel = sequelize.define<IAdmin>('tbl_admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    full_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
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


//thuc hien tao bang
AdminModel.sync()
.then(() => {
  console.log('Create table admin successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default AdminModel;
