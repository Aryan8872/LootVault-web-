import { useState } from "react";
import { addGame } from "../../services/api";

const AddProduct = () => {
    const [gameName, setProductName] = useState("");
    const [gamePrice, setProductPrice] = useState("");
    const [gameDescription, setProductDescription] = useState("");
    const [image, setImage] = useState(null);
    const [gamePlatform, setGamePlatform] = useState("");
    const [gameType, setGameType] = useState("");


    const [productCategory, setProductCategory] = useState(""); // Assuming you have categories

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData for file upload and form data
        const formData = new FormData();
        formData.append("gameName", gameName);
        formData.append("gamePrice", gamePrice);
        formData.append("gameDescription", gameDescription);
        formData.append("image", image);
        formData.append("gamePlatform", gamePlatform);
        formData.append("gameType", gameType);

        console.log(formData.values)
        


        try {
            // Call the addProduct API to save the product
            await addGame(formData);
            alert("Product added successfully!");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={gameName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Product Price"
                value={gamePrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Product Description"
                value={gameDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />

            <input
                type="text"
                placeholder="platform"
                value={gamePlatform}
                onChange={(e) => setGamePlatform(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="type"
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                required
            />

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
