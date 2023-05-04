import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import '../css/user.css'
import '../css/normalize.css'
import { Modal } from 'react-bootstrap';
import userEvent from "@testing-library/user-event";
import Login from "../auth/login";
import {forEach} from "react-bootstrap/ElementChildren";

function UserInfo(props) {
    const navigate = useNavigate();
    const [credit, setCredit] = useState('')

    const [showModal, setShowModal] = useState(false);
    function toggleModal() {
        setShowModal(!showModal);
    }

    async function handleAdd(event) {
        event.preventDefault();
        toggleModal();
    }
    async function handleConfirm(event) {
        event.preventDefault();
        const response = await axios.post("http://localhost:8080/api/user/addCredit/" + props.user.username + "?credit=" + credit);

        if (response.status === 200) {
            window.location.reload();
        } else {
            console.log("WRONG");
            window.location.href("google.com");
        }
    }
    return (
      <>
          <div className="user-details">
              <div className="row">
                  <div className="user-info col-md-6">
                      <div className="container-fluid d-flex">
                          <img className="username-img" src="/username.png" alt="user"/>
                              <div className="username-text">{props.user.username}</div>
                      </div>
                      <div className="container-fluid d-flex">
                          <img className="username-img" src="/mail.png" alt="mail"/>
                              <div className="username-text">{props.user.email}</div>
                      </div>
                      <div className="container-fluid d-flex">
                          <img className="username-img" src="/calender.png" alt="calender"/>
                              <div className="username-text">{props.user.birthDate}</div>
                      </div>
                      <div className="container-fluid d-flex">
                          <img className="username-img" src="/location.png" alt="location"/>
                              <div className="username-text">{props.user.address}</div>
                      </div>
                      <div className="logout-div">
                          <a href="/login">
                              <button className="btn-logout" type="button">
                                  logout
                              </button>
                          </a>
                      </div>
                  </div>
                  <div className="user-credit col-md-6">
                      <form onSubmit={handleAdd}>
                          <div className="add-credit ">
                              <h2 className="credit-amount">${props.user.credit}</h2>
                              <input
                                  type="number"
                                  min="0"
                                  step="any"
                                  className="text-center"
                                  placeholder="$Amount"
                                  required
                                  value={credit}
                                  onChange={(event) => setCredit(event.target.value)}
                              />
                          </div>
                          <button className="add-credit-btn">Add More Credit</button>
                      </form>
                  </div>
              </div>
              <Modal show={showModal} onHide={toggleModal}>
                  <Modal.Header closeButton>
                      <Modal.Title>Confirm Credit Addition</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Are you sure you want to add {credit} credits?
                  </Modal.Body>
                  <Modal.Footer>
                      <button variant="secondary" onClick={toggleModal}>
                          Cancel
                      </button>
                      <button variant="primary" onClick={handleConfirm}>
                          Confirm
                      </button>
                  </Modal.Footer>
              </Modal>
          </div>
      </>
    );
}

