import axiosClient from "../api/AxiosClient";


export interface IProduct 
{
    id?: number;
    category_Id:number
    product_Name: string;
    is_Delete?:number;
    description: string;
    createdAt?: string;
}

export class ProductApi {

     static async getAll():Promise<Array<IProduct>> {
       const url:string = "api/v1/product/get-all";
       const res = await axiosClient.get(url);
       return res.data;
     }
     
     static async isdelete(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/is-delete";
        const res = await axiosClient.patch(url,prams);
        console.log(res);
        
        return res.data;
      }

      static async create(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/create";
        const res = await axiosClient.post(url,prams);
        return res.data;
      }

      static async update(prams:IProduct):Promise<Array<IProduct>> {
        const url:string = "api/v1/product/update";
        const res = await axiosClient.patch(url,prams);
        console.log(res);
        return res.data;
      }

   }