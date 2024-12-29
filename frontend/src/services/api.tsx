import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/api";

export const getProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
};


export const addProduct = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/products/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        console.log("Product added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error; // Rethrow the error so it can be caught in the component
    }
};


export const deleteProduct = async (id) => {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
};
