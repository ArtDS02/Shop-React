import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { GetCookie } from '~/common/saveCookie';


function Category() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    // const [category, setCategory] = useState(GetCookie('listcategory'));



    useEffect(() => {
        if (GetCookie('categoryid') != null) {
            console.log('co luu coookie');
            const fetchData = async () => {
                try {
                    const categoryId = GetCookie('categoryid');
                    const response = await axios.get(`http://ircnv.id.vn:8080/v1/api/product/list/${categoryId}?limit=10&offset=0`);
                    setData(response.data.products);
                    setFilterData(response.data.products);
                    Cookies.remove('categoryid');
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        } else {
            console.log('khong co luu coookie');
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://ircnv.id.vn:8080/v1/api/product/list?limit=10000&offset=0');
                    setData(response.data.products);
                    setFilterData(response.data.products);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }

        // console.log(typeof category);
        // console.log(category);

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

    const handleClickProductCard = (item) => {
        console.log("Clicked product:", item);
    };

    return (
        <div className="body-list">
            <div className="main-content-list">
                <h2>LIST PRODUCTS</h2>
                <select className="filter-product" onChange={handleOptionChange}>
                    <option className="filter-option" value="0">All</option>
                    {filterData.map((item, index) => (
                        <option className="filter-option" key={index} value={item.categoryid}>{item.Category.name}</option>
                    ))}
                </select>
            </div>
            {
                data !== undefined && (
                    <div className='all-product'>
                        {data.map((item, index) => (
                            <div key={index} className="product-card" onClick={() => handleClickProductCard(item)}>
                                <img className="product-img" src={ item.image != ""? item.image :require("~/component/img/model.png")} alt="Logo" />
                                <div className="product-infor">
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default Category;
