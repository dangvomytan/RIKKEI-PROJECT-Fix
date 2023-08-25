import React from "react";
import ProductBoxComponent from "../ProductBox/ProductBox.Component";
import { ProductProps } from "../../../types/types";


const ProductGridComponent: React.FC<ProductProps> = (props) => {
    const dataApi = props.productAPI;

    return (
        <section className="grid grid-cols-3 gap-3">
            {
                dataApi.length > 0 && dataApi.map((item:any) => {
                    return (
                        <div key={item.id} >
                            <ProductBoxComponent product={item} />
                        </div>
                    )

                })
            }
        </section>
    )
}
export default ProductGridComponent