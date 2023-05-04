import React from "react";

function Commodity({ commodity }) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <a href="#">
                        <h4 className="card-title">{commodity.name}</h4>
                    </a>
                    <p className="card-subtitle mb-2 mt-1">
                        {commodity.inStock} left in stock
                    </p>
                    <img className="card-img" src={commodity.image} alt={commodity.name} />

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h7 className="card-text">{commodity.price}$</h7>
                        <button type="submit" className="add-cart-btn">
                            add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Commodity;