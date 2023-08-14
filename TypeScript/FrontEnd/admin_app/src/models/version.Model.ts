import axiosClient from "../api/AxiosClient";


export interface IVersion 
{
    id?: number;
    product_Id:number
    version_Name: string;
    price:number;
    inventory:number;
    image:string;
    specification:string;
    is_Delete?:number;
    description: string;
    createdAt?: string;
}

export class VersionApi {

     static async getAll():Promise<Array<IVersion>> {
       const url:string = "api/v1/version/get-all";
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IVersion):Promise<Array<IVersion>> {
        const url:string = "api/v1/version/is-delete";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

      static async create(prams:IVersion):Promise<Array<IVersion>> {
        const url:string = "api/v1/version/create";
        const res = await axiosClient.post(url,prams);
        return res.data;
      }

      static async update(prams:IVersion):Promise<Array<IVersion>> {
        const url:string = "api/v1/version/update";
        const res = await axiosClient.patch(url,prams);
        return res.data;
      }

   }