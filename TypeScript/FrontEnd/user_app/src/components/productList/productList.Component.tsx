import React, { useEffect, useState } from "react";
import { IProduct, ProductApi } from "../../models/product.Component";
import { useNavigate } from "react-router-dom";

const ProductListComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productApi, setProductApi] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = (await ProductApi.getAllProVer()) || null;
    setProductApi(DataApi.filter((item: IProduct) => item.is_Delete === 0));
  };
  useEffect(() => {
    handleCallData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleClickItem = (item: any) => {
    navigate(`detail/?search=${item.id}`)
  };

  return (
    <div className="bg-slate-200">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productApi?.length > 0 &&
            productApi?.map((item) => {
              console.log(productApi);

              return (
                <>
                  <div className="group " onClick={() => handleClickItem(item)}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={item.tbl_versions[0].image}
                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-xl text-center text-gray-700">
                      {item.product_Name} - {item.tbl_versions[0].version_Name}
                    </h3>
                    <p className="mt-1 text-lg text-center font-medium text-gray-900">
                      $ {item.tbl_versions[0].price}
                    </p>
                  </div>
                </>
              );
            })}
          {productApi.length == 0 && <div>No data</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
