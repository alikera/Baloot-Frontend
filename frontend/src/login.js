// import React, { useState } from 'react';
// import axios from 'axios';
// import {useNavigate} from "react-router-dom";
//
// function Login() {
//     // const [username, setUsername] = useState('');
//     // const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [password, setPassword] = useState('')
//     const [username, setUsername] = useState('')
//
//     function handleEmailChange (event) {
//         setUsername(event.target.value);
//     }
//
//     function handlePasswordChange(event) {
//         setPassword(event.target.value);
//     }
//     //
//     // const handleSubmit = async (event) => {
//     //     event.preventDefault();
//     //     try {
//     //         console.log("hereeeeeeeeeeeeeeeeeeeeeee");
//     //         const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
//     //         console.log(response.status);
//     //         // Redirect or show success message
//     //     } catch (error) {
//     //         console.error(error);
//     //         // Show error message
//     //     }
//     // };
//     async function handleSubmit(event) {
//         console.log("hereeeeeeeeeeeeeeeeeeeeeee");
//
//         event.preventDefault();
//         const response = await fetch('http://localhost:8080/api/auth/login', {
//             headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
//             method: 'POST',
//             mode: 'cors',
//             redirect: 'follow',
//             body: JSON.stringify({ "username": username, "password": password })
//         });
//         const data = await response.json();
//         console.log('A name was submitted: ' + data.status + ': ' + data.data);
//         if (data.status === 200) {
//             navigate("/")
//         } else {
//             console.log("WRONG");
//             navigate("/login")
//         }
//     }
//
//     return (
//         <>
//             <header className="header-container">
//                 <nav className="navbar">
//                     <div className="container-fluid d-flex justify-content-between">
//                         <a className="navbar-brand" href="#">
//                             <img className="logo" src="/frontend/images/Logo.png" alt="Logo" />
//                         </a>
//
//                         <button className="register-btn" type="button">
//                             Register
//                         </button>
//                     </div>
//                 </nav>
//             </header>
//
//             <div className="container-fluid">
//                 <div className="row justify-content-center align-items-center vh-100">
//                     <div className="col-sm-12 col-md-3">
//                         <form onSubmit={handleSubmit} className="signing-form">
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Email"
//                                     value={username}
//                                     onChange={(event) => setUsername(event.target.value)}
//                                     required
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     id="password-field"
//                                     type="password"
//                                     className="form-control"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={(event) => setPassword(event.target.value)}
//                                     required
//                                 />
//                                 <span className=""></span>
//                             </div>
//                             <div className="form-group signing-container">
//                                 <button type="submit" className="sign-btn">
//                                     Sign In
//                                 </button>
//                                 <div className="forgot-password">
//                                     <a href="#" className="forgot-password-link">
//                                         Forgot Password?
//                                     </a>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
//         </>
//     );
// }
//
// export default Login;

// import '../styles/localbootstrap.scss';
import React, {useState} from 'react';
// import IemdbLogo from './IemdbLogo';
import { useNavigate } from "react-router-dom";

function IemdbLogo() {
    return (
        <div className="col-md-8 col-lg-7 col-xl-6">
            <img
                alt="Phone image"
                className="img-fluid"
                src={process.env.PUBLIC_URL + '/logo.png'}
            />
        </div>
    );
}

function LoginForm({notify}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    function handleUsernameChange (event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        const response = await fetch('http://localhost:8080/api/auth/login', {
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ "username": username, "password": password })
        });
        const data = await response.json();
        console.log('A name was submitted: ' + data.status + ': ' + data.data);
        if (data.status === 200) {
            notify("Login Successful!")
            navigate("/")
        } else {
            notify("Wrong username or password!")
            navigate("/login")
        }
    }

    return (
        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input
                        className="form-control form-control-lg"
                        id="username"
                        name="username"
                        type="username"
                        value={username} onChange={handleUsernameChange}
                    />
                    <label className="form-label">username address</label>
                </div>

                <div className="form-outline mb-4">
                    <input
                        className="form-control form-control-lg"
                        id="password"
                        name="password"
                        type="password"
                        value={password} onChange={handlePasswordChange}
                    />
                    <label className="form-label">Password</label>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit">
                    Sign in
                </button>
            </form>
        </div>
    );
}

function LoginPage({notify}) {
    return (
        <div className='local-bootstrap'>
            <div className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <IemdbLogo />
                        <LoginForm notify={notify}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;