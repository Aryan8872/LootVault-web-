/* eslint-disable no-useless-catch */
// src/services/apiService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust this URL to your backend

const apiService = axios.create({
    baseURL: API_URL,
});

export const addProduct = async (productData: any) => {
    try {
        const response = await apiService.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editProduct = async (productId: string, productData: any) => {
    try {
        const response = await apiService.put(`/products/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        const response = await apiService.delete(`/game/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findAllSkins = async () => {
    try {
        const response = await apiService.get('/game/');
        return response.data;
    } catch (error) {
        throw error;
    }
};