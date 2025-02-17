import { PaypalLogo } from '@phosphor-icons/react';

const OrderConfirmation = ({ orderId, date, paymentMethod, billingDetails, totalPaid, fee }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col gap-7 items-center">
                <div className='items-center justify-center flex flex-col'>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Thank you for order</h1>
                    <p className="text-gray-600 text-center text-sm sm:text-base max-w-md">
                        Some information will be written here, bla bla lorem ipsum you enter into any new area of science, you almost always find yourself
                    </p>
                </div>

                <div className="flex justify-center w-full overflow-x-auto pb-2">
                    <div className="flex items-center min-w-fit">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">1</div>
                            <span className="text-xs sm:text-sm mt-2 whitespace-nowrap">Order received</span>
                        </div>
                        <div className="w-12 sm:w-16 h-1 bg-gray-200 mx-2">
                            <div className="w-1/2 h-full bg-green-500"></div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">2</div>
                            <span className="text-xs sm:text-sm mt-2 whitespace-nowrap">Confirmation</span>
                        </div>
                        <div className="w-12 sm:w-16 h-1 bg-gray-200 mx-2"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">3</div>
                            <span className="text-xs sm:text-sm mt-2 whitespace-nowrap">Out for delivery</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-gray-50 p-4 sm:p-6 rounded-lg">
                <div className="flex flex-col justify-between items-start">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-4">Receipt</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <PaypalLogo className="w-6 h-6 text-blue-600" />
                            <div>
                                <p className="text-sm">{date}</p>
                                <p className="text-sm text-gray-600">Order ID: #{orderId}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 space-y-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Method:</span>
                        <span>{paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Billed to:</span>
                        <span className="text-right">{billingDetails}</span>
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
                <div className='mt-4'>
                    <button className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                        Download invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

const ShoppingCart = ({ items, discount, tax }) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - discount + tax;

    return (
        <div className="flex flex-col lg:flex-row gap-5 max-w-6xl mx-auto">
            <div className='flex-1 bg-white rounded-lg px-4 sm:px-9 py-6'>
                <h1 className="text-xl sm:text-2xl font-semibold mb-6">Shopping Cart</h1>

                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-9 pb-6 border-b">
                            <div className="flex gap-4 w-full sm:w-auto">
                                <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">{item.specs}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">{item.details}</p>
                                </div>
                            </div>

                            <div className="flex flex-row sm:items-center gap-4 sm:gap-9 w-full sm:w-auto justify-between sm:justify-end">
                                <select
                                    value={item.quantity}
                                    className="px-2 sm:px-3 py-1 sm:py-2 border rounded-md text-sm"
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>

                                <div className="text-right min-w-[100px] sm:min-w-[120px]">
                                    <p className="font-semibold text-sm sm:text-base">${item.price.toFixed(2)}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">${(item.price / item.quantity).toFixed(2)} / per item</p>
                                </div>

                                <div className="flex gap-2 sm:gap-4">
                                    <button className="text-blue-600 hover:text-blue-700">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    <button className="text-red-600 border-black border-[0.2px] px-2 py-1 text-sm rounded hover:text-red-700">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full lg:w-80">
                <div className="bg-white rounded-lg p-4 sm:p-6">
                    <div className="space-y-3 text-sm sm:text-base">
                        <div className="flex justify-between">
                            <span>Total price:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>Discount:</span>
                            <span>- ${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Tax:</span>
                            <span>+ ${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base sm:text-lg pt-3 border-t">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base">
                            Checkout
                        </button>
                        <button className="w-full py-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                            Back to shop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... Rest of the code remains the same ...
export default function EcommerceUI() {
    const sampleItems = [
        {
            name: "Apple iPhone 12 Pro 6.1",
            specs: "RAM 6GB Unlocked",
            details: "Color: Black, Memory: 512GB",
            price: 1460.00,
            quantity: 3,
            image: "https://fatafatsewa.com/storage/media/3637/iPhone-12-2021-update.png"
        },
        {
            name: "Xiaomi Redmi 8 Original",
            specs: "Global Version 4GB",
            details: "Small size, Black",
            price: 399.50,
            quantity: 1,
            image: "https://www.nepal.ubuy.com/productimg/?image=aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9JLzYxTmoyekpUaVlMLl9TUzQwMF8uanBn.jpg"
        },
        {
            name: "Sport Smart Watch Bracelet",
            specs: "Small size, Black",
            details: "",
            price: 75.80,
            quantity: 2,
            image: "https://thewatchlounge.co/wp-content/uploads/2024/11/2-37-300x300.jpg"
        }
    ];

    return (
        <div className="space-y-8 p-4">
            <OrderConfirmation
                orderId="23009"
                date="Wed, Sept 20, 2021"
                paymentMethod="Visa ---9912"
                billingDetails="Ahmed Khasan, Russia, Moscow Stret A2"
                totalPaid={235.00}
                fee={3.00}
            />

            <ShoppingCart
                items={sampleItems}
                discount={60.00}
                tax={14.00}
            />
        </div>
    );
}