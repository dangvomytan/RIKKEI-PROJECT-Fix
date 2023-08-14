import axiosClient from "../api/AxiosClient";


export interface ICategory
{
    id?: number;
    category_Name: string;
    is_Delete:number;
    description: string;
}

export class CategoryApi {

     static async getAll():Promise<Array<ICategory>> {
       const url:string = "api/v1/category/get-all";
       const res = await axiosClient.get(url);
       return res.data;
     }
     
    //  static async isdelete(prams:ICategory):Promise<Array<ICategory>> {
    //     const url:string = "api/v1/product/is-delete";
    //     const res = await axiosClient.patch(url,prams);
    //     console.log(res);
        
    //     return res.data;
    //   }

   }