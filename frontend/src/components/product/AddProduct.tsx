import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";


const AddProduct = () => {
    const [gameName, setProductName] = useState("");
    const [gamePrice, setProductPrice] = useState("");
    const [gameDescription, setProductDescription] = useState("");
    const [image, setImage] = useState(null);
    const [gameType, setGameType] = useState("");

    const [gamePlatform, setGamePlatform] = useState([]);
    const [filteredGamePlatform, setFilteredGamePlatform] = useState([]);
    const [platformQuery, setPlatformQuery] = useState('')
    const [selectedGamePlatform, setSelectedGamePlatform] = useState(null);

    const [gameCategories, setGameCategories] = useState([]);
    const [selectedGameCategory, setSelectedGameCategory] = useState(null);
    const [filteredGameCategory, setFilteredGameCategory] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState('')



    useEffect(() => {
        getAllGameCategory();
        getAllGamePlatform()
    }, []);


    //category query
    useEffect(() => {
        if (categoryQuery === '') {
            setFilteredGameCategory(gameCategories);
        } else {
            const filtered = gameCategories.filter((category) =>
                category.categoryName.toLowerCase().includes(categoryQuery.toLowerCase())
            );
            setFilteredGameCategory(filtered);
        }
    }, [categoryQuery, gameCategories]);

    //platform query
    useEffect(() => {
        if (platformQuery === '') {
            setFilteredGamePlatform(gamePlatform);
        } else {
            const filtered = gamePlatform.filter((platform) =>
                platform.platformName.toLowerCase().includes(platformQuery.toLowerCase())
            );
            setFilteredGamePlatform(filtered);
        }
    }, [platformQuery, gamePlatform]);



    //category api call
    async function getAllGameCategory() {
        try {
            const response = await axios.get("http://localhost:3000/api/category/game");
            console.log(response.data);
            setGameCategories(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    //platform api call
    async function getAllGamePlatform() {
        try {
            const response = await axios.get("http://localhost:3000/api/platform/game");
            console.log(response.data);
            setGamePlatform(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("gameName", gameName);
        formData.append("gamePrice", gamePrice);
        formData.append("gameDescription", gameDescription);
        formData.append("image", image);
        formData.append("gamePlatform", selectedGamePlatform._id);
        formData.append("gameType", gameType);
        formData.append("category", selectedGameCategory._id);

        console.log(`name: ${gameName},price: ${gamePrice},description :${gameDescription},image: ${image}, category :${selectedGameCategory._id},type: ${gameType},platform :${selectedGamePlatform._id}`);

        try {
            await axios.post("http://localhost:3000/api/game/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding game:", error);
            alert("Failed to add product.");
        }
    };


    const renderCombobox = () => {
        console.log(selectedGameCategory)
        if (gameCategories.length === 0) return <p>Loading categories...</p>;

        return (
            <div className="mx-auto h-screen w-52 pt-20">
                <Combobox value={selectedGameCategory} onChange={(value) => setSelectedGameCategory(value)} onClose={() => setCategoryQuery('')}>
                    <div className="relative">
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none bg-black py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black'
                            )}
                            displayValue={(category) => category?.categoryName || ''}
                            onChange={(event) => setCategoryQuery(event.target.value)}
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        anchor="bottom"
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-black/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                    >
                        {filteredGameCategory.map((category) => (
                            <ComboboxOption
                                key={category._id}
                                value={category}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-black">{category.categoryName}</div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>

                <Combobox value={selectedGamePlatform} onChange={(value) => setSelectedGamePlatform(value)} onClose={() => setPlatformQuery('')}>
                    <div className="relative">
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg border-none bg-black py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black'
                            )}
                            displayValue={(platform) => platform?.platformName || ''}
                            onChange={(event) => setPlatformQuery(event.target.value)}
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        anchor="bottom"
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border border-white/5 bg-black/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                    >
                        {filteredGamePlatform.map((platform) => (
                            <ComboboxOption
                                key={platform._id}
                                value={platform}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-black">{platform.platformName}</div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
        )
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
            {renderCombobox()}

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
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />


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
