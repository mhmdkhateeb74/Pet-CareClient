import React from 'react'
import loginpic from "../../assets/loginpic.png"
import { Link } from "react-router-dom";
import { useLoginUser } from "./apiHook";
import {useState} from "react";

function Login(props) {

    const {IsloginUser, loginUser} = useLoginUser();
    const [formData, setFormData] = useState({
        email:"",
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("clicked");
        console.log(formData, "formData");
        
        loginUser(formData);
    }

  return (

   

    <>
    <div style={styles.maindiv}>
         <div style={styles.divpic}>
            <img src={loginpic} style={styles.img} alt="dog login" />

        </div>

        <div style={styles.logindiv}>

            <div style={styles.lgin}>

                <h1 style={styles.h1}>Login</h1>
                <label style={styles.label}>Email</label>
                <input name="email"
                 onChange={handleChange}
                 style={styles.input} 
                 type="email" 
                 placeholder='Enter Email' />
                <label style={styles.label}>Password</label>
                <input  name="password"
                  onChange={handleChange} 
                  style={styles.input} 
                  type="password" 
                  placeholder='Enter Password' />
                
                <button onClick={handleSubmit} style={styles.button}>Login</button>
                <p style={{fontSize:"20px"}}>Dont have an account?  <Link 
                    style={{color:"#564BA5"}}
                    to="/Register">
                        Register
                    </Link> </p>
            </div>

        </div>


    </div>
    
    </>
  )
}

export default Login

const styles = {

    maindiv: {
        width:"100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
        width: "100%",
        
       
    },

    divpic:
    {
        width: "40%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       

    },

    logindiv:
    {
        width: "60%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#F5F3FB"

    },

    lgin:{
        width: "60%",
        height: "70%",
        backgroundColor: "white",
        borderRadius: "35px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },

    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },

    h1:{
        color: "#564BA5",
        fontSize: "60px",
        fontWeight: "blod",
        alignSelf: "center",
       
        
    },

    label: {
        width: "100%",
        color: "#564BA5",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "5px"
    },
     
    input: {
        width: "100%",
        height: "50px",
        border: "1px solid #D9D3EE",
        borderRadius: "12px",
        padding: "0 15px",
        fontSize: "16px",
        outline: "none",
        marginBottom: "20px",
        boxSizing: "border-box"
    },

    button:{
        width: "80%",
        height: "50px",
        border: "1px solid #D9D3EE",
        borderRadius: "12px",
        padding: "0 15px",
        fontSize: "20px",
        outline: "none",
        marginTop: "50px",
        color: "white",
        backgroundColor:"#564BA5"
    }


}