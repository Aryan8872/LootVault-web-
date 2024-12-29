import React, { useState } from "react";
import { addProduct } from "../../services/api";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [image, setImage] = useState(null);
    const [productCategory, setProductCategory] = useState(""); // Assuming you have categories

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData for file upload and form data
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productDescription", productDescription);
        formData.append("image", image);

        try {
            // Call the addProduct API to save the product
            await addProduct(formData);
            alert("Product added successfully!");
        } catch (error) {
            alert("Error adding product: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Product Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
          
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
