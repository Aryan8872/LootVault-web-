import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from './components/product/AddProduct'
import ProductList from "./components/product/ProductList";
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList/>} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
