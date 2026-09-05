import loginpic from "../../assets/loginpic.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUser } from "../API/apiHook";

function Register() {

    const { IsRegister, RegisterUser } = useRegisterUser();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        RegisterUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
    };

    return (
        <>
            <div style={styles.maindiv}>

                <div style={styles.divpic}>
                    <img
                        src={loginpic}
                        style={styles.img}
                        alt="Pet Care"
                    />
                </div>

                <div style={styles.registerDiv}>

                    <div style={styles.registerForm}>

                        <h1 style={styles.h1}>Register</h1>

                        <label style={styles.label}>Name</label>
                        <input
                            name="name"
                            onChange={handleChange}
                            style={styles.input}
                            type="text"
                            placeholder="Enter Your Name"
                        />

                        <label style={styles.label}>Email</label>
                        <input
                            name="email"
                            onChange={handleChange}
                            style={styles.input}
                            type="email"
                            placeholder="Enter Email"
                        />

                        <label style={styles.label}>Password</label>
                        <input
                            name="password"
                            onChange={handleChange}
                            style={styles.input}
                            type="password"
                            placeholder="Enter Password"
                        />

                        <label style={styles.label}>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            onChange={handleChange}
                            style={styles.input}
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <button
                            onClick={handleSubmit}
                            style={styles.button}
                        >
                            Register
                        </button>

                        <p style={{ fontSize: "20px" }}>
                            Already have an account?{" "}
                            <Link
                                style={{ color: "#564BA5" }}
                                to="/Login"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Register;


const styles = {

    maindiv: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
        width: "100%"
    },

    divpic: {
        width: "40%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    registerDiv: {
        width: "60%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F3FB"
    },

    registerForm: {
        width: "60%",
        height: "80%",
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

    h1: {
        color: "#564BA5",
        fontSize: "60px",
        fontWeight: "bold",
        alignSelf: "center"
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
        height: "200px",
        border: "1px solid #D9D3EE",
        borderRadius: "12px",
        padding: "0 15px",
        fontSize: "16px",
        outline: "none",
        marginBottom: "20px",
        boxSizing: "border-box"
    },

    button: {
        width: "80%",
        height: "200px",
        border: "1px solid #D9D3EE",
        borderRadius: "12px",
        padding: "0 15px",
        fontSize: "20px",
        outline: "none",
        marginTop: "50px",
        color: "white",
        backgroundColor: "#564BA5"
    }

};