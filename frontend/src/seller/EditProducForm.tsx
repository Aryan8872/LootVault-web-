// src/components/EditProductForm.tsx
import React, { useState, useEffect } from 'react';
import { editProduct } from './ApiService';

const EditProductForm = ({ product, onSave, onCancel }) => {
  const [productData, setProductData] = useState({
    skinName: '',
    skinPrice: '',
    skinDescription: '',
    skinImagePath: '',
    category: '',
    skinPlatform: '',
  });

  useEffect(() => {
    setProductData(product);
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = await editProduct(product._id, productData);
      onSave(product._id, updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-4 mb-3">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Edit Product</h2>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          value={productData.skinName}
          onChange={(e) => setProductData({ ...productData, skinName: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Price:</label>
        <input
          type="number"
          value={productData.skinPrice}
          onChange={(e) => setProductData({ ...productData, skinPrice: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Description:</label>
        <textarea
          value={productData.skinDescription}
          onChange={(e) => setProductData({ ...productData, skinDescription: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Image Path:</label>
        <input
          type="text"
          value={productData.skinImagePath}
          onChange={(e) => setProductData({ ...productData, skinImagePath: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Category:</label>
        <input
          type="text"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">Platform:</label>
        <input
          type="text"
          value={productData.skinPlatform}
          onChange={(e) => setProductData({ ...productData, skinPlatform: e.target.value })}
          className="w-full bg-gray-800 text-gray-100 p-2 rounded-lg"
        />
      </div>
      <button type="submit" className="bg-cyan-500 text-white p-2 rounded-lg hover:bg-cyan-600">Save Changes</button>
      <button type="button" onClick={onCancel} className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Cancel</button>
    </form>
  );
};

export default EditProductForm;