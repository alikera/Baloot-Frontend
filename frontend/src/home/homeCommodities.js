import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/commodities.css'
import '../css/normalize.css';
function Home() {

    const [commodities, setCommodities] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/").then((response) => {
            setCommodities(response.data);
        });
    }, []);

    const CARDS_PER_PAGE = 12;
    const totalPages = Math.ceil(commodities.length / CARDS_PER_PAGE);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const renderPageNumbers = pageNumbers.map((number) => {
        return (
            <li key={number} id={number} onClick={handleClick}>
                {number}
            </li>
        );
    });

    return (
        <>
        <header className="header-container">
            <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand" href="#">
                        <img className="logo" src="/Logo.png" alt="Logo"/>
                    </a>

                    <form className="form-inline d-flex justify-content-between">
                        <div className="dropdown">
                            <select className="form-control">
                                <option className="name" value="name">name</option>
                                <option className="category" value="category">category</option>
                            </select>
                        </div>
                        <div className="input-group d-flex justify-content-between">
                            <input type="text" className="form-control" placeholder="search your product..."/>
                                <div className="input-group-append">
                                    <button className="btn-magnifier" type="button"><img
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
                <div className="container filter-bar d-flex justify-content-between mb-5">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="p-3">Available commodities</h5>
                        <input type="checkbox" className="toggle"/>
                    </div>
                    <div className="d-flex justify-content-around align-items-center float-right">
                        <h6 className="sort-by p-2 mr-5">sort by:</h6>
                        <div className="radio-container">
                            <input type="radio" name="sort-option" id="sort-name" className="radio-button"/>
                                <label className="radio-label p-2 mr-3" htmlFor="sort-name">name</label>
                        </div>
                        <div className="radio-container">
                            <input type="radio" name="sort-option" id="sort-price" className="radio-button"/>
                                <label className="radio-label p-2 mr-3 ml-3" htmlFor="sort-price">price</label>
                        </div>
                    </div>
                </div>
                <div className="card-columns">
                    {commodities.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE).map((commodity, index) => (
                        <div className="card" key={index}>
                            <div className="card-body">
                                <a href="#">
                                    <h4 className="card-title">{commodity["name"]}</h4>
                                </a>
                                <p className="card-subtitle mb-2">{commodity["inStock"]} left in stock</p>
                                <img className="card-img" src="/product.png" alt={commodity["name"]}/>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <h5 className="card-text">{commodity["price"]}$</h5>
                                    <button type="submit" className="add-cart-btn">add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button key={number} className={currentPage === number ? "active" : ""} onClick={() => setCurrentPage(number)}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}

export default Home;
