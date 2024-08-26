import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./components/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import ProtectedAdmin from "./pages/ProtectedAdmin";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminProductDetail from "./pages/Admin/ProductDetail";
import NewProduct from "./pages/Admin/Products/newProduct";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div id="content">
        <Routes>
          <Route index path="/" element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedAdmin><Admin /></ProtectedAdmin>}/>
          <Route path={"/admin/orders"} element={<AdminOrders />} />
          <Route path={"/admin/products"} element={<AdminProducts />} />
          <Route path={"/admin/products/:product_id"} element={<AdminProductDetail />} />
          <Route path={"/admin/products/new"} element={<NewProduct />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
