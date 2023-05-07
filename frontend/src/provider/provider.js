import React, { useState, useEffect } from "react";
import '../css/normalize.css';
import '../css/provider.css';
import {useNavigate, useParams} from "react-router-dom";

import axios from "axios";

import ProviderInfo from "./providerInfo";
import CommodityCard from "../home/commodityCard";
import Footer from "../components/footer";
import Header from "../components/header";
import HomeHeader from "../home/homeHeader";

function Provider(){
    const [commodities, setCommodities] = useState([]);
    const [providerName, setProviderName] = useState('');
    const [providerDate, setProviderDate] = useState('');
    const [providerImage, setProviderImage] = useState('');
    const [username, setUsername] = useState('')
    const [cartCount, setCartCount]= useState(0);
    const [buyList, setBuyList] = useState([]);

    const providerId = useParams('providerId');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
        }
        else {
            setUsername(JSON.parse(atob(userData)).userId);
            document.title = 'Provider';
            setCommodities([]);
            console.log(providerId.providerId);
            console.log(username)

        }

    }, []);
    useEffect(() => {
        if (username !== '') {

            axios.get(`http://localhost:8080/api/provider/${providerId.providerId}?username=${username}`).then((response) => {
                console.log(response);
                setProviderName(response.data.providerName);
                setProviderImage(response.data.providerImage);
                setProviderDate(response.data.providerDate);
                setCommodities(response.data.commodities);
                setCartCount(response.data.cartCount);
                setBuyList(response.data.buyList);
            });
        }
    },[username]);
    function increaseCartCount() {
        setCartCount(cartCount + 1)
    }

    function decreaseCartCount() {
        setCartCount(cartCount - 1)
    }
    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="/">
                            <img className="logo" src="/Logo.png" alt="Logo"/>
                        </a>
                        <div className="info-container-fluid d-flex justify-content-between">
                            <a href={`http://localhost:3000/user/${username}`}>
                                <div className="username">#{username}</div>
                            </a>
                            <a href={`http://localhost:3000/user/${username}`}>
                                <div className={`cart-container d-flex ${cartCount === 0 ? 'cart-container-zero' : 'cart-container'}`}>
                                    <div className="cart">
                                        Cart
                                    </div>
                                    <div className="cartNum">
                                        {cartCount}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container text-center">
                    <ProviderInfo providerImage={providerImage}
                                  providerDate={providerDate}
                                  providerName={providerName}/>
                    <div className="container mb-5">
                        <div className="all-provided mb-5">
                            <p>All provided commodities</p>
                        </div>
                        <div className="container mb-5">
                            <div className="row">
                                {commodities.map((commodity, index) => (
                                    <CommodityCard key={index}
                                                   commodity={commodity}
                                                   handleIncreaseCartCount={increaseCartCount}
                                                   handleDecreaseCartCount={decreaseCartCount}
                                                   buylist={buyList}
                                                   username={username}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
}
export default Provider;
