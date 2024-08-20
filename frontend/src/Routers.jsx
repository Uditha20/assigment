import App from "./App";
import AboutUs from "./Pages/AboutUs";
import Blog from "./Pages/Blog";
import ContactUs from "./Pages/ContactUs";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import AdminDashBoard from "./Pages/AdminDashBoard";
import CusDashboard from "./Pages/CusDashboard";
import Product from "./Pages/Product";
import ShopCart from "./Pages/ShopCart";
import Allproduct from "./Pages/Allproduct";
import Payment from "./Pages/Payment";
import ShowSales from "./Pages/ShowSales";
import UserDetails from "./Pages/UserDetails";
import EditProduct from "./Pages/EditProduct";
import Account from "./Pages/Account";
import ProductDetail from "./Pages/ProductDetail";
import ProtectRouter from "./context/ProtectRoter";


export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Home",
        element: <Home />,
    },
    {
        path: "/AboutUs",
        element: <AboutUs />,
    },
    {
        path: "/Blog",
        element: <Blog />,
    },
    {
        path: "/ContactUs",
        element: <ContactUs />,
    },
    {
        path: "/Shop",
        element: <Shop />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Register",
        element: <Register />,
    },
    {
        path: "/AdminDashboard",
        element: <AdminDashBoard />,
    },
    {
        path: "/CustomerDashboard",
        element: <CusDashboard />,
    },
    {
        path:'/cart',
        element:<ShopCart/>
    },
    {
        path: "/product",
        element: <Product/>,
    },

    {
        path:'/allproduct',
        element:<Allproduct/>
    },
    {
        path:'/product-edit/:id',
        element:<EditProduct/>
    },
    {
        path:'/payment',
        element: <ProtectRouter><Payment/></ProtectRouter>
    },
    {
        path:'/allSales',
        element:<ShowSales/>
    },
    {
        path:'/allDetails',
        element:<UserDetails/>
    },
    {
        path:'/account',
        element:<Account/>
    },
    {
        path:'/productDetails/:id',
        element:<ProductDetail/>
    },
  
  
  
  
];