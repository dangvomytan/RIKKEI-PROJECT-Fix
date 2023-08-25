import axiosClient from "../api/AxiosClient";

export interface ICartItem
{
    id?: number;
    cart_Id?:number;
    product_Id?: number;
    version_Id?:number;
    quantity?:number; 
}

export class cartItemApi 
{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async addToCart(params:any):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/add-to-cart`;
        const res = await axiosClient.post(url,params);
        return res.data;
      }
      static async getCartItemByCart(id:any):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/get-cartitem-by-cart/${id}`;
        const res = await axiosClient.get(url);
        return res.data;
      }
      static async deleteCartItemById(id:any):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/delete-cartitem-by-id/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
      }
      static async updateQuantiyCartItemById(id:number,params:ICartItem):Promise<Array<ICartItem>> {
        const url:string = `api/v1/cart-item/update-quantity-cartitem-by-id/${id}`;
        const res = await axiosClient.patch(url,params);
        return res.data;
      }
}