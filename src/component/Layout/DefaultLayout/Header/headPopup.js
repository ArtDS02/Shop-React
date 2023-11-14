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
        const token = Cookies.get('token');

        if (!token) {
        } else {
            try {
                const response = await axios.get("http://ircnv.id.vn:8080/v1/api/user/get", {
                    headers: {
                        token: token,
                    },
                });
                this.setState({ userData: response.data.user });
            } catch (error) {
                console.error("Error fetching user data:", error);
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

    truncateDisplayName(fullname) {
        if (fullname.length > 10) {
            const words = fullname.split(" ");
            if (words.length > 1 && words[words.length - 1].length > 10) {
                return words[words.length - 1].substring(0, 6) + "...";
            } else {
                return words[words.length - 1];
            }
        } else {
            return fullname;
        }
    }

    render() {
        const displayName = this.state.userData ? this.truncateDisplayName(this.state.userData.fullname) : "Loading...";
    
        return (
            <a
                className='option'
                onMouseOver={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.state.userData ? (
                    <a style={{ textDecoration: "none", color: "white" }} href="/">{displayName}</a>
                ) : "Loading..."}
                {this.state.isHovered && (
                    <div className='head-popup'>
                        <div style={{ borderBottom: "0px none" }} className='dropdown-content'>
                            <a style={{ textDecoration: "none", color: "black", fontSize: "16px" }} href="/profile">Profile</a><br></br>
                        </div>
                        <div style={{ borderBottom: "0px none" }} className='dropdown-content'>
                            <a style={{ textDecoration: "none", color: "black", fontSize: "16px" }} onClick={this.logoutEffect}>Logout</a><br></br>
                        </div>
                    </div>
                )}
            </a>
        );
    }
}

export default MyComponent;
