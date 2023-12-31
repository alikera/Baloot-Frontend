import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import '../css/commodity.css'
import '../css/normalize.css'
import { Modal } from 'react-bootstrap';
import userEvent from "@testing-library/user-event";
import Login from "../auth/login";
import {forEach} from "react-bootstrap/ElementChildren";
import CommodityCard from "../home/commodityCard";
import HiddenJs from "@mui/material/Hidden/HiddenJs";
import HomeHeader from "../home/homeHeader";
import commodityCard from "../home/commodityCard";

function CommodityInfo(props) {
    const navigate = useNavigate();
    const info = useState(props.commodity.info)
    const categories = useState(info[0].categories)
    const [quantity, setQuantity] = useState(0)
    const [rating, setRating] = useState(info[0].rating)
    const [countOfRatings, setCountOfRatings] = useState(info[0].countOfRatings)
    const [inStock, setInStock] = useState(info[0].inStock)
    const [providerId, setProviderId] = useState(info[0].providerId)

    useEffect( () => {
        console.log(props.commodity.buyList)
        console.log(info)
        if (props.commodity.buyList[info[0].id] !== undefined) {
            setQuantity(props.commodity.buyList[info[0].id])
        }
    }, [])

    async function handleAddToCart(event) {
        event.stopPropagation();
        setQuantity(1);

        props.increaseCart();
        const response = await axios.put(`http://localhost:8080/api/user/buyList/${props.username}`, {
            commodityId: info[0].id,
            count: "1"
        });
        if(response.status === 200) {
            setInStock(response.data)
        }
    }
    async function handleIncrement(event) {
        event.stopPropagation();
        if (info[0].inStock > 0) {
            setQuantity(quantity + 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${props.username}`, {
                commodityId: info[0].id,
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
                props.decreaseCart()
            }
            setQuantity(quantity - 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${props.username}`, {
                commodityId: info[0].id,
                count: "-1"
            });
            if(response.status === 200){
                setInStock(response.data)
            }
        }
    }

    function handleRatingChange(newRating) {
        setRating(newRating)
    }

    function handleCountOfRatingsChange(newCount) {
        setCountOfRatings(newCount)
    }
    console.log(categories)
    return (
        <>
            <div className="container">
                <div className="commodity-info row">
                    <div className="col-md-6">
                        <img className="img" src={info[0].image} alt={info[0].name}/>
                    </div>
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <h1 className="product-title">{info[0].name}</h1>
                            <div className="d-flex justify-content-between">
                                <h6 className="stock-left">{inStock} left in stock</h6>
                                <div className="d-flex">
                                    <img className="rating-image" src="/Star.png" alt="star"/>
                                        <h4 className="commodity-rate">{rating}</h4>
                                        <h6 className="ratings-count">({countOfRatings})</h6>
                                </div>
                            </div>

                            <h6>by <a href={`http://localhost:3000/provider/${providerId}`}>{props.commodity.providerName}</a></h6>
                            <h6 className="categories">Category(s)</h6>

                            <ul>
                                {categories[0].map((category, index) => (
                                    <li key={index}><h6>{category}</h6></li>
                                ))}
                            </ul>
                        </div>
                        <div className="priceAdd container-fluid d-flex justify-content-between">
                            <h4 className="price">${info[0].price}</h4>
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
                                <div></div>
                            )}
                            {/*{quantity > 0 ? info[0].inStock > 0 && (*/}
                            {/*    <div className="counter">*/}
                            {/*        <button className="counter-btn" id={`decrement`} onClick={handleDecrement}>-</button>*/}
                            {/*        <div className="counter-value" id={`counter`}>{quantity}</div>*/}
                            {/*        <button className="counter-btn" id={`increment`} onClick={handleIncrement}>+</button>*/}
                            {/*    </div>*/}
                            {/*) : info[0].inStock > 0 && (*/}
                            {/*    <div className="add-to-cart">*/}
                            {/*        <button className="add-btn" type="submit" onClick={handleAddToCart}>Add to Cart</button>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                        {<Rate username= {props.username}
                               id={info[0].id}
                               onRatingChange={handleRatingChange}
                               onCounOfRatingsChange={handleCountOfRatingsChange}/>}
                    </div>
                </div>
            </div>
        </>
    );
}

function Rate(props) {
    const [rating, setRating] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleStarClick = (value) => {
        // Set the rating to the clicked value
        setRating(value);
        setHoveredIndex(value); // Reset hovered index when clicked
    }

    const handleMouseEnter = (index) => {
        // Set the hovered index when mouse enters a star
        setHoveredIndex(index);
    }

    const handleMouseLeave = () => {
        // Reset the hovered index when mouse leaves the rating area
        if (rating == null) {
            setHoveredIndex(-1);
        }
    }

    async function handleSubmit(event) {
        if (rating != null) {
            event.preventDefault();
            const response = await axios.put(`http://localhost:8080/api/rate/${props.id}`, {
                username: props.username,
                rate: rating
            });
            if (response.status === 200) {
                console.log(response.data)
                props.onRatingChange(response.data.rating)
                props.onCounOfRatingsChange(response.data.count)
            }
        }
    }

    return (
        <div className="submit-rating container-fluid d-flex justify-content-between">
            <div className="starts">
                <h6>rate now</h6>
                <div
                    className="rating-stars"
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                >
                    {[...Array(10)].map((_, index) => (
                        <span
                            key={index}
                            className={`star ${
                                rating !== null && index < rating ? "yellow" : ""} ${
                                hoveredIndex !== null && index >= hoveredIndex ? "star-shadow" : ""
                            }`}
                            onClick={() => handleStarClick(index + 1)}
                            onMouseEnter={() => handleMouseEnter(index + 1)}
                            data-value={index + 1}
                        />
                    ))}
                </div>
            </div>
            <div className="submit-btn">
                <button type="submit" onClick={handleSubmit}>submit</button>
            </div>
        </div>
    );
}

function Comments(props) {
    const [comments, setComments] = useState(props.comments)
    const [count, setCount] = useState(props.comments.length)

    function handleCommentPost(newComment) {
        const commentsCopy = [...comments];

        commentsCopy.push(newComment);

        setComments(commentsCopy);
        setCount(count + 1)
    }

    return(
        <>
            <div className="comments">
                <div className="comments-header d-flex">
                    <h6 className="comments-word">Comments</h6>
                    <div className="comments-count">({count})</div>
                </div>
                {comments.map((comment, index) => (
                    <div className="comment">
                        <div className="row">
                            <div className="col-md-6">
                                <h5>{comment.text}</h5>
                                <div className="left-sec-comment d-flex justify-content-between">
                                    <div>
                                        {comment.date}
                                    </div>
                                    <ul>
                                        <li></li>
                                    </ul>
                                    <div className="comment-username">
                                        {comment.userEmail}
                                    </div>
                                </div>
                            </div>
                            {<Vote username={props.username}
                                   likes={comment.likes}
                                   dislikes={comment.dislikes}
                                   commentId={comment.id} id={props.id}/>}
                        </div>
                    </div>
                ))}

                {<PostComment username={props.username}
                              id={props.id}
                              onPostClicked={handleCommentPost}/>}
            </div>
        </>
    );
}

function Vote(props) {
    const [likes, setLikes] = useState(props.likes)
    const [dislikes, setDislikes] = useState(props.dislikes)
    async function handleThumbsUpClick(event) {
        event.preventDefault();
        const response = await axios.put(`http://localhost:8080/api/comment/vote/${props.id}`, {
            username: props.username,
            commentId: props.commentId,
            vote: "1"
        });
        if (response.status === 200) {
            if (response.data === 1) {
                setLikes(likes + 1)
            }
            else if (response.data === -1) {
                setLikes(likes + 1)
                setDislikes(dislikes - 1)
            }
        }
    }

    async function handleThumbsDownClick(event) {
        event.preventDefault();
        const response = await axios.put(`http://localhost:8080/api/comment/vote/${props.id}`, {
            username: props.username,
            commentId: props.commentId,
            vote: "-1"
        });
        if (response.status === 200) {
            if (response.data === 1) {
                setDislikes(dislikes + 1)
            }
            else if (response.data === -1) {
                setDislikes(dislikes + 1)
                setLikes(likes - 1)
            }
        }
    }

    return (
        <>
            <div className="col-md-6">
                <div className="right-sec-comment d-flex justify-content-between">
                    <div className="like-comment-text">
                        Is this comment helpful?
                    </div>
                    <div className="like d-flex justify-content-between">
                        <div className="like-count">
                            {likes}
                        </div>
                        <div>
                            <img className="img" src="/thumbs-up.png" alt="Logo" onClick={handleThumbsUpClick}/>
                        </div>
                    </div>
                    <div className="dislike d-flex justify-content-between">
                        <div className="like-count">
                            {dislikes}
                        </div>
                        <div>
                            <img className="img" src="/thumbs-down.png" onClick={handleThumbsDownClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PostComment(props) {
    const navigate = useNavigate()
    const [comment, setComment] = useState('')

    async function handlePost(event) {
        event.preventDefault();
        const response = await axios.post(`http://localhost:8080/api/comment/post/${props.id}`, {
            username: props.username,
            text: comment
        });

        if (response.status === 200) {
            props.onPostClicked(response.data)
        } else {
        }
    }

    return (
        <div className="submit-comment">
            <div className="row">
                <div className="col-md-6">
                    <h6>Submit your opinion</h6>
                </div>
            </div>
            <div className="input-comment">
                <input type="text"
                       placeholder="Your Comment"
                       value={comment}
                       onChange={(event) => setComment(event.target.value)}
                       required/>
                <button className="post-btn" onClick={handlePost}>
                    Post
                </button>
            </div>
        </div>
    );
}

function SuggestedCommodities(props) {
    const commodities = useState(props.suggested)
    const buyList = props.commodity.buyList
    return (
        <>
            <h4 className="suggestions-title">You also might like...</h4>
            <div className="card-group mt-4">
                {commodities[0].map((item, index) => (
                    <CommodityCard key={index}
                                   width={"90%"}
                                   commodity={item}
                                   handleIncreaseCartCount={props.increaseCart}
                                   handleDecreaseCartCount={props.decreaseCart}
                                   buylist={buyList}
                                   username={props.username}
                    />))}
                    {/*<div className="card">*/}
                    {/*    <div className="card-body">*/}
                    {/*        <a className="card-title" href="#">*/}
                    {/*            <h5>{item.name}</h5>*/}
                    {/*        </a>*/}
                    {/*        <p className="stock-left">{item.inStock} left in stock</p>*/}
                    {/*    </div>*/}
                    {/*    <img src={item.image} className="card-img-top" alt={item.name}/>*/}
                    {/*    <div className="priceAdd d-flex justify-content-between align-items-center mt-3">*/}
                    {/*        <h5 className="suggest-price">{item.price}$</h5>*/}
                    {/*        <button type="submit" className="add-btn">add to cart</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
            </div>
        </>
    );
}

function Commodity() {
    const [commodity, setCommodity] = useState('')
    const [suggested, setSuggested] = useState('')
    const [comments, setComments] = useState('')
    const [username, setUsername] = useState('')
    const [cartCount, setCartCount]= useState(0);

    const navigate = useNavigate();
    const id = useParams()
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
        }
        else {
            setUsername(JSON.parse(atob(userData)).userId);
            document.title = 'Commodity';
        }
    }, []);


    useEffect( () => {

        if (username !== '') {
            axios.get(`http://localhost:8080/api/commodity/${id.id}/${username}`).then((response) => {
                console.log(response.data)
                setCommodity(response.data);
                setSuggested(response.data.suggested);
                setCartCount(response.data.cartCount)
            });
        }
    }, [username])

    function increaseCartCount() {
        setCartCount(cartCount + 1)
    }

    function decreaseCartCount() {
        setCartCount(cartCount - 1)
    }
    console.log(commodity)

    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="/">
                            <img className="logo" src="/Logo.png" alt="Logo"/>
                        </a>
                        <div className="info-container-fluid d-flex justify-content-between">
                            <a href={`http://localhost:3000/user/${username}`}>
                                <div className="username">#{username}</div>
                            </a>
                            <a href={`http://localhost:3000/user/${username}`}>
                                <div className={`cart-container d-flex ${cartCount === 0 ? 'cart-container-zero' : 'cart-container'}`}>
                                    <div className="cart">
                                        Cart
                                    </div>
                                    <div className="cartNum">
                                        {cartCount}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {commodity && <CommodityInfo commodity={commodity}
                                         username={username}
                                         increaseCart={increaseCartCount}
                                         decreaseCart={decreaseCartCount}/>}
            {commodity && <Comments username = {username}
                                    comments={commodity.comments}
                                    id={commodity.info.id}/>}
            {suggested.length > 0 && <SuggestedCommodities suggested={suggested}
                                                           commodity={commodity}
                                                           username={username}
                                                           increaseCart={increaseCartCount}
                                                           decreaseCart={decreaseCartCount}/>}
            <footer className="position-relative">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            2023 @UT
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Commodity;