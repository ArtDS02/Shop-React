import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Category() {
    const [status, setStatus] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://ircnv.id.vn:8080/v1/api/category');
                setData(response.data.categories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        console.log(data)
    }, []);

    const handleClickCategoryCard = (item) => {
        console.log("Clicked product:", typeof item.categoryid);
        Cookies.set('categoryid', item.categoryid, { expires: 7 });
        window.location.href = "/category";
    };


    return (
        <a className='option'
            onMouseOver={() => setStatus(true)}
            onMouseLeave={() => setStatus(false)}>
            <a style={{ textDecoration: "none", color: "white" }}
                onMouseOver={() => setStatus(true)}
                onMouseLeave={() => setStatus(false)}
                href="/category">Category</a>
            {
                data !== undefined && status && (
                    <div className='category-popup'>
                        {data.map((item, index) => (
                            <div key={index} onClick={() => handleClickCategoryCard(item)} className="dropdown-content">
                                <p>{item.name}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </a>
    );
}

export default Category;
