import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AddProduct from './components/product/AddProduct';
import RootLayout from "./components/root/RootLayout";
import { CartProvider } from "./components/product/CartContext";
const App = () => {
    return (
        <CartProvider>
              <Router>
            <Routes >
                <Route element={<HomePage />} >
                    <Route index element={<HomePage />} />
                    <Route path="/add-game" element={<AddProduct />} />


                </Route>

            </Routes >
        </Router>
        </CartProvider>
      

    );
};

export default App;
