import sequelize from '../../lib/db/mysql.connect'
import { DataTypes, Model } from 'sequelize';


interface IUserAttributes{
    id?: number;
    first_Name: string;
    last_Name:string;
    email:string;
    password:string;                                                                                             
    is_Delete:number;
}
// tao giao dien "Iadmin" ke thua cac phuong thuc tu Model sequelize
export interface IUser extends Model<IUserAttributes>, IUserAttributes {}

const UserModel = sequelize.define<IUser>('tbl_user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true,
    },
    first_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
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


//thuc hien tao bang
UserModel.sync()
.then(() => {
  console.log('Create table user successfully');
})
.catch((error) => {
  console.log('Error create table.');
  console.log('Error:',error);
});

export default UserModel;
