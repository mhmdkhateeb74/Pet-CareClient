import React from "react";
import {createBrowserRouter} from "react-router";
import AppLayout from "../LayOut/AppLayout"
import HomePage from "../_Features/HomePage/HomePage"
import Infopage from "../_Features/InfoPage/Infopage"
import Login from "../_Features/Login/login"
import Register from "../_Features/Register/register"

const router = createBrowserRouter([
    {
        element:<AppLayout />,
        children:[
            {path:"/", element:<HomePage />,},
            {path:"/Infopage", element:<Infopage />,},
            {path:"/Login", element:<Login />,},
            {path:"/Register", element:<Register />,},
            
           
        ]
    },
]);

export const navItems = [
    {id:1 ,path:"/" ,name:"HomePage" },
    {id:2 ,path:"/Infopage" ,name:"About us" },
    {id:3 ,path:"/Login" ,name:"Login" },
    {id:4 ,path:"/Register" ,name:"Register" },
    
]

export default router;