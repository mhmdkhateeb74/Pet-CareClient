import React from 'react';
import {Outlet} from "react-router";
import {navItems} from "../Routers/main_R";
import { Link } from "react-router-dom";
import icon from "../assets/Icon.png";
import "../App.css";



function AppLayout(props) {
    return (
        <>
           
            <div style={styles.maindiv}>
                 <div style={styles.divicon}>
                <img  style={styles.icon} src={icon} alt="Icon-PetCare" />
                </div>
                <nav style={styles.nav}>
                {
                    navItems.map((item) => (
                    <Link 
                    style={styles.link}
                    key={item.id}
                    to={item.path}>
                    {item.name}
                    </Link>
                    
                ))


                }
          
            </nav>
            </div>
            <Outlet />
        </>
    );
}

const styles = {

    maindiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "ffe3bd",
        height: "100px",
        width: "100%",
        padding: "0 20px",
        boxSizing: "border-box"
    },

    nav:
    {
        display: "flex",
        alignItems:"flex-end",
        gap:"40px",

    },

    divicon:
    {
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        
    },

    icon:
    {
        borderRadius: "50px",
        width: "100px",
        height: "100px",
        alignItems:"flex-start",

    },
    link:
    {
        color: "#6B7280",
        fontSize: "18px",
        textDecoration: "none",
        fontWeight: "500"
    
    },

    



}

export default AppLayout;