import React, { useState, useEffect } from "react";
import '../css/normalize.css';
import '../css/provider.css';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ProviderInfo from "./providerInfo";
import Commodity from "../home/commodityCard";
import Footer from "../components/footer";
import Header from "../components/header";

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
            <Header/>
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
                                    <Commodity key={index} commodity={commodity} />
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
