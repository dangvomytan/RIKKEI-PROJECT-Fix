import axiosClient from "../api/AxiosClient";


export interface IAdmin
{
    id?: number;
    full_Name: string;
    user_Name:string;
    password?:string;
    role:number;
    is_Delete?:number;
}

export class AdminApi {

     static async getAll():Promise<Array<IAdmin>> {
       const url:string = "api/v1/admin/get-all";
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IAdmin):Promise<Array<IAdmin>> {
        const url:string = "api/v1/admin/is-delete";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

      static async create(prams:IAdmin):Promise<Array<IAdmin>> {
        const url:string = "api/v1/admin/create";
        const res = await axiosClient.post(url,prams);
        return res.data;
      }

      static async update(prams:IAdmin):Promise<Array<IAdmin>> {
        const url:string = "api/v1/admin/update";
        const res = await axiosClient.patch(url,prams);
        console.log(res);
        return res.data;
      }

   }