import React from 'react'



const FooterComponent:React.FC = () => {
  return (
    <div>
<footer className="bg-gray-900 text-white">
      {/* <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="footer-links space-y-2 md:space-y-0 md:flex md:space-x-6">
          <a href="/" className="hover:text-blue-500">
            Trang chủ
          </a>
          <a href="/" className="hover:text-blue-500">
            Thông tin
          </a>
          <a href="/" className="hover:text-blue-500">
            Bảo hành
          </a>
          <a href="/user/pages/shop.html" className="hover:text-blue-500">
            Cửa hàng
          </a>
          <a href="/" className="hover:text-blue-500">
            Liên hệ
          </a>
        </div>
        <div className="footer-social mt-4 md:mt-0">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div> */}
      <div className="bg-gray-800 py-2 text-center ">
        <p className="text-gray-500">&copy; 2023 TanDangStore. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  )
}

export default FooterComponent