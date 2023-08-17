import React, { useEffect, useState } from "react";
import { IProduct, ProductApi } from "../../models/product.Component";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Toaster, toast } from "react-hot-toast";
import { IUser } from "../../models/user.Model";
const DetailComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productApi, setProductApi] = useState<any[]>([]);
  const [quantity, setquantity] = useState(1);
  const [indexVer, setIndexVer] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const { search } = queryString.parse(location.search);
  const id = search || null;

  const handleCallData = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataApi: any = (await ProductApi.getAllProVer()) || null;
    // console.log(DataApi);
    setProductApi(
      DataApi.filter(
        (item: IProduct) => item.is_Delete === 0 && item.id == Number(id)
      )
    );
  };
  useEffect(() => {
    handleCallData();
  }, []);

  // tang qty
  const handleIncrease = () => {
    if (quantity >= 0) {
      const newQuantity = Number(quantity) + 1;
      setquantity(newQuantity);
    }
  };

  // giam qty
  const handleReduce = () => {
    if (quantity > 0) {
      const newQuantity = Number(quantity) - 1;
      setquantity(newQuantity);
    }
  };
  // chon phien bang
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlechangeVer = (ver: any) => {
    setIndexVer(ver);
  };

  const handleClickGoToCart = () => {
    navigate("/cart");
  };
  //Cick add to cart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickAddtoCart = async (pro_id: any, ver_id:any ) => {
    const userJSON: string | null = localStorage.getItem("userLogin");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userLogin: IUser | null =
      userJSON !== null ? JSON.parse(userJSON) : null;
      console.log(userLogin);
      
    // const cartItem = {
    //   id_version: version?.id,
    //   id_cart:customer?.id ,
    //   quantity: quantity,
    // }
    // console.log(222,item);
    try {
      console.log(pro_id,ver_id);
      // await dispatch(AddToCart(item)).unwrap();
      const notify = () => toast.success("Successfully");
      notify();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(error.message);
      const notify = () => toast.error(error.message);
      notify();
    }
  };
  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="bg-slate-200">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
          {/* <h2 className="sr-only">Products</h2> */}
          {productApi.length > 0 &&
            productApi.map((ver) => {
              return (
                <div
                  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  "
                  key={ver.id}
                >
                  <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 rounded-lg   ">
                    <div className="detail_image">
                      <img
                        src={ver.tbl_versions[indexVer].image}
                        className="w-full h-full rounded-lg  object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2 ">
                    <div className="detail_header">
                      <h3 className="font-bold text-2xl uppercase">
                        {ver.product_Name}
                      </h3>
                    </div>
                    <div className="detail_body">
                      {/* <div className='detail_brand'><b>Thương hiệu:</b> DJI</div> */}
                      <div className="text-xl">
                        <b>Ver: {ver.tbl_versions[indexVer].version_Name}</b>
                      </div>
                      <div className="detail_dev"> {ver.description}</div>
                      <div className="detail_price text-xl text-red-500 font-bold my-2">
                        $ {ver.tbl_versions[indexVer].price}
                      </div>
                      <div className="detail_quantity">
                        <div className="detail_qty_box flex items-center text-center gap-2">
                          <div
                            className="btn_qty cursor-pointer text-2xl py-1 px-4 border-2 border-gray-400 hover:border-blue-500  text-black  rounded-md"
                            onClick={() => handleIncrease()}
                          >
                            +
                          </div>
                          <div className="btn_qty text-2xl py-1 px-8 border-2 border-gray-400 bg-white rounded-md">
                            {quantity}
                          </div>
                          <div
                            className="btn_qty cursor-pointer text-2xl py-1 px-4 border-2 border-gray-400 hover:border-blue-500  text-black  rounded-md"
                            onClick={() => handleReduce()}
                          >
                            -
                          </div>
                        </div>
                      </div>
                      <div className="detail_sub flex gap-4 my-2">
                        <button
                          className="btn_submit text-2xl py-2 px-8 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-md "
                          onClick={() =>
                            handleClickAddtoCart(ver.id,ver.tbl_versions[indexVer].id)
                          }
                        >
                          Thêm vào giỏ hàng
                        </button>
                        <button
                          className="btn_submit text-2xl py-2 px-8 border-2  border-blue-400 bg-blue-400  hover:bg-blue-500 text-white rounded-md "
                          onClick={() => handleClickGoToCart()}
                        >
                          Đi đến giỏ hàng
                        </button>
                      </div>
                      <div>
                        <div>
                          <b>Lựa chọn phiên bản:</b>
                        </div>
                        <div className="ver_box flex gap-1 my-2">
                          {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ver.tbl_versions.length > 0 &&
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              ver.tbl_versions.map((item: any, index: any) => {
                                return (
                                  <div
                                    className="btn_ver py-1 px-4 border-2  rounded-md   border-gray-400 bg-white hover:border-blue-500  text-black"
                                    key={item.id}
                                    onClick={() => handlechangeVer(index)}
                                  >
                                    {item.version_Name}
                                  </div>
                                );
                              })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className='grid-item-3'>3 </div> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;
