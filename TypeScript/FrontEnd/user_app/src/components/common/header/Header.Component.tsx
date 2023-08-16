import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.Component.css";

const HeaderComponent: React.FC = () => {
  const [userMenu, setUserMenu] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [userToggle, setUserToggle] = useState(false);
  return (
    <>
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="header-logo text-2xl font-semibold">
            <Link to="/">
              TanDang<span className="text-blue-500">Store</span>
            </Link>
          </div>
          <div className="header-nav md:flex space-x-4 hidden">
            <Link to="/" className="hover:text-blue-500">
              Trang chủ
            </Link>
            <Link to="/" className="hover:text-blue-500">
              Thông tin
            </Link>
            <Link to="/" className="hover:text-blue-500">
              Bảo hành
            </Link>
            <Link to="/user/pages/shop.html" className="hover:text-blue-500">
              Cửa hàng
            </Link>
            <Link to="/" className="hover:text-blue-500">
              Liên hệ
            </Link>
          </div >
          <div className="header-icons md:ml-4 space-x-4">
            <div
              className="menu-icon  align-middle    text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => setMenuToggle(!menuToggle)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </div>
            <a
              href="./user/pages/search.html"
              className="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-9 h-9"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </a>
            <div className="user-icon  flex   align-middle text-blue-500 hover:text-blue-700 cursor-pointer">
              <div className="px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-9 h-9"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              {/* <div className="px-1">
                <span>(1)</span>
              </div> */}
            </div>
            <div
              className="user-icon  flex   align-middle text-blue-500 hover:text-blue-700 cursor-pointer"
              onClick={() => {setUserToggle(!userToggle);setUserMenu(!userMenu)}}
            >
              <div className="px-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-9 h-9  m-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              {/* <div className="px-1">
                <span>Tan Dang</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className={`md:hidden ${menuToggle ? "block" : "hidden"}`}>
          {/* Mobile Menu Content */}
        </div>
        <div className={`md:hidden ${userToggle ? "block" : "hidden"}`}>
          asdas
          {/* Mobile User Menu Content */}
        </div>
      </header>
      <div className={`${userMenu ? "block" : "hidden"}`}>
      <div className="border 1 border-black flex flex-col py-1  w-40 bor rounded absolute top-16  right-5 bg-slate-100 ">
                <a className="hover:bg-blue-200 px-3 rounded"
                  href="/login"
                >
                  Login
                </a>
                <a className="hover:bg-blue-200 px-3 rounded"
                  href="/register"
                >
                  Register
                </a>
                <div className="hover:bg-blue-200 px-3 rounded"
                  
                >
                  Logout
                </div>
          </div>
      </div>

    </>
  );
};

export default HeaderComponent;
