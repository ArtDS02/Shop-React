import React, { useState, useEffect } from 'react';
import { GetCookie } from '~/common/saveCookie';
import HeadPopup from './headPopup.js';
import CategoryPopup from './categoryPopup.js';


const Header = () => {
    const [cookie, setCookie] = useState(false);

    useEffect(() => {
        if (GetCookie('token') != null) {
            setCookie(true);
        } else {
            // window.location.href = "/login";
            setCookie(false);
        }
    }, []);


    return (
        <header>
            <div className='header'>
                <div className='page-name'>
                    <a style={{margin:"1% auto"}} href='/'><img src={require("~/component/img/logo.png")} alt="Logo" /></a>
                    <h3 style={{height:"100%", margin: "5% auto"}}>[Shop name]</h3>
                </div>
                <div className='menu'>
                    <a className='option' href="/">Home</a>
                    {/* <a className='option' href="/category">Category</a> */}
                    <CategoryPopup></CategoryPopup>
                    {cookie ? (
                        <HeadPopup></HeadPopup>
                    ) : (
                        <a className='option' href="/login">Login</a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
