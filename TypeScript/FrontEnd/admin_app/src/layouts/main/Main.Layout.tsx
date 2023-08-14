import React from "react";
import { Outlet } from "react-router-dom";

import "../../assets/css/argon-dashboard-tailwind.css";
import "../../assets/css/argon-dashboard-tailwind.min.css";
import "../../assets/css/nucleo-icons.css";
import "../../assets/css/nucleo-svg.css";
import "../../assets/css/perfect-scrollbar.css";
import "../../assets/css/tooltips.css";

import MenuComponent from "../../components/common/Mennu/Menu.Component";
import HeaderComponent from "../../components/common/Header/Header.Component";

const MainLayout: React.FC = () => {
  return (
    <>
      <body className="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
        <div className="absolute w-full bg-slate-400 dark:hidden min-h-75"></div>
        <MenuComponent />
        <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
          <HeaderComponent />

          {/* <!-- cards --> */}
          <div className="w-full px-6 py-6 mx-auto">
            <Outlet />
          </div>
          {/* <!-- end cards --> */}
        </main>
      </body>
    </>
  );
};

export default MainLayout;
