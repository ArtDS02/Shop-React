import React from 'react'
import { useState } from 'react';
import { AuthenSignUp } from '~/api/authen/AuthenSignUpApi'
import { SaveCookie, GetCookie } from '~/common/saveCookie';

function Input({ label, ...inputProps }) {
    return (
        <React.Fragment>
            <label ><b>{label}</b></label>
            <input {...inputProps}></input>
        </React.Fragment>
    )
}

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        address: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    async function handleSubmit(e) {
        e.preventDefault()
        await AuthenSignUp(formData).
            then(data => {
                console.log(data)
                if (data.users) {
                    SaveCookie('token', data.users.token)
                    window.location.href = "/";
                }
            }).
            catch(err => {
                alert(err)
                console.log("err: " + err);
            })
    };


    return (
        <form id="frm-sign-up" action="/authen/signup" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="body-list">
                <div className="main-content-list">
                    <div className="control">
                        <Input
                            className="input-box"
                            name="fullname" type="text"
                            placeholder="Enter Full Name..." required
                            value={formData.fullname}
                            onChange={handleInputChange}
                        ></Input>
                    </div>
                    <div className="control">
                        <Input
                            className="input-box"
                            name="email" type="text"
                            placeholder="Enter Email..." required
                            value={formData.email}
                            onChange={handleInputChange}
                        ></Input>
                    </div>
                    <div className="control">
                        <Input
                            className="input-box"
                            name="password" type="password"
                            placeholder="Enter Password..." required
                            value={formData.password}
                            onChange={handleInputChange}
                        ></Input>
                    </div>
                    <div className="control">
                        <Input
                            className="input-box"
                            name="address" type="text"
                            placeholder="Enter Address..." required
                            value={formData.address}
                            onChange={handleInputChange}
                        ></Input>
                    </div>
                    <div className="control">
                        <button className="btn" type="submit" id="submit-sign-up-form">Sign Up</button>
                        <label className="forget">
                            <input type="checkbox" name="remember" /> Remember me
                        </label>
                        <div className="ms-auto me-0">
                            <p className="text-danger"></p>
                        </div>
                    </div>
                    <div className="not-sign-up">
                        <span className=""><a className="choice" href="/login">You already have an account?</a></span>
                        <span className=""><a className="choice" href="#"> Forgot password?</a></span>
                    </div>
                </div>
            </div>
        </form>
    )
}
