import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProduct, Product, ProductApi } from "../../models/product.Model";
import { cartItemApi } from "../../models/cartItem.Model";
import { Toaster, toast } from "react-hot-toast";
import { IUser } from "../../models/user.Model";

const DetailComponent: React.FC = () => {
    const [dataApi, setDataApi] = useState<IProduct>({});
    const [changeVer, setChangeVer] = useState<Product>();
    const [quantity, setquantity] = useState(1);

    //dùng Uselocation để lấy id từ url
    const location = useLocation();
    const { search } = queryString.parse(location.search);
    const id = search || null;

    //handle lấy API product
    const handleCallData = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const DataApi: any = await ProductApi.getAllInfoProductById(Number(id)) || null;
        // console.log(111, DataApi);
        setDataApi(DataApi.is_Delete === 0 ? DataApi : null);
        setChangeVer(DataApi.is_Delete === 0 ? DataApi : null)
    };
    useEffect(() => {
        handleCallData();
    }, [] || id);
    // tang qty
    const handleIncrease = () => {
        if (quantity >= 0) {
            const newQuantity = Number(quantity) + 1;
            setquantity(newQuantity);
        }
    };

    // giam qty
    const handleReduce = () => {
        if (quantity > 1) {
            const newQuantity = Number(quantity) - 1;
            setquantity(newQuantity);
        }
    }

    //
    const clickChangeVer = (ver: Product) => {
        setChangeVer(ver);
    }

    const clickAddToCart = async (product: any) => {
        const userLogin: IUser | null = JSON.parse(localStorage.getItem('userLogin') || 'null');
        if (userLogin !== null) {
            const cart_Id = userLogin.tbl_cart.id;
            const item = {
                cart_Id: Number(cart_Id),
                product_Id: product.product_Id,
                version_Id: product.id,
                quantity: quantity
            }
            try {
                await cartItemApi.addToCart(item)
                const notify = () => toast.success("Add to cart successfully");
                notify();
            }
            catch (error: any) {
                console.log(error.message);
                const notify = () => toast.error(error.message);
                notify();
            }

        }
        else {
            const notify = () => toast.error("Please login first");
            notify();
        }

    }

    return (
        <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
            <div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>
            <div className="max-w-5xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 z-0 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                <img src={changeVer?.image} alt=""
                                    className="object-cover w-full lg:h-full " />
                            </div>
                            <div className="flex-wrap hidden md:flex ">
                                {/* <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#" className="block border border-orange-300 hover:border-orange-300">
                                        <img src="https://i.postimg.cc/6qcPhTQg/R-18.png" alt=""
                                            className="object-cover w-full lg:h-20"/>
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#" className="block border border-transparent hover:border-orange-300">
                                        <img src="https://i.postimg.cc/6qcPhTQg/R-18.png" alt=""
                                            className="object-cover w-full lg:h-20"/>
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#" className="block border border-transparent hover:border-orange-300">
                                        <img src="https://i.postimg.cc/6qcPhTQg/R-18.png" alt=""
                                            className="object-cover w-full lg:h-20"/>
                                    </a>
                                </div>
                                <div className="w-1/2 p-2 sm:w-1/4">
                                    <a href="#" className="block border border-transparent hover:border-orange-300">
                                        <img src="https://i.postimg.cc/6qcPhTQg/R-18.png" alt=""
                                            className="object-cover w-full lg:h-20"/>
                                    </a>
                                </div> */}
                            </div>
                            <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                                <div className="flex flex-wrap items-center mt-6">
                                    <span className="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                            </path>
                                        </svg>
                                    </span>
                                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">Free Shipping</h2>
                                </div>
                                <div className="mt-2 px-7">
                                    <a className="text-sm text-orange-400 dark:text-orange-200" href="#">Get delivery dates</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 ">
                        <div className="lg:pl-20">
                            <div className="mb-8 ">

                                <h3 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                    {dataApi != null ? dataApi.product?.product_Name : null} {changeVer?.version_Name}
                                </h3>
                                <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                                    <span>${changeVer?.price}</span>
                                    {/* <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">$1800.99</span> */}
                                </p>
                                <p className="max-w-md text-gray-700 dark:text-gray-400">
                                    {/* {dataApi.description} */}
                                </p>
                            </div>
                            {/* <div className="mb-8">
                                <h2
                                    className="w-16 pb-1 mb-4 text-2xl font-bold border-b border-orange-300 dark:text-gray-400 dark:border-gray-600">
                                    Colors</h2>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    <button className="p-1 mb-2 mr-3 ">
                                        <div className="w-6 h-6 rounded-full bg-stone-400"></div>
                                    </button>
                                    <button className="p-1 mb-2 mr-3 ">
                                        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                                    </button>
                                    <button className="p-1 mb-2 ">
                                        <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
                                    </button>
                                </div>
                            </div>  */}
                            <div className="mb-8 ">
                                <h4 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-orange-300 dark:border-gray-600 dark:text-gray-400">
                                    Ver:</h4>
                                <div>
                                    <div className="flex flex-wrap -mb-2">
                                        {dataApi != null && dataApi.product?.tbl_versions ?
                                            dataApi.product.tbl_versions.map((ver) => (
                                                <button key={ver.id}
                                                    onClick={() => clickChangeVer(ver)}
                                                    className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-orange-400 dark:border-gray-400 hover:text-orange-600 dark:hover:border-gray-300 dark:text-gray-400">
                                                    {ver.version_Name}
                                                </button>
                                            ))
                                            : null}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="mb-8">
                            <h2
                                className="w-16 pb-1 mb-6 text-xl font-semibold border-b border-orange-300 dark:border-gray-600 dark:text-gray-400">
                                Storage</h2>
                            <div>
                                <div className="flex flex-wrap -mx-2 -mb-2">
                                    <button
                                        className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-orange-400 dark:border-gray-400 hover:text-orange-600 dark:hover:border-gray-300 dark:text-gray-400">
                                        256 GB
                                    </button>
                                    <button
                                        className="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-orange-400 hover:text-orange-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                                        112 GB
                                    </button>
                                    <button
                                        className="px-4 py-2 mb-2 mr-2 font-semibold border rounded-md hover:border-orange-400 hover:text-orange-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                                        1 TB
                                    </button>
                                </div>
                            </div>
                        </div>  */}
                            <div className="w-32 mb-8 ">
                                <label
                                    className="w-full pb-1 text-xl font-semibold text-gray-700 border-b border-orange-300 dark:border-gray-600 dark:text-gray-400">Quantity</label>
                                <div className="relative flex flex-row w-full h-10 mt-6 bg-transparent rounded-lg">
                                    <button
                                        onClick={() => handleReduce()}
                                        className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                        <span className="m-auto text-2xl font-thin">-</span>
                                    </button>
                                    <input type="number" readOnly
                                        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                        value={quantity}
                                    />
                                    <button
                                        onClick={() => handleIncrease()}
                                        className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                        <span className="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <button
                                    onClick={() => clickAddToCart(changeVer)}
                                    className="w-full p-4 bg-orange-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-700">
                                    Add to cart</button>
                                <button
                                    className="flex items-center justify-center w-full p-4 text-orange-500 border border-orange-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-orange-600 hover:bg-orange-600 hover:border-orange-600 hover:text-gray-100 dark:bg-orange-500 dark:hover:bg-orange-700 dark:hover:border-orange-700 dark:hover:text-gray-300">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailComponent;
