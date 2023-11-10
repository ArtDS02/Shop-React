import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function Login() {
    const [data, setData] = useState({});
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://ircnv.id.vn:8080/v1/api/user/get", {
                    headers: {
                        token: token,
                    },
                });
                setData(response.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        console.log(data); // Sử dụng dữ liệu sau khi đã được cập nhật
    }, [data]);

    return (
        <div className="body-list">
            <div style={{backgroundColor:"#CCD1D1"}} className="main-content-list">
                <div style={{justifyContent:"space-between"}} className="control">
                    <a className="btn-back" href="/"><img src={require("~/component/img/previous.png")} alt="Logo" /></a>
                    <h2>Your Profile</h2>
                    <a></a>
                </div>
                <form>
                    <div className="control-profile">
                        <div className="show-box">
                            <label htmlFor="username">Username: </label>
                            <input className="input-show" type="text" id="username" name="username" value={data.fullname} readOnly /><br />
                        </div>
                        <div className="show-box">
                            <label htmlFor="email">Email: </label>
                            <input className="input-show" type="text" id="email" name="email" value={data.email} readOnly /><br />
                        </div>
                    </div>
                    <div className="control-profile">
                        <div className="show-box">
                            <label htmlFor="username">Address: </label>
                            <input className="input-show" type="text" id="address" name="address" value={data.address} readOnly /><br />
                        </div>
                        <div className="show-box">
                            <label htmlFor="email">Role: </label>
                            <input className="input-show" type="text" id="role" name="role" value={data.role} readOnly /><br />
                        </div>
                    </div>
                    <button className="btn" onClick={() => { window.location.href = '/#' }}>Edit profile</button><br />
                </form>
            </div>
        </div>
    );
}

export default Login;
