import React, { useState } from 'react';



const CheckoutComponent:React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentChange = (paymentMethod:any) => {
    setSelectedPayment(paymentMethod);
  };


  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-semibold mb-6">Your Order</h1>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2">Cart Items</h2>
                {/* Demo Cart Items */}
                <div className="flex space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                  <div>
                    <p className="font-semibold">Product Name</p>
                    <p className="text-gray-500">Product description</p>
                    <p className="font-bold">Price: 100,000 VND</p>
                  </div>
                </div>
                {/* End Demo Cart Items */}
              </div>
              {/* Total */}
              <div className="bg-gray-50 rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2">Total</h2>
                <p className="font-semibold">Subtotal: 100,000 VND</p>
                <p className="font-semibold">Shipping: 10,000 VND</p>
                <p className="font-bold">Total: 110,000 VND</p>
              </div>
            </div>
            {/* Right Column */}
            <div className="bg-gray-50 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
              {/* Demo Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-semibold">
                    Recipient's Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  {/* ... Other form fields */}
                </div>
                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                  <div className="flex space-x-4">
                    <button
                      className={`p-2 border rounded-md ${
                        selectedPayment === 'paypal' ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                      onClick={() => handlePaymentChange('paypal')}
                    >
                      PayPal
                    </button>
                    <button
                      className={`p-2 border rounded-md ${
                        selectedPayment === 'creditCard' ? 'bg-blue-500 text-white' : 'bg-white'
                      }`}
                      onClick={() => handlePaymentChange('creditCard')}
                    >
                      Credit Card
                    </button>
                  </div>
                </div>
                {/* End Payment Method */}
                {/* Submit Button */}
                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Proceed to Payment
                  </button>
                </div>
              </form>
              {/* End Demo Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutComponent