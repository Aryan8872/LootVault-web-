import axios from 'axios';
const API_BASE_URL = "http://localhost:3000/api";

export const getGames = async () => {
    const response = await axios.get(`${API_BASE_URL}/game`);
    return response.data;
};

export const getGameById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/game/${id}`);
    return response.data;
};


export const addGame = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/game/add`, formData, {
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
    await axios.delete(`${API_BASE_URL}/game/${id}`);
};
