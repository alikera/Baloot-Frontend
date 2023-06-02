import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';
import '../css/normalize.css';
import Footer from '../components/footer';
import AuthHeader from '../auth/authHeader'
import FormField from "./formField";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            navigate('/');
        }
        document.title = 'Login';
    }, []);

    const loginError = () => toast.error("Incorrect email or password!");
    const loginSuccess = () => toast.success("You logged in successfully!")

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        //
        // const emailRegex = /^[a-zA-Z0-9]+$/;
        // if (!emailRegex.test(email)) {
        //     toast.error("Username can only contain alphabets and numbers!");
        //     return;
        // }
        const response = await fetch('http://localhost:8080/api/auth/login', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ email: email, password: password }),
        });
        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;

            // Store token in local storage
            localStorage.setItem('token', token);
            loginSuccess()
            navigate('/');
        } else {
            loginError()
        }
    }

    async function handleGithubSignIn(event) {
        window.location.replace("https://github.com/login/oauth/authorize?client_id=b8dba66689e0a75208f0&scope=user")
    }

    function LoginForm() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form className="signing-form" onSubmit={handleSubmit}>
                            <FormField field={"email"} type={"email"}/>
                            <FormField field={"password"} type={"password"}/>

                            <div className="form-group signing-container">
                                <button type="submit" className="sign-btn" onClick={handleSubmit}>
                                    Sign In
                                </button>
                                <button className="github-btn" type="submit" onClick={handleGithubSignIn}>
                                    Sign In with Github
                                </button>
                                <div className="forgot-password">
                                    <a href="/login" className="forgot-password-link">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <AuthHeader page={"register"}/>
            <LoginForm/>
            <ToastContainer />
            <Footer/>
        </>
    );
}

export default Login;