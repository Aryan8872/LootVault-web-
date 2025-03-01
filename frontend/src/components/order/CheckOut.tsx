import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Checkout = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
    });
    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleCheckout = (e) => {
        e.preventDefault();
        console.log('Order placed:', formData, product);
        setOrderSuccess(true);
        setTimeout(() => {
            onClose();
            setOrderSuccess(false);
        }, 2000);
    };

    // 📄 Generate PDF
    const generatePDF = async () => {
   
    
        const pdf = new jsPDF();
        
        // Title
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.text('Order Confirmation', 70, 20);
    
        // Border Box
        pdf.setDrawColor(0);
        pdf.setLineWidth(0.5);
        pdf.rect(10, 30, 190, 140);
    
        // Image Path
        const imageUrl = `http://localhost:3000/public/uploads/${product.gameImagePath || product.skinImagePath}`;
    
        try {
            // Convert image to Base64
            const imgData = await fetchImageAsBase64(imageUrl);
    
            // Add image if successfully converted
            if (imgData) {
                pdf.addImage(imgData, 'JPEG', 75, 40, 60, 60);
            } else {
                console.error("Failed to load image for PDF.");
            }
    
            // Order Details
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Customer Name: ${formData.name}`, 20, 110);
            pdf.text(`Email: ${formData.email}`, 20, 120);
            pdf.text(`Address: ${formData.address}`, 20, 130);
            pdf.text(`${product.gameName? 'Game':'Skin'}: ${product.gameName||product.skinName}`, 20, 140);
            pdf.text(`Price: $${product.gamePrice || product.skinPrice}.00`, 20, 150);
    
            // Save PDF
            pdf.save(`Order_${product.gameName}.pdf`);
        } catch (error) {
            console.error("Error capturing image:", error);
        }
    };
    
    // Function to fetch image as Base64
    const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
    
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return null;
        }
    };
    
    
    
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>

                {orderSuccess ? (
                    <div className="text-center text-green-600 font-semibold">
                        ✅ Order placed successfully!
                    </div>
                ) : (
                    <form onSubmit={handleCheckout}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
                        >
                            Confirm Order
                        </button>
                    </form>
                )}

                {/* Download PDF Button */}
                {orderSuccess && (
                    <button
                        onClick={generatePDF}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded w-full mt-4"
                    >
                        Download PDF
                    </button>
                )}

                <button onClick={onClose} className="text-red-500 mt-4 w-full text-center">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Checkout;
