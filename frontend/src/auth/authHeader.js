import React from "react";
import '../css/authHeader.css';
import '../css/normalize.css';
function AuthHeader({ page }) {
    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand" href="/">
                        <img className="logo" src="/Logo.png" alt="Logo" />
                    </a>
                    <a href={`/${page}`}>
                        <button className={`${page}-btn`} type="button">
                            {page === "login" ? "Register" : "Login"}
                        </button>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default AuthHeader;