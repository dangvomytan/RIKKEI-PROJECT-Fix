import React from "react";


const FeaturedComponent: React.FC = () => {
  return (
    <section className="bg_color">
      <div className="max-w-5xl m-auto py-7 ">
        <div className="grid grid-cols-[1.1fr,0.9fr] gap-40">
          <div className="Column-left t_color">
            <div>
              <h1 className="text-2xl font-bold py-3">
                MacBook Pro 14 inch M2 Pro 2023
              </h1>
              <p className="text-sm">
                Macbook Pro 14 inch M2 Pro 2023 là chiếc laptop của thương hiệu Apple, mang lại cho người dùng sự sang trọng và thanh lịch. Sở hữu cho mình bộ vi xử lý chip Macbook Pro 2023 giúp tăng hiệu suất xử lý đa tác vụ và độ họa một cách mượt mà nhất.
              </p>
              <div className="flex justify-start gap-5 mt-5">
                <button className="border 1 border-cyan-700 rounded-lg py-2 px-4">Read more</button>
                <button className="flex border 1 border-cyan-700 rounded-lg py-2 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  Add to cart</button>
              </div>
            </div>
          </div>
          <div className="Column-right">
            <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}
export default FeaturedComponent