import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

function CallbackPage({notify}) {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [doOnce, setDoOnce] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    async function doFetch(code) {
        setDoOnce(true);
        const response = await fetch('http://localhost:8080/api/auth/callback', {
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'},
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ "code": code })
        });
        const data = await response.json();
        console.log("XXX")
        console.log(data)
        console.log(data.status)
        if (data.Token != null) {
            notify("login using github successful!!")
            setDoOnce(false);
            localStorage.setItem('userData', data.Token)
            navigate("/")
        } else {
            notify("login using github failed!!")
            setDoOnce(false);
            navigate("/login")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('userData') === null) {
            setIsUserLoggedIn(false)
        } else {
            notify("You can't view this page when logged in")
            navigate('/')
        }
        let auth_code = searchParams.get("code")
        if (auth_code == null) {
            notify("There was a problem!")
            navigate('/login')
        }
        if (!doOnce) {
            doFetch(auth_code)
        }
    }, [])

    return (
        <div></div>
    );
}

export default CallbackPage;