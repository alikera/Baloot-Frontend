import React, { useState, useEffect } from "react";
import '../css/normalize.css';
import '../css/provider.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Provider(){
    const [commodities, setCommodities] = useState([]);
    useEffect(() => {
        async function fetchCommodities() {
            // Make an API call to fetch the commodities data
            const response = await fetch("http://localhost:8080/api/provider/1");
            const data = await response.json();

            // Update the commodities state with the fetched data
            setCommodities(data);
        }

        fetchCommodities();
    }, []);
    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="/">
                            <img className="logo" src="/Logo.png" alt="Logo"/>
                        </a>
                        <div className="info-container-fluid d-flex justify-content-between">
                            <a href="/provider">
                                <button className="register-btn" type="button">
                                    Register
                                </button>

                            </a>

                            <button className="login-btn" type="button">
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    <div className="container mb-5">
                        <div className="row">
                            {commodities.map((commodity, index) => (
                                <div className="col-md-3 mb-4" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <a href="#">
                                                <h4 className="card-title">{commodity.name}</h4>
                                            </a>
                                            <p className="card-subtitle mb-2 mt-1">{commodity.inStock} left in stock</p>
                                            <img className="card-img" src="/product.png" alt={commodity.name} />

                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <h7 className="card-text">{commodity.price}$</h7>
                                                <button type="submit" className="add-cart-btn">add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default Provider;
