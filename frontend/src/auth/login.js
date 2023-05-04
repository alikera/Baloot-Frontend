import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/auth.css';
import '../css/normalize.css';
import Footer from '../components/footer';
import AuthHeader from '../auth/authHeader'

function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
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
            navigate('/user?username=' + username);
        } else {
            console.log('WRONG');
            navigate('/login');
        }
    }

    useEffect(() => {
        document.title = 'Login';
    }, []);

    function LoginForm() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-sm-12 col-md-3">
                        <form className="signing-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group signing-container">
                                <button type="submit" className="sign-btn">
                                    Sign In
                                </button>
                                <div className="forgot-password">
                                    <a href="#" className="forgot-password-link">
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
            <AuthHeader page={"login"}/>
            <LoginForm/>
            <Footer/>
        </>
    );
}

export default Login;