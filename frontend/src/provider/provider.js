import React, { useState, useEffect } from "react";
import '../css/normalize.css';
import '../css/provider.css';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function Provider(){
    const [commodities, setCommodities] = useState([]);
    const [providerName, setProviderName] = useState('');
    const [providerDate, setProviderDate] = useState('');
    const [providerImage, setProviderImage] = useState('');

    const providerId = useParams('providerId');
    useEffect(() => {
        setCommodities([]);
        console.log(providerId);
        axios.get(`http://localhost:8080/api/provider/${providerId.providerId}` ).then((response) => {
            console.log(response);
            setProviderName(response.data.providerName);
            setProviderImage(response.data.providerImage);
            setProviderDate(response.data.providerDate);
            setCommodities(response.data.commodities);
        });

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
                <div className="container text-center">
                    <div className="provider-image-container mb-5">
                        <img src={providerImage} alt="Big Image" />
                        <div className="subtitle mt-2">
                            <p>since {providerDate}</p>
                        </div>
                        <div className="provider-name">
                            <p>{providerName}</p>
                        </div>
                    </div>
                    <div className="container mb-5">
                        <div className="all-provided mb-5">
                            <p>All provided commodities</p>
                        </div>
                        <div className="row">
                            {commodities.map((commodity, index) => (
                                <div className="col-md-3 mb-4" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <a href="#">
                                                <h4 className="card-title">{commodity.name}</h4>
                                            </a>
                                            <p className="card-subtitle mb-2 mt-1">{commodity.inStock} left in stock</p>
                                            <img className="card-img" src={commodity.image} alt={commodity.name} />

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
