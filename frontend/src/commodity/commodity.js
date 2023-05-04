import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import '../css/commodity.css'
import '../css/normalize.css'
import { Modal } from 'react-bootstrap';
import userEvent from "@testing-library/user-event";
import Login from "../auth/login";
import {forEach} from "react-bootstrap/ElementChildren";

function CommodityInfo(props) {
    const navigate = useNavigate();
    const [credit, setCredit] = useState('')
    const info = useState(props.commodity.info)
    const categories = useState(info[0].categories);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img className="img" src="/product.png" alt="Logo"/>
                    </div>
                    <div className="col-md-6">
                        <div className="container-fluid">
                            <h1 className="product-title">{info[0].name}</h1>
                            <div className="d-flex justify-content-between">
                                <h6 className="stock-left">{info[0].inStock} left in stock</h6>
                                <div className="d-flex">
                                    <img className="rating-image" src="/Star.png" alt="star"/>
                                        <h4 className="commodity-rate">{info[0].rating}</h4>
                                        <h6 className="ratings-count">({info[0].countOfRatings})</h6>
                                </div>
                            </div>

                            <h6>by <a href="#">{props.commodity.providerName}</a></h6>
                            <h6 className="categories">Category(s)</h6>
                            <ul>
                                {categories.slice(0, -1).map((category, index) => (
                                    <li key={index}><h6>{category}</h6></li>
                                ))}
                            </ul>
                        </div>
                        <div className="priceAdd container-fluid d-flex justify-content-between">
                            <h4 className="price">${info[0].price}</h4>
                            <div className="add-to-card">
                                <button className="add-btn" type="submit">add to card</button>
                            </div>
                        </div>
                        <div className="submit-rating container-fluid d-flex justify-content-between">
                            <div className="starts">
                                <h6>rate now</h6>
                                <div className="rating-stars">
                                    <span className="star" data-value="1"></span>
                                    <span className="star" data-value="2"></span>
                                    <span className="star" data-value="3"></span>
                                    <span className="star" data-value="4"></span>
                                    <span className="star" data-value="5"></span>
                                    <span className="star" data-value="6"></span>
                                    <span className="star" data-value="7"></span>
                                    <span className="star" data-value="8"></span>
                                    <span className="star" data-value="9"></span>
                                    <span className="star" data-value="10"></span>
                                </div>
                            </div>
                            <div className="submit-btn">
                                <button type="submit">submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

function Comments(props) {
    const comments = useState(props.comments)
    console.log(comments[0])
    return(
        <>
            <div className="comments">
                <div className="comments-header d-flex">
                    <h6 className="comments-word">Comments</h6>
                    <div className="comments-count">({comments[0].length})</div>
                </div>
                {comments[0].map((comment, index) => (
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
                            <div className="col-md-6">
                                <div className="right-sec-comment d-flex justify-content-between">
                                    <div className="like-comment-text">
                                        Is this comment helpful?
                                    </div>
                                    <div className="like d-flex justify-content-between">
                                        <div className="like-count">
                                            {comment.likes}
                                        </div>
                                        <div>
                                            <a className="" href="#">
                                                <img className="img" src="/thumbs-up.png" alt="Logo"/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="dislike d-flex justify-content-between">
                                        <div className="like-count">
                                            {comment.dislikes}
                                        </div>
                                        <div>
                                            <a className="" href="#">
                                                <img className="img" src="/thumbs-down.png" alt="Logo"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {<PostComment/>}
            </div>
        </>
    );
}

function PostComment() {
    return (
        <div className="submit-comment">
            <div className="row">
                <div className="col-md-6">
                    <h6>Submit your opinion</h6>
                </div>
            </div>
            <div className="input-comment">
                <input type="text"/>
                <button className="post-btn">Post</button>
            </div>
        </div>
    );
}

function UserHistoryDetails(props) {
    return (
        <>
            <div className="history-details-container">
                <div className="row">
                    <div className="container-fluid d-flex">
                        <img className="cart-img" src="/history.png" alt="cart"/>
                        <div className="cart-text">History</div>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead className="table-head">
                    <tr>
                        <th scope="col" className="text-center">Image</th>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Categories</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Provider ID</th>
                        <th scope="col" className="text-center">Rating</th>
                        <th scope="col" className="text-center">In Stock</th>
                        <th scope="col" className="text-center">Quantity</th>
                    </tr>
                    </thead>
                    {props.purchasedList.map((item) => (
                        <tbody className="table-body">
                        <tr>
                            <th scope="row" className="text-center">
                                <img className="buy-list-img" src="{item.image}" alt="image" />
                            </th>
                            <td className="align-middle">{item.info.name}</td>
                            <td className="align-middle">{item.info.categories.join(", ")}</td>
                            <td className="align-middle">${item.info.price}</td>
                            <td className="align-middle">{item.info.providerId}</td>
                            <td className="rating align-middle">{item.info.rating}</td>
                            <td className="in-stock align-middle">{item.info.inStock}</td>
                            <td className="align-middle">{item.quantity}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    );
}

function Commodity() {
    const id = useParams()
    useEffect(() => {
        document.title = 'Commodity';
        return () => {
        };
    }, []);
    const [commodity, setCommodity] = useState('')
    const [comments, setComments] = useState('')
    const [buyList, setBuyList] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/commodity/${id.id}`).then((response) => {
            setCommodity(response.data);
        });
    }, []);

    return (
        <>
            <header className="header-container">
                <nav className="navbar">
                    <div className="container-fluid d-flex justify-content-between">
                        <a className="navbar-brand" href="/">
                            <img className="logo" src="/Logo.png" alt="Logo"/>
                        </a>
                        <div className="info-container-fluid d-flex justify-content-between">
                            <div className="username">#username</div>
                            <div className={`cart-container d-flex ${buyList.length === 0 ? 'cart-container-zero' : 'cart-container'}`}>
                                <div className="cart">
                                    Cart
                                </div>
                                <div className="cartNum">
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {commodity && <CommodityInfo commodity={commodity}/>}
            {commodity && <Comments comments={commodity.comments}/>}
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