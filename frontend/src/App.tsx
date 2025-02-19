import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import HomePage from "./components/home/HomePage";
import { SearchResults } from "./components/home/search/SearchResults";
import AddProduct from './components/product/AddProduct';
import { CartProvider } from "./components/product/CartContext";
import RootLayout from "./components/root/RootLayout";
import { AuthProvider } from "./contexts/AuthContext/AuthContext";
import { useEffect } from "react";
import { useAuth } from './contexts/AuthContext/AuthContext';
import EcommerceUI from "./components/order/ShoppingCart";
import ForumApp from "./components/forum/PostForm";
import ForumHomepage from "./components/forum/ForumHome";
import PostDetail from "./components/forum/PostDetail";
import SocialFeed from "./components/forum/Forum2";

const App = () => {
  return (
    <AuthProvider> {/* Ensure AuthProvider wraps everything */}
      <CartProvider>
        <AuthWrapper />
      </CartProvider>
    </AuthProvider> 
  );
};

const AuthWrapper = () => {

  // const { user, isAuthenticated, login } = useAuth();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUser && storedToken && !isAuthenticated) {
  //     const user = JSON.parse(storedUser);
  //     login(user, storedToken!);
  //   }
  // }, [isAuthenticated]); 


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/add-game" element={<AddProduct />} />
          <Route path="/post/:id" element={<PostDetail/>} />
          <Route path="/search" element={<SearchResults />} />
          <Route path = "/orders" element={EcommerceUI()}/>
          <Route path = "/forum" element = {<ForumHomepage/>}/>
          <Route path = "/forum2" element = {<SocialFeed/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
