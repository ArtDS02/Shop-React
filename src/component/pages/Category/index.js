import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { GetCookie } from '~/common/saveCookie';

function Category() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [category, setCategory] = useState([]);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [hover, setHover] = useState(false);
    const [buy, setBuy] = useState(false);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (GetCookie('categoryid') != null) {
                    console.log('co luu cookie');
                    const categoryId = GetCookie('categoryid');
                    const response = await axios.get(`http://ircnv.id.vn:8080/v1/api/product/list/${categoryId}?limit=10&offset=0`);
                    setData(response.data.products);
                    setFilterData(response.data.products);
                    Cookies.remove('categoryid');
                } else {
                    console.log('khong co luu cookie');
                    const response = await axios.get('http://ircnv.id.vn:8080/v1/api/product/list?limit=10000&offset=0');
                    setData(response.data.products);
                    setFilterData(response.data.products);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataCategory = async () => {
            try {
                const responseCategory = await axios.get('http://ircnv.id.vn:8080/v1/api/category');
                setCategory(responseCategory.data.categories);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
        fetchDataCategory();
    }, []);

    const handleOptionChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        if (selectedValue === 0) {
            setData(filterData);
        } else {
            const filteredData = filterData.filter(item => item.categoryid === selectedValue);
            setData(filteredData);
        }
    };

    const handleClickProductCard = async (item) => {
        console.log("bat dau them");
        try {
            const response = await axios.post(`http://ircnv.id.vn:8080/v1/api/cart/${item.productid}`, {
                quantity: 1,
            }, {
                headers: {
                    token: token,
                },
            });
            console.log(response)
            console.log("Them xong");
            setBuy(true);
            setTimeout(() => {
                setBuy(false);
            }, 1500);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
        console.log("Them xong")
    };


    const handleMouseOver = (index) => {
        setHoveredItem(index);
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
        setHover(false);
    };

    const hoverClass = "product-card-hover";
    const baseClass = "product-card"
    const usingClass = `${baseClass} ${hover ? hoverClass : ''}`

    return (
        <div className="body-list">
            <div className="main-content-list">
                <h2>LIST PRODUCTS</h2>
                <select className="filter-product" onChange={handleOptionChange}>
                    <option className="dropdown-content" value="0">All</option>
                    {category.map((item, index) => (
                        <option key={index} value={item.categoryid}>{item.name}</option>
                    ))}
                </select>
            </div>
            {
                data !== undefined && (
                    <div className='all-product'>
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className={hoveredItem === index ? usingClass : baseClass}
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hoveredItem === index ? (
                                    <div className="product-buy" onClick={() => handleClickProductCard(item)}>
                                        {buy ? <img className="icon-buy" src={require("~/component/img/checked.png")} alt="Logo" /> : <img className="icon-buy" src={require("~/component/img/logo.png")} alt="Logo" />}
                                    </div>
                                ) : (
                                    <div key={index}>
                                        <img src={require("~/component/img/model.png")} alt="Logo" />
                                        <div className="product-infor">
                                            <p>{item.name}</p>
                                            <p>{item.price}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default Category;
