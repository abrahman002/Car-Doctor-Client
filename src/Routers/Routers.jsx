import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/Signup";
import CheckOut from "../Pages/CheckOut/CheckOut";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<Signup></Signup>
        },
        {
          path:'/checkout/:id',
          element:<CheckOut></CheckOut>,
          loader:({params})=>fetch(`http://localhost:500/services/${params.id}`)
        }
      ]
    },
  ]);

export default router;