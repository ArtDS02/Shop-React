import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { GetCookie } from '~/common/saveCookie';

function Cart() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);

    const token = Cookies.get('token');

    useEffect(() => {
        if (token != null) {
            const userId = Cookies.get('userId');
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://ircnv.id.vn:8080/v1/api/cart/${userId}`, {
                        headers: {
                            token: token,
                        },
                    });
                    setData(response.data.cart);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        } else {
            window.location.href = "/login";
        }
    }, [token]);

    const handleClickProductCard = (item) => {
        console.log("Clicked product:", item);
    };

    const handleSelectProductCard = (item) => {
        const isSelected = selectedItems.some(selectedItem => selectedItem.productid === item.productid);

        if (isSelected) {
            // Deselect
            setSelectedItems(prevItems => prevItems.filter(selectedItem => selectedItem.productid !== item.productid));
            setTotal(prevTotal => prevTotal - item.product.price * item.quantity);
        } else {
            // Select
            setSelectedItems(prevItems => [...prevItems, item]);
            setTotal(prevTotal => prevTotal + item.product.price * item.quantity);
        }
        console.log(total.toFixed(2));
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedItems(data);
            setTotal(data.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
        } else {
            setSelectedItems([]);
            setTotal(0);
        }
    };

    return (
        <div className="body-list">
            <div className="main-content-list">
                <h2>Cart</h2>
            </div>
            {
                data !== undefined && (
                    <div className='all-product'>
                        {data.map((item, index) => (
                            <div key={index} className="cart-card" onClick={() => handleClickProductCard(item)}>
                                <div className="cart-content">
                                    <img className="cart-product-img" src={require("~/component/img/model.png")} alt="Logo" />
                                    <div className="cart-product-infor">
                                        <p className="infor">{item.product.name}</p>
                                        <p className="infor">Số lượng: {item.quantity}</p>
                                        <p className="infor">Đơn giá: {item.product.price}</p>
                                        <p className="infor">Tổng tiền: {item.product.price * item.quantity}</p>
                                    </div>
                                </div>
                                <input
                                    style={{ display: "flex", margin: "auto" }}
                                    type="checkbox"
                                    checked={selectAll || selectedItems.some(selectedItem => selectedItem.productid === item.productid)}
                                    onClick={() => handleSelectProductCard(item)}
                                />
                            </div>
                        ))}
                    </div>
                )
            }
            <div className="cart-pay">
                <button className="btn-sellect-all" onClick={handleSelectAll}>Select All</button>
                <h3 style={{ margin: "auto 0" }}>Quantity: {selectedItems.length}</h3>
                <div>
                    <h3>Tổng tiền</h3>
                    <h1>{total.toFixed(3)}</h1>
                </div>
            </div>
        </div>
    );
}

export default Cart;
