import React, { useEffect, useState } from "react";
// import "./Header.Component.css";



const HeaderComponent: React.FC = () => {
  
  return (
    <header className="grid sticky  place-items-center w-screen top-0 z-50">
      <div className="min-w-full  bg_color"> {/*border 1 border-collapse border-blue-400 */}
        <div className=" max-w-6xl mx-auto px-6 py-0 bg_color rounded-sm ">
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="Logo text-3xl t_color">TD-Store</h1>
            </div>
            <div className="flex p-3">
              <ul className="flex gap-14 items-center  uppercase t_color ">
                <li><a href="/">
                   Home
                </a>
                 </li>
                <li><a href="/product">
                  Shop
                </a>
                  </li>
                <li>About</li>
                <li>Contact</li>
              </ul>
              <div className=" flex gap-5 justify-around ml-14 t_color">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  <div className="absolute top-4  left-7 z-40 text-xs text-red-500">
                    (0)
                  </div>
                </div>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute w-2 h-2 top-5 right-1 z-40 bg-green-500 rounded-full"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
function handleCallData() {
  throw new Error("Function not implemented.");
}

