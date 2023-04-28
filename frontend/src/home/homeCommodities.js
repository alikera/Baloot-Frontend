import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/commodities.css';
import '../css/normalize.css';
import {Pagination} from "@mui/material";

function Home() {
    const [commodities, setCommodities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOption, setSearchOption] = useState("name");
    const [availableFlag , setAvailableFlag] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    useEffect(() => {
        setCommodities([]);
        setTotalPages(1);
        const apiUrl = `http://localhost:8080/api/?search=${searchQuery}&option=${searchOption}&available=${availableFlag}&sort=${sortBy}&page=${pageNumber}`;
        axios.get(apiUrl).then((response) => {
            setCommodities(response.data.commodities);
            setTotalPages(response.data.totalPages);

        });
    }, [sortBy, pageNumber, availableFlag, searchOption, searchQuery]);
    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    }

    // const handleSearchButtonClick = (event) => {
    //     const apiUrl = `http://localhost:8080/api/?search=${searchQuery}&option=${searchOption}&available=${availableFlag}&sort=${sortBy}&page=${pageNumber}`;
    //     axios.get(apiUrl).then((response) => {
    //         setCommodities(response.data);
    //         setTotalPages(response.data.totalPages);
    //
    //     });
    // }
    const handleSearchOption = (event) =>{
        setSearchOption(event.target.value)
    }

    const handleAvailableCommodities = (event) =>{
        setAvailableFlag(!availableFlag)
    }
    const handleSortByChange = (event) => {
        setSortBy(event.target.value);

    };
    const handlePageNumber = (event, value) => {
        setPageNumber(value);
    }

    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="/">
                            <img className="logo" src="/Logo.png" alt="Logo"/>
                        </a>

                        <form className="form-inline d-flex justify-content-between">
                            <div className="dropdown">
                                <select className="form-control" value={searchOption} onChange={handleSearchOption}>
                                    <option className="name" value="name">name</option>
                                    <option className="category" value="category">category</option>
                                </select>
                            </div>
                            <div className="input-group d-flex justify-content-between">
                                <input type="text" className="form-control" placeholder="search your product..." value={searchQuery} onChange={handleSearchQueryChange}/>
                                <div className="input-group-append">
                                    <button className="btn-magnifier" type="button" ><img
                                        src="/Magnifier.png" alt="search"/></button>
                                </div>
                            </div>
                        </form>
                        <div className="info-container-fluid d-flex justify-content-between">
                            <button className="register-btn" type="button">
                                Register
                            </button>

                            <button className="login-btn" type="button">
                                Login
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    <div className="container filter-bar d-flex justify-content-between ">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="p-3">Available commodities</h5>
                            <input type="checkbox" className="toggle" checked={availableFlag} onChange={handleAvailableCommodities}/>
                        </div>
                        <div className="d-flex justify-content-around align-items-center float-right">
                            <h6 className="sort-by p-2 mr-5">sort by:</h6>
                            <div className="sort-options">
                                <div className="radio-container">
                                    <input type="radio" name="sort-option" id="sort-name" className="radio-button" value="name" onChange={handleSortByChange} checked={sortBy === "name"} />
                                    <label className="radio-label p-2 mr-3" htmlFor="sort-name">Name</label>
                                </div>
                                <div className="radio-container">
                                    <input type="radio" name="sort-option" id="sort-price" className="radio-button" value="price" onChange={handleSortByChange} checked={sortBy === "price"} />
                                    <label className="radio-label p-2 mr-3 ml-3" htmlFor="sort-price">Price</label>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <Pagination count={totalPages} size="small" onChange={handlePageNumber}/>
                </div>

            </main>


        </>
    );
}

export default Home;
