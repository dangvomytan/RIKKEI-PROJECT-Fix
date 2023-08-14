import React, { Fragment, useRef, useEffect, useState } from "react";
import { AdminApi, IAdmin } from "../../models/admin.Model";
import { Dialog, Transition } from "@headlessui/react";
import { Toaster, toast } from "react-hot-toast";

const AdminListComponent: React.FC = () => {
  const [adminApi, setAdminApi] = useState<IAdmin[]>([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [actionType, setActionType] = useState<
    "CREATE" | "UPDATE" | "DELETE"
  >();
  const [formData, setFormData] = useState<IAdmin>({
    id: 0,
    full_Name: "",
    user_Name: "",
    password: "",
    role: 0,
  });

  const handleCallDataAdminApi = async () => {
    try {
      const res = await AdminApi.getAll();
      setAdminApi(res.filter((item) => item.is_Delete === 0));
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    handleCallDataAdminApi();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAction = (
    action: "CREATE" | "UPDATE" | "DELETE",
    admin?: IAdmin
  ) => {
    setActionType(action);
    const newFormData: IAdmin = admin ? {...admin} : {...formData};
    setFormData(newFormData);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (actionType === "DELETE") {
        await AdminApi.isdelete(formData);
        toast.success("Delete successfully");
      } else if (actionType === "CREATE") {
        await AdminApi.create(formData);
        toast.success("Create successfully");
      } else {
        await AdminApi.update(formData);
        toast.success("Update successfully");
      }
      handleCallDataAdminApi();
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred");
      console.error("API Error:", error);
    }
  };
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
                                Full name
                              </label>
                              <input
                                type="text"
                                name="full_Name"
                                value={formData.full_Name}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                User name
                              </label>
                              <input
                                type="text"
                                name="user_Name"
                                value={formData.user_Name}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            {actionType === "CREATE" ? (
                              <div className="mb-4">
                                <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                  Password
                                </label>
                                <input
                                  type="password"
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="mb-4">
                              <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">
                                Category
                              </label>
                              <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                              >
                                <option value="">Select ... </option>
                                <option value="1">Admin</option>
                                <option value="2">User</option>
                                <option value="3">Manager</option>
                                <option value="4">Staff</option>
                              </select>
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
            <h6 className="dark:text-white">Admin</h6>
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
                      Name
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      User name
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Relo
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Status
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
                  {adminApi.length > 0 &&
                    adminApi.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {index + 1}
                            </p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {item.full_Name}
                            </p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <p className="mb-0 text-sm font-semibold leading-normal dark:text-white dark:opacity-60">
                              {item.user_Name}
                            </p>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                              {item.role}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                            <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-60"></span>
                          </td>
                          <td className="p-2 align-middle text-right bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
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
                  {adminApi.length == 0 && (
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

export default AdminListComponent;
