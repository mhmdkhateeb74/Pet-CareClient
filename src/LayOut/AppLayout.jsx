import React from 'react';
import {Outlet} from "react-router";
import {navItems} from "../Routers/main_R";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import "../App.css";



function AppLayout(props) {
    return (
        <>
           
            <div style={styles.maindiv}>
                 <div style={styles.divicon}>
                  <div style={styles.logo}>
                   <FaPaw />
                    <span>Pet Care</span>
                 </div>
                </div>
                <nav style={styles.nav}>
                {
                    navItems.map((item) => (
                    <Link 
                    style={styles.link}
                    className="navlink"
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
        backgroundColor: "#564BA5",
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

        logo: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold"
        },
   
    link:
    {
        fontSize: "25px",
        textDecoration: "none",
        fontWeight: "500",
        paddingRight: "70px",
        borderRight: "2px solid white",
        gap: "40px"
    },

    



}

export default AppLayout;