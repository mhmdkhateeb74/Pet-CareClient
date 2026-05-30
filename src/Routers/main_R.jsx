import React from "react";
import {createBrowserRouter} from "react-router";
import AppLayout from "../LayOut/AppLayout"
import HomePage from "../_Features/HomePage/HomePage"
import Infopage from "../_Features/InfoPage/Infopage"

const router = createBrowserRouter([
    {
        element:<AppLayout />,
        children:[
            {path:"/", element:<HomePage />,},
            {path:"/Infopage", element:<Infopage />,},
           
        ]
    },
]);

export const navItems = [
    {id:1 ,path:"/" ,name:"HomePage" },
    {id:2 ,path:"/test" ,name:"Admin" },
    {id:3 ,path:"/test" ,name:"Login" },
    {id:4 ,path:"/test" ,name:"Resgin" },
    
]

export default router;