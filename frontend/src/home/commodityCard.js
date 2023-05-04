import React, {useState} from "react";
import "../css/commodityCard.css"
import {useNavigate} from "react-router-dom";
function CommodityCard({ commodity , handleIncreaseCartCount, handleDecreaseCartCount}) {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(0)

    function handleOnClickCommodity(){
        navigate(`commodity/${commodity.id}`)
    }

    function handleAddToCart(event) {
        event.stopPropagation();
        setQuantity(1);
        handleIncreaseCartCount()
    }

    function handleIncrement(event) {
        event.stopPropagation();
        if (commodity.inStock > quantity) {
            setQuantity(quantity + 1);
        }
    }

    function handleDecrement(event) {
        event.stopPropagation();
        if (quantity > 0) {
            if (quantity === 1) {
                handleDecreaseCartCount()
            }
            setQuantity(quantity - 1);
        }
    }
    return (
        <div className="col-md-3 mb-4">
            <div className="card" onClick={handleOnClickCommodity}>
                <div className="card-body">
                    <h4 className="card-title">{commodity.name}</h4>
                    <p className="card-subtitle mb-2 mt-1">
                        {commodity.inStock} left in stock
                    </p>
                    <img className="card-img" src={commodity.image} alt={commodity.name} />

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h7 className="card-text">{commodity.price}$</h7>
                        {quantity > 0 ? commodity.inStock > 0 && (
                            <div className="counter">
                                <button className="counter-btn" id={`decrement`} onClick={handleDecrement}>-</button>
                                <div className="counter-value" id={`counter`}>{quantity}</div>
                                <button className="counter-btn" id={`increment`} onClick={handleIncrement}>+</button>
                            </div>
                        ) : commodity.inStock > 0 && (
                                <button className="add-cart-btn" type="submit" onClick={handleAddToCart}>Add to Cart</button>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommodityCard;