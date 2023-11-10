import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            userData: null,
        };
    }

    async componentDidMount() {
        // Lấy token từ cookie
        const token = Cookies.get('token');

        if (!token) {
            // Xử lý khi không có token
            // window.location.href = "/login";
        } else {
            try {
                // Gửi yêu cầu API và lấy dữ liệu người dùng
                const response = await axios.get("http://ircnv.id.vn:8080/v1/api/user/get", {
                    headers: {
                        token: token,
                    },
                });

                // Cập nhật trạng thái với dữ liệu người dùng
                this.setState({ userData: response.data.user });
            } catch (error) {
                // Xử lý lỗi khi gọi API không thành công
                console.error("Error fetching user data:", error);
                // window.location.href = "/login";
            }
        }
    }

    handleMouseOver = () => {
        this.setState({ isHovered: true });
    }

    handleMouseLeave = () => {
        this.setState({ isHovered: false });
    }

    logoutEffect = () => {
        Cookies.remove('token');
        window.location.reload();
    };
    

    render() {
        return (
            <a
                className='option'
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.state.userData ? (
                    <a style={{textDecoration:"none",color:"black"}} href="/">{this.state.userData.fullname}</a>
                ) : "Loading..."}
                {this.state.isHovered && (
                    <div className='head-popup'>
                        <a className='head-option' href="/profile" >Profile</a><br></br>
                        <a className='head-option' onClick={this.logoutEffect}>Logout</a><br></br>
                    </div>
                )}
            </a>
        );
    }
}

export default MyComponent;
