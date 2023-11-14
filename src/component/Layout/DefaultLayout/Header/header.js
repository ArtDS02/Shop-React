import React, { useState, useEffect } from 'react';
import { GetCookie } from '~/common/saveCookie';
import HeadPopup from './headPopup.js';
import CategoryPopup from './categoryPopup.js';
import Cookies from 'js-cookie';
import axios from 'axios';

const Header = () => {
    const [cookie, setCookie] = useState(false);

    useEffect(() => {
        if (GetCookie('token') != null) {
            setCookie(true);
        } else {
            setCookie(false);
        }
    }, []);

    const handleClickCartCard = () =>{
        console.log("da click roi");
        const token = Cookies.get('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://ircnv.id.vn:8080/v1/api/user/get", {
                    headers: {
                        token: token,
                    },
                });
                console.log(response.data.user.userid);
                Cookies.set('userId', response.data.user.userid)
                window.location.href = "/cart";
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        
    }


    return (
        <header>
            <div className='header'>
                <div className='page-name'>
                    <a style={{margin:"3% 0 0 0"}} href='/'><img src={require("~/component/img/logo.png")} alt="Logo" /></a>
                    <h3 style={{height:"100%", margin: "6% auto", color:"white"}}>[Shop name]</h3>
                </div>
                <div className='menu'>
                    <a className='option' href="/">Home</a>
                    <CategoryPopup></CategoryPopup>
                    {cookie ? (
                        <HeadPopup></HeadPopup>
                    ) : (
                        <a className='option' href="/login">Login</a>
                    )}
                    <a className='option-cart' onClick={() => handleClickCartCard()}><img src={require("~/component/img/cart.png")} alt="Logo" /></a>
                </div>
            </div>
        </header>
    );
};

export default Header;
