import React from 'react';

function Header() {
    return (
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
    );
}

export default Header;