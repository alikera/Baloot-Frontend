import React, {useEffect, useState} from "react";
import "../css/commodityCard.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
function CommodityCard({ width="100%", commodity , handleIncreaseCartCount, handleDecreaseCartCount, buylist, username}) {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(0)
    const [inStock, setInStock] = useState(commodity.inStock)

    useEffect( ()=> {
        if (buylist[commodity.id]) {
            setQuantity(buylist[commodity.id])
        }
    }, [])

    function handleOnClickCommodity(){
        window.location.href = `http://localhost:3000/commodity/${commodity.id}`;
    }

    async function handleAddToCart(event) {
        event.stopPropagation();
        setQuantity(1);

        handleIncreaseCartCount();
        const response = await axios.put(`http://localhost:8080/api/user/buyList/${username}`, {
            commodityId: commodity.id,
            count: "1"
        });
        if(response.status === 200) {
            setInStock(response.data)
        }
    }

    async function handleIncrement(event) {
        event.stopPropagation();
        if (inStock > 0) {
            setQuantity(quantity + 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${username}`, {
                commodityId: commodity.id,
                count: "1"
            });
            if(response.status === 200){
                setInStock(response.data)
            }
        }
    }

    async function handleDecrement(event) {
        event.stopPropagation();
        if (quantity > 0) {
            if (quantity === 1) {
                handleDecreaseCartCount()
            }
            setQuantity(quantity - 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${username}`, {
                commodityId: commodity.id,
                count: "-1"
            });
            if(response.status === 200){
                setInStock(response.data)
            }
        }
    }
    console.log(buylist)

    return (
        <div className="col-md-3 mb-4">
            <div className="card" onClick={handleOnClickCommodity} style={{width: width}}>                <div className="card-body">
                    <h4 className="card-title">{commodity.name}</h4>
                    <p className="card-subtitle mb-2 mt-1">
                        {inStock} left in stock
                    </p>
                    <img className="card-img" src={commodity.image} alt={commodity.name} />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h7 className="card-text">{commodity.price}$</h7>
                        {quantity > 0 && inStock > 0 ? (
                            <div className="counter">
                                <button className="counter-btn" id={`decrement`} onClick={handleDecrement}>-</button>
                                <div className="counter-value" id={`counter`}>{quantity}</div>
                                <button className="counter-btn" id={`increment`} onClick={handleIncrement}>+</button>
                            </div>
                        ) : quantity > 0 && inStock === 0 ? (
                                <div className="counter">
                                    <button className="counter-btn" id={`decrement`} onClick={handleDecrement}>-</button>
                                    <div className="counter-value" id={`counter`}>{quantity}</div>
                                    <button className="counter-btn" id={`increment`} disabled>+</button>
                                </div>
                        ) : quantity === 0 && inStock > 0 ? (
                            <button className="add-cart-btn" type="submit" onClick={handleAddToCart}>Add to Cart</button>
                        ) : (
                            <button className="add-cart-btn" type="submit" disabled>Add to Cart</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommodityCard;