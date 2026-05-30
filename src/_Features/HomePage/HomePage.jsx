import React from 'react';
import puppyHomePage from "../../assets/puppyHomePage.jpg";
import { useNavigate } from "react-router-dom";


function HomePage(props) {
   const Navigate=useNavigate();
    return (
        <>
            <div style={styles.maindiv}>

            <div style={styles.TextDiv} >
                <h1 style={styles.Text}>Pet</h1>
                <h1 style={styles.Text}>Care</h1>
                <p style={styles.p}>House Call Veterinarian</p>
                <button style={styles.button} onClick={()=>Navigate("/Infopage")} >Click For More Informaion</button>
            </div>

            <div style={styles.imgdiv}>
                <img style={styles.img} src={puppyHomePage} alt="PuppyHomePage" />
            </div>

            </div>
           
        </>
    );
}

const styles = {

    maindiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 100px)",
        width: "100%",
        backgroundColor: "#F3F0F9"
    },

    TextDiv:
    {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "700px",
        width: "400px",
        
    },

    Text:
    {
        color: "#564BA5",
        fontSize: "100px",
        fontWeight: "1500",
        margin: 0,
    },

    imgdiv:
    {
        height: "700px",
        width: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    img:
    {
        borderRadius: "100%",
        width: "350px",
        height: "350px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
    },

    p:
    {
        color: "#564BA5",
        fontSize: "30px",
        fontWeight: "50"

    },

    button:
    {
        color: "white",
        backgroundColor: "#564BA5",
        width: "220px",
        height: "50px",
        fontSize: "16px",
        borderRadius: "10px",
        fontWeight: "600",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"

    }
    


}

export default HomePage;