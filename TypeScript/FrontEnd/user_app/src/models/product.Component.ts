import axiosClient from "../api/AxiosClient";


export interface IProduct
{
    id?: number;
    category_Id?:number
    product_Name?: string;
    is_Delete?:number;
    description?: string;

}

export class ProductApi 
{
     static async getAllProVer():Promise<Array<IProduct>> {
      const url:string = "api/v1/product/get-all-pro-ver";
      const res = await axiosClient.get(url);
      return res.data;
    }
}