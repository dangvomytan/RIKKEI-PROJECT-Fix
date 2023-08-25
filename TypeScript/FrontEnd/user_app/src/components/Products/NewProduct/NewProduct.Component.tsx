import React, { useEffect, useState } from "react";
import ProductGridComponent from "../ProductGrid/ProductGrid.Component";
import { IProduct, ProductApi } from "../../../models/product.Model";


const NewProductComponent: React.FC = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [productApi, setProductApi] = useState<any[]>([]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleCallData = async () => {
        try {
          const dataApi = await ProductApi.getAllProVer() || null;
          setProductApi(dataApi.filter((item: IProduct) => item.is_Delete === 0));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
      handleCallData();
    }, []);
    console.log(2222,productApi);
    
  
    return(
    <section className="my-4">
        <div className="max-w-6xl m-auto">
            <h1 className="text-2xl my-3 font-bold text-gray-600">New Arrivals</h1>
        <ProductGridComponent  productAPI={productApi}/>
        </div>
    </section>
    )
}
export default NewProductComponent