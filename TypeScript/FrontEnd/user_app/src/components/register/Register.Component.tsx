import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { UserApi } from "../../models/user.Model";
import { useNavigate } from "react-router-dom";

const RegisterComponent: React.FC = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await UserApi.register(formData); 
        toast.success("Create successfully");
        navigate("/login");
      }
     catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <>
          {/* Toaster */}
          <Toaster position="bottom-right" reverseOrder={false} />
          {/* Form  */}
          <form className="space-y-6" action="resgiter" method="POST" onSubmit={handleSubmit}>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
        </div>
        <div className="mt-2">
          <input
            id="first_Name"
            name="first_Name"
            type="text"
            autoComplete="first_Name"
            onChange={handleChange}
            required
            className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div >
        <div className="flex items-center justify-between">
          <label
            htmlFor="last_Name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
        </div>
        <div className="mt-2">
          <input
            id="last_Name"
            name="last_Name"
            type="text"
            autoComplete="last_Name"
            onChange={handleChange}
            required
            className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
        </div>

        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            required
            className="block w-full p-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className=" block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            required
            className="block w-full  rounded-md border-0  p-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
    </>

  );
};

export default RegisterComponent;
