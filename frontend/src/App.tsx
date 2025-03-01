import { Route,Navigate, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/login/Login";
import SocialFeed from "./components/forum/Forum2";
import ForumHomepage from "./components/forum/ForumHome";
import PostDetail from "./components/forum/PostDetail";
import HomePage from "./components/home/HomePage";
import { SearchResults } from "./components/home/search/SearchResults";
import AddProduct from './components/product/AddProduct';
import RootLayout from "./components/root/RootLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext/AuthContext";
import SellerHome from "./seller/ProductRow";
import SellerDashboard from "./seller/SellerDashboard";
import AddSkin from "./components/product/AddSkin";
import UserProfileEdit from "./components/user/UserProfile";
import ProductDetails from "./components/product/ProductDetails";
import Register from "./components/auth/register/Register";

const App = () => {
  return (
    <AuthProvider> {/* Ensure AuthProvider wraps everything */}
        <AuthWrapper />
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

  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/forum" element={<ForumHomepage />} />
          <Route path="/forum2" element={<SocialFeed />} />
          <Route path="/game/:id" element={<ProductDetails/>}/>
          <Route path="/skin/:id" element={<ProductDetails/>}/>
          <Route path ="/post/:id" element={<PostDetail/>}/>
          <Route path = "/user-profile" element={<UserProfileEdit/>}/>
        </Route>
        <Route element={<SellerDashboard />}>
          <Route path="/seller-dashboard" element={<SellerHome />} />
          <Route path="/add-game" element={<AddProduct />} />
          <Route path="/add-skin" element={<AddSkin />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
