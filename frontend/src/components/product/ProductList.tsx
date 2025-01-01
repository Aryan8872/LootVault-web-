import { useEffect, useState } from "react";
import { fetchSortedGames } from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");
  const [categoryId, setCategoryId] = useState(null); // Optional category filter
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchSortedGames(sortBy, order, categoryId);
        if (Array.isArray(data)) {
          setProducts(data);
          setError(null);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, [sortBy, order, categoryId]); // Re-fetch on sorting or filtering changes

  return (
    <div>
      <h1>Product List</h1>

      {/* Sorting Options */}
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
          <option value="name">Name</option>
          <option value="createdAt">Date Added</option>
        </select>

        <label style={{ marginLeft: "20px" }}>Order:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>


      {/* Optional Category Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label>Category:</label>
        <input
          type="text"
          placeholder="Enter category ID"
          value={categoryId || ""}
          onChange={(e) => setCategoryId(e.target.value || null)}
        />
      </div>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Product List */}
      <ul>
        {products.map((product) => (
          <li key={product._id || product.id} style={{ marginBottom: "20px" }}>
            <h2>{product.name || "Unnamed Product"}</h2>
            {product.imagePath ? (
              <img
                src={`http://localhost:3000${product.imagePath}`}
                alt={product.name || "Product Image"}
                style={{ width: "100px", height: "100px" }}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>Price: ${product.price || "N/A"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
