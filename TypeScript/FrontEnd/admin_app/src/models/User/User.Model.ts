import axiosClient from "../../api/AxiosClient";


export interface IUserList 
{
    id: number,
    fullName: string,
    userName: string,
    password: string,
    role: number,
    status: number
    updatedAt?: string,
    createdAt?: string
}

export class UserApi {
     //get demo data
     static getAllUser():Promise<Array<IUserList>> {
       const url:string = "api/v1/users/getAllUsers";
       return axiosClient.get(url);
     }
   


     static getUserById(id:number):Promise<Array<IUserList>> {
       const url = `api/v1/users/${id}`;
       return axiosClient.get(url);
     }
   
    //  //post

     static registerUser( params:IUserList ):Promise<Array<IUserList>>  {
          const url = `api/v1/users/register`;
          return axiosClient.post(url, params);
        }

        static loginUser( params:IUserList ):Promise<Array<IUserList>> {
          const url = `api/v1/users/login`;
          return axiosClient.post(url, params);
        }
    //  //path
     static updateUser( params:IUserList ):Promise<Array<IUserList>> {
      const url = `api/v1/users/updateUsers`;
      return axiosClient.patch(url, params);
     }

    //  //delete
     static deleteUser(id:number):Promise<Array<IUserList>>  {
      const url = `api/v1/users/deleteUsers/${id}`;
      return axiosClient.delete(url);
     }
   }