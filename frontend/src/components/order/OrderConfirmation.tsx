
const OrderConfirmation = ({ orderId, date, paymentMethod, billingDetails, totalPaid, fee }) => {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Thank you for order</h1>
          <p className="text-gray-600 text-center max-w-md">
            Some information will be written here, bla bla lorem ipsum you enter into any new area of science, you almost always find yourself
          </p>
        </div>
  
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">1</div>
              <span className="text-sm mt-2">Order received</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2">
              <div className="w-1/2 h-full bg-green-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">2</div>
              <span className="text-sm mt-2">Confirmation</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">3</div>
              <span className="text-sm mt-2">Out for delivery</span>
            </div>
          </div>
        </div>
  
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-4">Receipt</h2>
              <div className="flex items-center gap-2 mb-2">
                <PayPalIcon className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm">{date}</p>
                  <p className="text-sm text-gray-600">Order ID: #{orderId}</p>
                </div>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              Download invoice
            </button>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Method:</span>
              <span>{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Billed to:</span>
              <span>{billingDetails}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fee:</span>
              <span>${fee}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Paid</span>
              <span>${totalPaid}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };