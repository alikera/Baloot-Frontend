import React, { useState } from 'react';
import '../css/login.css'
import '../css/normalize.css';
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    async function handleSubmit(event) {
        console.log("hereeeeeeeeeeeeeeeeeeeeeee");

        event.preventDefault();
        const response = await fetch('http://localhost:8080/api/auth/login', {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({"username": username, "password": password})
        });
        const data = await response.json();
        console.log('A name was submitted: ' + data.status + ': ' + data.data);
        if (data.status === 200) {
            window.location.href("/")
        } else {
            console.log("WRONG");
            window.location.href("/login")
        }
    }

    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="#">
                            <img className="logo" src="/Logo.png" alt="Logo"></img>
                        </a>

                        <button className="register-btn" type="button">
                            Register
                        </button>
                    </div>
                </nav>
            </header>
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form className="signing-form" onSubmit={handleSubmit}>
                            <div className="form-group ">
                                <input type="text"
                                       className="form-control"
                                       placeholder="Username"
                                       value={username}
                                       onChange={(event) => setUsername(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group">
                                <input type="password"
                                       className="form-control"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(event) => setPassword(event.target.value)}
                                       required/>
                            </div>
                            <div className="form-group signing-container">
                                <button type="submit" className="sign-btn">Sign In</button>
                                <div className="forgot-password">
                                    <a href="#" className="forgot-password-link">Forgot Password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="position-relative">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            2023 @UT
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Login;