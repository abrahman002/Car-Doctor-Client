import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/Signup";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Bookins from "../Pages/Bookings/Bookins";
import PrivetRoutes from "./PrivetRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/checkout/:id',
        element: <PrivetRoutes><CheckOut></CheckOut></PrivetRoutes>,
        loader: ({ params }) => fetch(`http://localhost:500/services/${params.id}`)
      },
      {
        path: '/bookings',
        element: <PrivetRoutes><Bookins></Bookins></PrivetRoutes>
      }
    ]
  },
]);

export default router;