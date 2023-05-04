import React, {useEffect, useState} from "react";
import "../css/homeHeader.css"
import user from "../user/user";
function HomeHeader(props) {
    const { searchOption, handleSearchOption, searchQuery, handleSearchQueryChange, username, cartCount } = props;
    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src="/Logo.png" alt="Logo" />
                    </a>

                    <form className="form-inline d-flex justify-content-between">
                        <div className="dropdown">
                            <select
                                className="form-control"
                                value={searchOption}
                                onChange={handleSearchOption}
                            >
                                <option className="name" value="name">
                                    name
                                </option>
                                <option className="category" value="category">
                                    category
                                </option>
                                <option className="provider" value="provider">
                                    provider
                                </option>
                            </select>
                        </div>
                        <div className="input-group d-flex justify-content-between">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="search your product..."
                                value={searchQuery}
                                onChange={handleSearchQueryChange}
                            />
                            <div className="input-group-append">
                                <button className="btn-magnifier" type="button">
                                    <img src="/Magnifier.png" alt="search" />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="info-container-fluid d-flex justify-content-between">
                        <a href={`user/${username}`}>
                            <div className="username">#{username}</div>

                        </a>
                        <div className={`cart-container d-flex ${cartCount === 0 ? 'cart-container-zero' : 'cart-container'}`}>
                            <div className="cart">
                                Cart
                            </div>
                            <div className="cartNum">
                                {cartCount}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HomeHeader;