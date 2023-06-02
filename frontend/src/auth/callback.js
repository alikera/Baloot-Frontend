import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

function CallbackPage({notify}) {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [doOnce, setDoOnce] = useState(false);
    const isMountedRef = useRef(false);

    async function doFetch(code) {
        setDoOnce(true);
        const response = await fetch('http://localhost:8080/api/auth/callback', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            body: JSON.stringify({ "code": code })
        });
        const data = await response.json();

        if (data.token != null) {
            notify("login using github successful!!");
            localStorage.setItem('token', data.token);
            navigate("/");
        } else {
            notify("login using github failed!!");
            navigate("/login");
        }
    }

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }
        if (localStorage.getItem('token') === null) {
            setIsUserLoggedIn(false);
        } else {
            notify("You can't view this page when logged in");
            navigate('/');
        }
        let auth_code = searchParams.get("code");
        if (auth_code == null) {
            notify("There was a problem!");
            navigate('/login');
        }
        console.log(doOnce);
        if (!doOnce) {
            console.log(doOnce);
            setDoOnce(true);
            doFetch(auth_code);
        }
    }, [doOnce, navigate, notify, searchParams]);

    return (
        <div></div>
    );
}

export default CallbackPage;