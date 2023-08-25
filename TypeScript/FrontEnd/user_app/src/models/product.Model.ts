import axiosClient from "../api/AxiosClient";


export interface IProduct
{
    id?: number;
    category_Id?:number
    product_Name?: string;
    is_Delete?:number;
    description?: string;

    product?:Product;

}

export interface Product
{
  product_Name?:string;
  version_Name?:string;
  tbl_versions?:Array<Product> | null;
  price?:number;
  id:number;
  image?:string;
}

export class ProductApi 
{
     static async getAllProVer():Promise<Array<IProduct>> {
      const url:string = "api/v1/product/get-all-pro-ver";
      const res = await axiosClient.get(url);
    //   console.log(res.data);
      
      return res.data;
    }

    //Lấy toàn bọ thông tin của product bằng id
    static async getAllInfoProductById(id:number):Promise<any> {
      const url:string = `api/v1/product/get-all-info-pro-by-id-ver/${id}`;
      const res:any = await axiosClient.get(url);
      console.log(res.data);
      
      return res.data;
    }
}