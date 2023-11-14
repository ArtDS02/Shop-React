import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function Cart() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [selectAll, setSelectAll] = useState(false);

    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://ircnv.id.vn:8080/v1/api/cart/`, {
                    headers: {
                        token: token,
                    },
                });
                setData(response.data.cart);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (token != null) {
            fetchData();
        } else {
            window.location.href = "/login";
        }
    }, [token]);

    const handleClickProductCard = (item) => {
        // console.log("Clicked product:", item);
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


    const changeQuantity = async (item, option) => {
        if (option === "up" || (option === "down" && item.quantity > 1)) {
            try {
                const newQuantity = option === "up" ? item.quantity + 1 : item.quantity - 1;
                const response = await axios.put(`http://ircnv.id.vn:8080/v1/api/cart/${item.productid}`, {
                    quantity: newQuantity,
                }, {
                    headers: {
                        token: token,
                    },
                });

                // Update local state with the new quantity
                setData(prevData => {
                    const newData = [...prevData];
                    const updatedItemIndex = newData.findIndex(i => i.productid === item.productid);
                    if (updatedItemIndex !== -1) {
                        newData[updatedItemIndex] = { ...newData[updatedItemIndex], quantity: newQuantity };
                    }
                    return newData;
                });
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    const deleteProduct = async (item) => {
        console.log("bat dau xoa");
        try {
            const response = await axios.delete(`http://ircnv.id.vn:8080/v1/api/cart/${item.productid}`, {
                headers: {
                    token: token,
                },
            });
            // Update local state with the new data
            setData(prevData => prevData.filter(i => i.productid !== item.productid));
            console.log("delete");
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
        console.log("xoa xong")
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
                                        <p className="infor">
                                            {item.quantity > 1 ?
                                                <button className="btn-change-value" onClick={() => changeQuantity(item, "down")}>-</button> :
                                                null
                                            }
                                            {item.quantity}
                                            <button className="btn-change-value" onClick={() => changeQuantity(item, "up")}>+</button>
                                        </p>
                                        <p className="infor">Đơn giá: {item.product.price}</p>
                                        <p className="infor">Tổng tiền: {item.product.price * item.quantity}</p>
                                    </div>
                                </div>
                                <input
                                    style={{ display: "flex", margin: "auto", transform: "scale(2)" }}
                                    type="checkbox"
                                    checked={selectAll || selectedItems.some(selectedItem => selectedItem.productid === item.productid)}
                                    onClick={() => handleSelectProductCard(item)}
                                />
                                <a className="btn-back" onClick={() => deleteProduct(item)}><img src={require("~/component/img/trash.png")} alt="Logo" /></a>
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
                    <h1>{total.toFixed(3)} VNĐ</h1>
                </div>
            </div>
        </div>
    );
}

export default Cart;
