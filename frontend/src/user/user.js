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
    const userData = localStorage.getItem('userData');
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
            window.location.href("google.com");
        }
    }

    function handleLogout() {
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/login');
        }
    },[])

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
                              <button className="btn-logout" type="button" onClick={handleLogout}>
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
              <Modal show={showModal} onHide={toggleModal} className="centered-modal">
                  <Modal.Header closeButton>
                      <Modal.Title>Add Credit</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      Are you sure you want to add {credit}$ to your account
                  </Modal.Body>
                  <Modal.Footer>
                      <p className="close-btn" variant="secondary" onClick={toggleModal}>
                          close
                      </p>
                      <button className="confirm-btn" variant="primary" onClick={handleConfirm}>
                          Confirm!
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
    const [inStock, setInStock] = useState('')

    useEffect(() => {
        let sum = 0;
        buyList.forEach((item) => {
            sum += item.info.price * item.quantity;
        });
        setTotalCost(sum);
    }, [buyList]);


    function toggleModal() {
        if (showModal) {
            setDiscountValue(0)
            setDiscountCode('')
        }
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

        const requestBody = { keys, values };
        const response = await axios.post(`http://localhost:8080/api/user/pay/${props.username}?discountCode=${discountCode}&discountValue=${discountValue}`,requestBody);

        if (response.status === 200) {
            window.location.reload();
        } else {
        }
    }

    async function handleApplyDiscount(event) {
        event.preventDefault();
        const response = await axios.get(`http://localhost:8080/api/user/discount?code=${discountCode}`);

        if (response.status === 200) {
            setDiscountValue(response.data);
        } else {

        }
    }

    function handleIncrement(index) {
        const updatedList = [...buyList];
        updatedList[index].quantity += 1;
        setBuyList(updatedList);
    }

    function handleDecrement(index) {
        const updatedList = [...buyList];
        if (updatedList[index].quantity > 1) {
            updatedList[index].quantity -= 1;
            setBuyList(updatedList);
        }
        else if (updatedList[index].quantity == 1) {
            updatedList[index].quantity -= 1;
            setBuyList(updatedList);
        }
    }

    function handleRemove(index) {
        const updatedList = [...buyList];
        updatedList.splice(index, 1);
        setBuyList(updatedList);
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
                    {buyList.length > 0 && (buyList.map((item, index) => (
                        <TableRow index={index}
                                  username={props.username}
                                  commodity={item}
                                  handleInc={handleIncrement}
                                  handleDec={handleDecrement}
                                  handleRemove={handleRemove}/>
                    )))}
                </table>
                {buyList.length === 0 && (<div className="empty-cart">
                    your cart is empty
                </div>)}
                <form onSubmit={handlePay}>
                    <div className="text-center">
                        <button className="pay-btn">Pay Now!</button>
                    </div>
                </form>
                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {buyList.map((item, index) => (
                            <div className="item-info d-flex justify-content-between">
                                <li className="item-name">{item.info.name} x{item.quantity}</li>
                                <div className="item-price">{item.quantity * item.info.price}$</div>
                            </div>
                        ))}
                        <div className="apply-discount d-flex justify-content-between">
                            <div>
                                <input type="text"
                                       placeholder="Code"
                                       value={discountCode}
                                       id="discount-code"
                                       onChange={(event) => setDiscountCode(event.target.value)}
                                       required/>
                            </div>
                            <button onClick={handleApplyDiscount}>
                                Submit
                            </button>
                        </div>
                        <div className={`${discountValue !== 0 ? 'total-cost-discount d-flex justify-content-between' : 'total-cost d-flex justify-content-between'}`}>
                            <p>
                                total
                            </p>
                            <p>
                                ${totalCost}
                            </p>
                        </div>
                        { discountValue !== 0 && (
                            <div className="total-cost d-flex justify-content-between">
                                <p>
                                    with discount
                                </p>
                                <p>
                                    ${totalCost * (1 - discountValue)}
                                </p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <p className="close-btn" variant="secondary" onClick={toggleModal}>
                            close
                        </p>
                        <button className="confirm-btn" variant="primary" onClick={handleBuy}>
                            Buy!
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    );
}

function TableRow(props) {
    const item = useState(props.commodity)
    const [inStock, setInStock] = useState(item[0].info.inStock)
    const [quantity, setQuantity] = useState(item[0].quantity)
    console.log(item[0])
    async function handleIncrement(event) {
        event.stopPropagation();
        if (inStock > 0) {
            setQuantity(quantity + 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${props.username}`, {
                commodityId: item[0].info.id,
                count: "1"
            });
            if(response.status === 200){
                setInStock(response.data)
            }
        }
        props.handleInc(props.index)
    }

    async function handleDecrement(event) {
        event.stopPropagation();
        if (quantity > 0) {
            if (quantity === 1) {
                props.handleRemove(props.index)
            }
            setQuantity(quantity - 1);
            const response = await axios.put(`http://localhost:8080/api/user/buyList/${props.username}`, {
                commodityId: item[0].info.id,
                count: "-1"
            });
            if(response.status === 200){
                setInStock(response.data)
            }
        }
        props.handleDec(props.index)
    }

    return (
        <>
            <tbody className="table-body">
            <tr>
                <th scope="row" className="text-center">
                    <a href={`/commodity/${item[0].info.id}`}>
                        <img className="buy-list-img" src={item[0].info.image} alt={item[0].info.name} />
                    </a>
                </th>
                <td className="align-middle">{item[0].info.name}</td>
                <td className="align-middle">{item[0].info.categories.join(", ")}</td>
                <td className="align-middle">${item[0].info.price}</td>
                <td className="align-middle">{item[0].info.providerId}</td>
                <td className="rating align-middle">{item[0].info.rating}</td>
                <td className="in-stock align-middle">{inStock}</td>
                <td className="align-middle">
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
                        ) : (<div></div>)
                    }
                    {/*<div className="counter">*/}
                    {/*    */}
                    {/*    <button className="counter-btn" id={`decrement`} onClick={() => handleDecrement(index)}>-</button>*/}
                    {/*    <div className="counter-value" id={`counter`}>{quantity}</div>*/}
                    {/*    <button className="counter-btn" id={`increment`} onClick={() => handleIncrement(index)}>+</button>*/}
                    {/*</div>*/}
                </td>
            </tr>
            </tbody>
        </>
    )
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
                    {props.purchasedList.length > 0 && (props.purchasedList.map((item) => (
                        <tbody className="table-body">
                        <tr>
                            <th scope="row" className="text-center">
                                <a href={`/commodity/${item.info.id}`}>
                                    <img className="buy-list-img" src={item.info.image} alt={item.info.name} />
                                </a>
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
                    )))}
                </table>
                {props.purchasedList.length === 0 && (
                    <div className="empty-cart">
                        your history cart  is empty
                    </div>
                )}
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

    const { username } = useParams()
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
                console.log(buyList)
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