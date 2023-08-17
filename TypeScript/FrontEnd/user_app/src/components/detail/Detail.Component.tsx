import React from 'react'

const DetailComponent:React.FC = () => {
  return (
    <div className="bg-slate-200">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {/* <h2 className="sr-only">Products</h2> */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    <div className='col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 rounded-lg '>
      <div className='detail_image'>
        <img src="https://dji-vietnam.vn/wp-content/uploads/2023/04/Flycam-DJI-Mavic-3-Pro-Cine-13-premium-combo.jpg" alt="" className="w-full h-full rounded-lg  object-cover object-center" />
      </div>
    </div>
    <div className='col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-2'>
      <div className='detail_header'>
        <h3 className="font-bold text-2xl">sfsd</h3>
      </div>
      <div className='detail_body'>
        <div className='detail_brand'><b>Thương hiệu:</b> DJI</div>
        <div className='detail_brand'><b>Ver:</b></div>
        <div className='detail_dev'> "Thông tin đang được cập nhật"</div>
        <div className='detail_price text-2xl text-red-500 font-bold my-2'> VND</div>
        <div className='detail_quantity'>
          <div className='detail_qty_box flex items-center text-center gap-2'>
              <div className='btn_qty text-2xl py-1 px-4 border-2 border-gray-400 hover:border-blue-500  text-black  rounded-md' >+</div>
              <div className='btn_qty text-2xl py-1 px-8 border-2 border-gray-400 bg-white rounded-md'>0</div>
              <div className='btn_qty text-2xl py-1 px-4 border-2 border-gray-400 hover:border-blue-500  text-black  rounded-md' >-</div>
          </div>
        </div>
        <div className='detail_sub flex gap-4 my-2'>
          <button className='btn_submit text-2xl py-2 px-8 border-2 border-blue-400 bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-md '>Thêm vào giỏ hàng</button>
          <button className='btn_submit text-2xl py-2 px-8 border-2  border-blue-400 bg-blue-400  hover:bg-blue-500 text-white rounded-md ' >Giỏ hàng</button>
        </div>
        <div>
          <div><b>Lựa chọn phiên bản:</b></div>
          <div className='ver_box flex gap-1 my-2'>
   
                <div className='btn_ver py-1 px-4 border-2  rounded-md   border-gray-400 bg-white hover:border-blue-500  text-black'>fdgf</div>
    
          </div>
        </div>
      </div>
    </div>
    {/* <div className='grid-item-3'>3 </div> */}
  </div>
    </div>
  </div>
    )
}

export default DetailComponent