function UserCartDetails(props) {
    const navigate = useNavigate();
    const [buyList, setBuyList] = useState(props.buyList);
    const [totalCost, setTotalCost] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let sum = 0;
        buyList.forEach((item) => {
            sum += item.info.price * item.quantity;
        });
        setTotalCost(sum);
    }, [buyList]);


    function toggleModal() {
        setShowModal(!showModal);
    }

    async function handlePay(event) {
        event.preventDefault();
        toggleModal();
    }

    async function handleBuy(event) {
        event.preventDefault();
        let keys = buyList.map((item) => item.info.id.toString());
        let values = buyList.map((item) => item.quantity.toString());
        console.log(keys);
        console.log(values);
        const requestBody = { keys, values };
        const response = await axios.post(`http://localhost:8080/api/user/pay/${props.username}?discountCode=${discountCode}&discountValue=${discountValue}`,requestBody);

        if (response.status === 200) {
            window.location.reload();
        } else {
            console.log(response.data);
            console.log("WROOOOOOOOOOOOOOONG");
        }
    }

    async function handleApplyDiscount(event) {
        event.preventDefault();
        const response = await axios.get(`http://localhost:8080/api/user/discount?code=${discountCode}`);

        if (response.status === 200) {
            setDiscountValue(response.data);
        } else {
            console.log(response.data);
            console.log("WROOOOOOOOOOOOOOONG");
        }
    }

    function handleIncrement(index) {
        const updatedList = [...buyList];
        updatedList[index].quantity += 1;
        setBuyList(updatedList);
    }

    function handleDecrement(index) {
        const updatedList = [...buyList];
        if (updatedList[index].quantity > 0) {
            updatedList[index].quantity -= 1;
            setBuyList(updatedList);
        }
    }

    return(
        <>
            <div className="cart-details-container">
                <div className="row">
                    <div className="container-fluid d-flex">
                        <img className="cart-img" src="/cart.png" alt="cart"/>
                            <div className="cart-text">Cart</div>
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col" className="text-center">Image</th>
                        <th scope="col" className="text-center">Name</th>
                        <th scope="col" className="text-center">Categories</th>
                        <th scope="col" className="text-center">Price</th>
                        <th scope="col" className="text-center">Provider ID</th>
                        <th scope="col" className="text-center">Rating</th>
                        <th scope="col" className="text-center">In Stock</th>
                        <th scope="col" className="text-center">In Cart</th>
                    </tr>
                    </thead>
                    {buyList.map((item, index) => (
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
                            <td className="align-middle">
                                <div className="counter">
                                    <button className="counter-btn" id={`decrement`} onClick={() => handleDecrement(index)}>-</button>
                                    <div className="counter-value" id={`counter`}>{item.quantity}</div>
                                    <button className="counter-btn" id={`increment`} onClick={() => handleIncrement(index)}>+</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        ))}
                </table>
                <form onSubmit={handlePay}>
                    <div className="text-center">
                        <button className="pay-btn">Pay Now!</button>
                    </div>
                </form>
                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Buy Addition</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Total Cost: ${totalCost}
                        <br />
                        Discount: {discountValue * 100}%
                        <br />
                        Must Pay: ${totalCost * (1-discountValue)}
                        <br />
                        <input type="text"
                               placeholder="Discount Code"
                               value={discountCode}
                               id="discount-code"
                               onChange={(event) => setDiscountCode(event.target.value)}
                               required/>
                        <button variant="primary" onClick={handleApplyDiscount}>
                            Apply Discount
                        </button>
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={toggleModal}>
                            Cancel
                        </button>
                        <button variant="primary" onClick={handleBuy}>
                            Buy
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
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

function User() {
    useEffect(() => {
        document.title = 'User';
        return () => {
        };
    }, []);
    const [user, setUser] = useState('')
    const [buyList, setBuyList] = useState('')
    const [purchasedList, setPurchasedList] = useState('')

    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get('username');
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (username) {
            axios.get("http://localhost:8080/api/user/" + username).then((responseUser) => {
                setUser(responseUser.data);
            });
        }
    }, []);
    useEffect(() => {
        if (username) {
            axios.get("http://localhost:8080/api/user/buyList/" + username).then((responseBuyListList) => {
                setBuyList(responseBuyListList.data);
            });
        }
    }, []);
    useEffect(() => {
        if (username) {
            axios.get("http://localhost:8080/api/user/purchasedList/" + username).then((responsePurchasedList) => {
                setPurchasedList(responsePurchasedList.data);
            });
        }
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
                            <div className="username">#{user.username}</div>
                            <div className={`cart-container d-flex ${buyList.length === 0 ? 'cart-container-zero' : 'cart-container'}`}>
                                <div className="cart">
                                    Cart
                                </div>
                                <div className="cartNum">
                                    {buyList.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {user && <UserInfo user={user}/>}
            {buyList && <UserCartDetails username={username} user={user} buyList={buyList}/>}
            {purchasedList && <UserHistoryDetails purchasedList={purchasedList}/>}
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

export default User;