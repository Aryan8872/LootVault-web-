import React, { useEffect, useState } from "react";
import { getGames } from "../../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getGames();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <h2>{product.name}</h2>
                        {product.imagePath && (
                            <img
                                src={`http://localhost:3000${product.imagePath}`}
                                alt={product.name}
                                style={{ width: "100px", height: "100px" }} // Adjust image size as needed
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
