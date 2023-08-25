import axiosClient from "../api/AxiosClient";

export interface ICart
{
    [x: string]: any;
    id?: number;
    user_Id?: number;
    is_Delete?:number;      
}

export class cartApi 
{
  static getAllCart(userLogin: import("./user.Model").IUser | null): any {
    throw new Error('Method not implemented.');
  }
    //  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  static async getAllByUser(prams:any):Promise<Array<ICart>> {
    //   const url:string = `api/v1/cart/get-by-user/${prams.id}`;
    //   const res = await axiosClient.get(url);
    //   return res.data;
    // }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // static async addToCart(prams:any):Promise<Array<ICart>> {
    //     const url:string = `api/v1/cart/get-by-user/${prams.id}`;
    //     const res = await axiosClient.get(url);
    //     return res.data;
    //   }

    //   static async getAll():Promise<Array<ICart[]>> {
    //     const url:string = 'api/v1/cart/get-all';
    //     const res = await axiosClient.get(url);
    //     return res.data;
    //   }
    //        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //  static async getAllCart(prams:any):Promise<Array<ICart>> {
    //   const url:string = `api/v1/cart/get-all-by-user/${prams.id}`;
    //   const res = await axiosClient.get(url);
    //   return res.data;
    // }
}