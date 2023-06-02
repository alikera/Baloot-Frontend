import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from "./auth/login";
import Register from "./auth/register";
import User from "./user/user";
import Home from "./home/home";
import Provider from "./provider/provider";
import Commodity from "./commodity/commodity";
import React from "react";
import CallbackPage from "./auth/callback";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const notify = (message) => toast(message);
    return (<Router>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/user/:username" element={<User/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/provider/:providerId" element={<Provider/>}/>
            <Route path="/commodity/:id" element={<Commodity/>}/>
            <Route path="/callback" element={<CallbackPage notify={notify}/>}/>
        </Routes>
    </Router>);

}

export default App;
