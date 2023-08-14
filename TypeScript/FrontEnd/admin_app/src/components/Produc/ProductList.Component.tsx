import React, { Fragment, useRef, useEffect, useState } from "react";
import { IProduct, ProductApi } from "../../models/product.Model";
import { Dialog, Transition } from "@headlessui/react";
import { Toaster, toast } from "react-hot-toast";
import { CategoryApi, ICategory } from "../../models/category.Model";
import { useNavigate } from "react-router-dom";

const ProductListComponent: React.FC = () => {
  const [productApi, setProductApi] = useState<IProduct[]>([]);
  const [categoryApi, setCategoryApi] = useState<ICategory[]>([]);
  const [formData, setFormData] = useState({
    category_Id: 0,
    product_Name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [actionType, setActionType] = useState<
    "CREATE" | "UPDATE" | "DELETE"
  >();
  const navigate = useNavigate()

  // ham xu li goi du lieu productApi
  const handleCallDataProductApi = async () => {
    const res = await ProductApi.getAll();
    setProductApi(res.filter((item) => item.is_Delete === 0));
  };

  //Goi API product
  useEffect(() => {
    handleCallDataProductApi();
  }, []);

  //Goi API category
  useEffect(() => {
    const handleCallDataCategoryApi = async () => {
      const res = await CategoryApi.getAll();
      setCategoryApi(res.filter((item) => item.is_Delete === 0));
    };
    handleCallDataCategoryApi();
  }, []);

  // handle xu ly lay du lieu tu from
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle xu ly phan chia hanh dong
  const handleAction = (
    action: "CREATE" | "UPDATE" | "DELETE",
    product?: IProduct
  ) => {
    setActionType(action);
    const newFormData: IProduct = product
      ? {
          ...product
        }
      : {
          category_Id: 0,
          product_Name: "",
          description: "",
          is_Delete: 0,
        };
    setFormData(newFormData);
    setOpen(true);
  };

  //handle xu li submit Them/sua/xoa
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (actionType === "DELETE") {
      try {
        await ProductApi.isdelete(formData);
        toast.success("Delete successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(error);
      }
    } else if (actionType === "CREATE") {
      try {
        await ProductApi.create(formData);
        toast.success("Create successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(error);
      }
    } else {
      try {
        await ProductApi.update(formData);
        toast.success("Update successfully");
        handleCallDataProductApi();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error(error);
      }
    }
    setOpen(false);
  };

      //  Xem ver
       function clickVer(id:number|undefined):void {
        navigate(`/version?pro=${id}`)
   }

  return (
    <div>
      {/* Toaster */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Modals */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-11"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form action="/product" method="POST" onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {actionType === "CREATE"
                            ? "CREATE"
                            : actionType === "UPDATE"
                            ? "UPDATE"
                            : "DELETE"}
                        </Dialog.Title>
                      </div>
                      {actionType === "DELETE" ? (
                        <>
                          <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate this product?
                              This action cannot be undone.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-full max-w-full px-3 shrink-0  md:flex-0">
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Category
                              </label>
                              <select
                                name="category_Id"
                                value={formData.category_Id}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              >
                                <option value="">Select ... </option>
                                {categoryApi.length > 0 &&
                                  categoryApi.map((item) => {
                                    return (
                                      <option key={item.id} value={item.id}>
                                        {item.category_Name}
                                      </option>
                                    );
                                  })}
                              </select>
                            </div>
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Product name
                              </label>
                              <input
                                type="text"
                                name="product_Name"
                                value={formData.product_Name}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Description
                              </label>
                              <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 m-1 text-sm font-semibold text-white  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:mt-0 sm:w-auto"
                        ref={cancelButtonRef}
                      >
                        {actionType === "CREATE"
                          ? "CREATE"
                          : actionType === "UPDATE"
                          ? "UPDATE"
                          : "DELETE"}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 m-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6 className="dark:text-white">Product</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center justify-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      #
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Product name
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Date of creation
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Description
                    </th>

                    <th className="px-6 py-3 font-semibold capitalize align-middle text-right bg-transparent border-b border-solid shadow-none dark:border-white/40 dark:text-white tracking-none whitespace-nowrap">
                      <button
                        className="inline-block px-2 py-1 m-1 font-bold text-center uppercase align-middle transition-all bg-transparent border-1 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400 hover:text-blue-700"
                        onClick={() => handleAction("CREATE")}
                      >
                        <button>Create</button>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-t">
                  {productApi.length > 0 &&
                    productApi.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {index + 1}
                            </p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {item.product_Name}
                            </p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {item.createdAt}
                            </p>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              {item.description}
                            </span>
                          </td>
                          <td className="p-2 align-middle text-right bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <button
                              className="inline-block px-2 py-1 m-1 font-bold text-center uppercase align-middle transition-all bg-transparent border-1 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400 hover:text-blue-700"
                              onClick={() => clickVer(item.id)}
                            >
                              <button>Version</button>
                            </button>
                            <button
                              className="inline-block px-2 py-1 m-1 font-bold text-center uppercase align-middle transition-all bg-transparent border-1 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400 hover:text-blue-700"
                              onClick={() => handleAction("UPDATE", item)}
                            >
                              <button>Edit</button>
                            </button>
                            <button
                              className="inline-block px-2 py-1 m-1 font-bold text-center uppercase align-middle transition-all bg-transparent border-1 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25 text-slate-400 hover:text-blue-700"
                              onClick={() => handleAction("DELETE", item)}
                            >
                              <button>Delete</button>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {productApi.length == 0 && (
                    <tr>
                      <td colSpan={8}>No data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListComponent;
