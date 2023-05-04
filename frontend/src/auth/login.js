import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';
import '../css/normalize.css';
import Footer from '../components/footer';
import AuthHeader from '../auth/authHeader'
import FormField from "./formField";

function Login() {

    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            navigate('/');
        }
        document.title = 'Login';
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');

        const response = await fetch('http://localhost:8080/api/auth/login', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ username: username, password: password }),
        });
        console.log(response.status);
        if (response.status === 200) {
            const encryptedData = btoa(JSON.stringify({ userId: username }));
            localStorage.setItem('userData', encryptedData);
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    function LoginForm() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form className="signing-form" onSubmit={handleSubmit}>
                            <FormField field={"username"} type={"text"}/>
                            <FormField field={"password"} type={"password"}/>

                            <div className="form-group signing-container">
                                <button type="submit" className="sign-btn">
                                    Sign In
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
            <Footer/>
        </>
    );
}

export default Login;