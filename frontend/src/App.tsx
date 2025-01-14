import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from './components/product/AddProduct'
import ProductList from "./components/product/ProductList";
import HomePage from "./components/home/HomePage";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<ProductList/>} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path = "/home" element = {<HomePage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
