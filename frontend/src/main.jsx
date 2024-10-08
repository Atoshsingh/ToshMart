import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx'
import './index.css'
import Login from "./pages/Auth/Login.jsx"
import Register from "./pages/Auth/Register.jsx"
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Profile from './pages/User/Profile.jsx'
import ProductList from './pages/Admin/ProductList.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
//private route 
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/products/Favorites.jsx';
import ProductDetails from './pages/products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import { FaShippingFast } from 'react-icons/fa';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route index={true} path='/' element={<Home />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      {/* Private Routes || Registered Users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="allProductslist" element={<AllProducts />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
      </Route>
    </Route>,
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);