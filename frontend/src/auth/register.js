import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';
import '../css/normalize.css';
import Footer from '../components/footer';
import AuthHeader from "./authHeader";
import FormField from "./formField";

function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            navigate('/');
        }
        document.title = 'Register';
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');
        const address = formData.get('address');
        const birthDate = formData.get('birthDate');
        try {
            const response = await fetch(
                'http://localhost:8080/api/auth/register',{
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    method: 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    body: JSON.stringify({ username: username, password: password, email: email, address: address, birthDate: birthDate}),
                });

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            navigate('/register');
        }
    };

    function RegisterForm() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form onSubmit={handleSubmit} className="signing-form">
                            <FormField field={"username"} type={"text"}/>
                            <FormField field={"email"} type={"email"}/>
                            <FormField field={"password"} type={"password"}/>
                            <FormField field={"confirmPassword"} type={"password"}/>
                            <FormField field={"address"} type={"text"}/>
                            <FormField field={"birthDate"} type={"date"}/>
                            <div className="form-group signing-container">
                                <button type="submit" className="sign-btn">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <>
            <AuthHeader page={"login"}/>
            <RegisterForm/>
            <Footer />

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default Register;