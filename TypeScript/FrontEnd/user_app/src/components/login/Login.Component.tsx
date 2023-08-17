import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/user.Slice";
import { useNavigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await dispatch(login(formData) as any) || null;
    // console.log(">>>>",res.payload);
    if(res.payload.accessToken)
    {
      toast.success("Login successful")
      navigate("/")
    }
    else
    {
      if(res.payload.codeStatus===400)
      {
        toast.error("Email not found");
      }else
      if(res.payload.codeStatus===401)
      {
        toast.error("Password wrong");
      }else
      toast.error(res.payload.msg);
    }
  };

  return (
    <>
      {/* Toaster */}
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* Form  */}
      <form
        className="space-y-6"
        action="login"
        method="POST"
        onSubmit={handleSubmit}
      >
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
              required
              onChange={handleChange}
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
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
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
              required
              onChange={handleChange}
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

export default LoginComponent;
