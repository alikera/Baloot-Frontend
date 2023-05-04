import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/normalize.css";
import Commodity from "./commodityCard";
import Footer from "../components/footer";
import { useNavigate } from 'react-router-dom';
import MyPagination from "../components/Pagination";
import FilterBar from "./FilterBar";
import HomeHeader from "./HomeHeader";
import CommodityCard from "./commodityCard";


function Home() {
    const navigate = useNavigate();

    const [commodities, setCommodities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("name");
    const [availableFlag, setAvailableFlag] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [username, setUsername] = useState('')
    const [cartCount, setCartCount]= useState(0);

    // TODO: total page
    const [totalPages, setTotalPages] = useState(10);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        setUsername(JSON.parse(atob(userData)).userId);
        if (!userData) {
            navigate('/login');
        }
        document.title = 'Home';
        setCommodities([]);
        setTotalPages(1);
        const apiUrl = `http://localhost:8080/api/?search=${searchQuery}&option=${searchOption}&available=${availableFlag}&sort=${sortBy}&page=${pageNumber}&username=${username}`;
        axios.get(apiUrl).then((response) => {
            setCommodities(response.data.commodities)
            setTotalPages(response.data.totalPages)
            setCartCount(response.data.cartCount)
        });


    }, [sortBy, pageNumber, availableFlag, searchOption, searchQuery, username]);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchOption = (event) => {
        setSearchOption(event.target.value);
    };

    const handleAvailableCommodities = (event) => {
        setAvailableFlag(!availableFlag);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handlePageNumber = (event, value) => {
        setPageNumber(value);
    };

    function increaseCartCount() {
        setCartCount(cartCount + 1)
    }

    function decreaseCartCount() {
        setCartCount(cartCount - 1)
    }

    return (
        <>
            <HomeHeader searchOption={searchOption}
                    handleSearchOption={handleSearchOption}
                    searchQuery={searchQuery}
                    handleSearchQueryChange={handleSearchQueryChange}
                    username={username}
                        cartCount={cartCount}
            />
            <main>
                <div className="container">
                    <FilterBar
                        availableFlag={availableFlag}
                        handleAvailableCommodities={handleAvailableCommodities}
                        sortBy={sortBy}
                        handleSortByChange={handleSortByChange}
                    />
                    <div className="container mb-5">
                        <div className="row">
                            {commodities.map((commodity, index) => (
                                <CommodityCard key={index} commodity={commodity} handleIncreaseCartCount={increaseCartCount} handleDecreaseCartCount={decreaseCartCount}/>
                            ))}
                        </div>
                    </div>

                    <MyPagination totalPages={totalPages} handlePageNumber={handlePageNumber} />
                </div>
            </main>

            <Footer/>
        </>
    );
}

export default Home;