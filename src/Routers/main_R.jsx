import React from "react";
import {createBrowserRouter} from "react-router";
import AppLayout from "../LayOut/AppLayout"
import HomePage from "../_Features/HomePage/HomePage"
import Infopage from "../_Features/InfoPage/Infopage"
import Login from "../_Features/Login/login"
import Register from "../_Features/Register/register"
import UserPage from "../_Features/UserPage/Profile/UserPage";
import UserLayout from "../LayOut/UserLayout"
import MyPets from "../_Features/UserPage/MyPets/MyPets"
import Visit from "../_Features/UserPage/MyPets/Visits/Visit"
import History from "../_Features/UserPage/MyPets/MedicalHistory/History"

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
    {
        path: "/User",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <UserPage />
            },
            {
                path: "MyPets",
                element: <MyPets />
            },
            {
                path: "Visit/:animal_id",
                element: <Visit />
            },
            {
                path: "History/:animal_id",
                element: <History />
            }
            
        ]
    }

]);

export const navItems = [
    {id:1 ,path:"/" ,name:"HomePage" },
    {id:2 ,path:"/Infopage" ,name:"About us" },
    {id:3 ,path:"/Login" ,name:"Login" },
    {id:4 ,path:"/Register" ,name:"Register" },
    
]

export const navUser = [
    {id:1 ,path:"/" ,name:"HomePage" },
    {id:2 ,path:"/Infopage" ,name:"About us" },
    {id:3 ,path:"/User" ,name:"ProFile" },
    {id:4 ,path:"/User/MyPets" ,name:"MyPets" },
   ,
    
]

export default router;