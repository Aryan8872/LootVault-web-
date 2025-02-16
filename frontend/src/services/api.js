"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSortedGames = exports.deleteProduct = exports.addGame = exports.getGameById = exports.getGames = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = "http://localhost:3000/api";
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${API_BASE_URL}/game`);
    return response.data;
});
exports.getGames = getGames;
const getGameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${API_BASE_URL}/game/${id}`);
    return response.data;
});
exports.getGameById = getGameById;
const addGame = (formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(`${API_BASE_URL}/game/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        console.log("Product added:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error adding product:", error);
        throw error; // Rethrow the error so it can be caught in the component
    }
});
exports.addGame = addGame;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.delete(`${API_BASE_URL}/game/${id}`);
});
exports.deleteProduct = deleteProduct;
const fetchSortedGames = (sortBy, order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = { sortBy, order }; // Only include sortBy and order
        const response = yield axios_1.default.get(`${API_BASE_URL}/game/sorted`, { params });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching sorted games:", error);
        throw error;
    }
});
exports.fetchSortedGames = fetchSortedGames;
