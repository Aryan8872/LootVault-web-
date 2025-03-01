import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Input, Label, Textarea } from "@headlessui/react";
import axios from "axios";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import FileUploader from "./FileUploader";


const AddProduct = () => {
    const [gameName, setProductName] = useState("");
    const [gamePrice, setProductPrice] = useState("");
    const [gameDescription, setProductDescription] = useState("");
    const [image, setImage] = useState(null);

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
            const response = await axios.get("http://localhost:3000/api/category/game/all");
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
        formData.append("category", selectedGameCategory._id);

        console.log(`name: ${gameName},price: ${gamePrice},description :${gameDescription},image: ${image}, category :${selectedGameCategory._id}`);

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



            </div>
        )
    };

    return (
        <>

            <div className="">
                <div className="text-white">
                    Add game
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-[repeat(2,550px)] grid-rows-2 px-40 justify-center gap-x-4 gap-y-2 items-center" >
                    <div className="flex flex-col px-7 gap-5 bg-white max-w-[37rem] rounded-lg shadow-md h-max pb-6">
                        <span className="mt-5">General Information</span>

                        <div className="flex flex-col gap-3 ">
                            <div className="w-full max-w-md">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-black">Name</Label>
                                    <Input
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 '
                                        )}
                                        onChange={(e) => setProductName(e.target.value)}
                                        value={gameName}

                                    />
                                </Field>
                            </div>


                            <div className="w-full max-w-md ">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-black">Description</Label>
                                    {/* <Description className="text-sm/6 text-black/50">This will be shown under the product title.</Description> */}
                                    <Textarea
                                        className={clsx(
                                            'mt-3 block w-full resize-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 !h-[6rem] '
                                        )}
                                        rows={3}
                                        value={gameDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}

                                    />
                                </Field>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col px-7  bg-white rounded-lg shadow-md">
                        <span className="mt-5">Product Media</span>
                        <div className=" flex items-center justify-center p-6 w-full">
                            <FileUploader onFileSelect={(file) => setImage(file)} />
                        </div>

                    </div>

                    <div className="flex flex-col px-7 gap-5 bg-white max-w-[37rem] rounded-lg shadow-md h-max pb-6 ">
                        <span className="mt-5">Pricing</span>

                        <div className="flex flex-col gap-3">
                            <div className="w-full max-w-md">
                                <Field>
                                    <Label className="text-sm/6 font-medium text-black">Product Price</Label>
                                    {/* <Description className="text-sm/6 text-black/50">Use your real name so people will recognize you.</Description> */}
                                    <Input
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 text-black',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        value={gamePrice}


                                    />
                                </Field>
                            </div>



                        </div>

                    </div>
                    <div className="flex flex-col px-7 gap-5 bg-white max-w-[37rem] rounded-lg shadow-md h-max pb-6 ">
                        <span>Category</span>
                        <div>
                            <span>Platform</span>

                            <div>
                                <Combobox value={selectedGamePlatform} onChange={(value) => setSelectedGamePlatform(value)} onClose={() => setPlatformQuery('')}>
                                    <div className="relative">
                                        <ComboboxInput
                                            className={clsx(
                                                'w-full rounded-lg border-none bg-[#F2F2F2] py-1.5 pr-8 pl-3 text-sm/6 text-black',
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
                                            'w-[var(--input-width)]  rounded-xl border border-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                        )}
                                    >
                                        {filteredGamePlatform.map((platform) => (
                                            <ComboboxOption
                                                key={platform._id}
                                                value={platform}
                                                className="group flex cursor-default items-center bg-black gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-blue-800"
                                            >
                                                <CheckIcon className="invisible size-4 bg-white group-data-[selected]:visible" />
                                                <div className="text-sm/6 text-white">{platform.platformName}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Combobox>
                            </div>
                        </div>


                        <div>
                            <span className="mt-5">Category</span>
                            <div>
                                <Combobox value={selectedGameCategory} onChange={(value) => setSelectedGameCategory(value)} onClose={() => setCategoryQuery('')}>
                                    <div className="relative">
                                        <ComboboxInput
                                            className={clsx(
                                                'w-full rounded-lg border-none bg-[#F2F2F2] py-1.5 pr-8 pl-3 text-sm/6 text-black',
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
                                                className="group flex cursor-default bg-black items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-blue-800"
                                            >
                                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                                <div className="text-sm/6 text-white">{category.categoryName}</div>
                                            </ComboboxOption>
                                        ))}
                                    </ComboboxOptions>
                                </Combobox>
                            </div>


                        </div>

                    </div>
                    <button
                        type="submit"
                        className={clsx(

                            'mt-6 w-full max-w-md py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md',
                            'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            'transition duration-150 ease-in-out justify-self-center col-span-2 self-center'
                        )}
                    >
                        Add Game
                    </button>


                </form>
            </div>
        </>

    );
};

export default AddProduct;