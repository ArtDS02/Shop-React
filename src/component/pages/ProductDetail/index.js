import React,{useEffect, useState}from 'react'
import {API_URL} from '../../../config'
import { useParams } from 'react-router-dom';
import {AddToCart} from '../../../api/cart/AddToCart'
import {SaveCookie, GetCookie} from '../../../common/saveCookie'
import axios from 'axios';

export default function ProductDetail() {
  const { productid } = useParams();
  const [rating, setRating] = useState(5)
  const [product, setProduct] = useState(null)
  const [comment, setComment] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const AddToCartHandler= function(){
    if (!window.confirm(`Are you sure you want to add ${quantity} ${product.name} to your cart`))
      return;
    var token =  GetCookie("token")
    AddToCart(token, quantity, productid)
          .then(data => alert("Add successfully"))
          .catch(error => alert("Error adding: "+ error.toString()))
  }
  useEffect(() => {
    if (productid != null && productid >= 0) {
        const fetchData = async () => {
            try {
                // get comments
                const commentList = await axios.get(`http://ircnv.id.vn:8080/v1/api/review/list/${productid}`);     
                setComment(commentList.data.reviews);
                console.log(commentList.data.reviews);
                // caculate rating
                var result = 0
                commentList.data.reviews.length != 0 && commentList.data.reviews.forEach(element => {
                  result += element.rating
                });
                setRating((result /commentList.data.reviews.length ).toFixed(1))
                // get product details
                const productDetail = await axios.get(`http://ircnv.id.vn:8080/v1/api/product/get/${productid}`);
                setProduct(productDetail.data.product);
                console.log(productDetail.data.product);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    } else {
        console.log('productid not appropriate');
    }
  }, [productid]);

return (
  <React.Fragment>
    { 
      product != undefined && (
        <React.Fragment>
        <div className="product-detail-container mt-10">
          <div className="product-image">
            <img src={product.image} className="img-fluid" alt={product.name} />
          </div>
          <div className="product-content">

            <h1>{product.name} <vr/> </h1>
            <p>
              <span> {rating}
              {/* {rating >=1} */}
                <i class={(rating >=1 ? "fa-solid " : "fa-regular ") + "fa-star fa-star" }></i>
                <i class={(rating >=2 ? "fa-solid " : "fa-regular ") + "fa-star fa-star" }></i>
                <i class={(rating >=3 ? "fa-solid " : "fa-regular ") + "fa-star fa-star" }></i>
                <i class={(rating >=4 ? "fa-solid " : "fa-regular ") + "fa-star fa-star" }></i>
                <i class={(rating >=5 ? "fa-solid " : "fa-regular ") + "fa-star fa-star" }></i>
              </span>
              <span className='border-left'> 6 Đánh Giá </span> 
              <span className='border-left'> 000 Đã Bán </span>
            </p>
            <table>
              <tr>
                <td>
                  <p>name: </p>
                </td>
                <td>
                  <p>{product.description}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p> Price: </p>
                </td>
                <td>
                  <p> ${product.price}</p>  
                </td>
              </tr>
              <tr>
                <td>
                  <p> Category: </p>
                </td>
                <td>
                  <p> {product.Category.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p> Quantity: </p>
                </td>
                <td>
                  <input type='number' 
                    onChange={(event) => {
                      setQuantity(event.target.value)
                      console.log("quantity: " +quantity)
                    }}
                  ></input> <br/>
                </td>
              </tr>
            </table>
           
            <button className='button-cart' onClick={AddToCartHandler}>
              <p>Thêm vào giỏ hàng <i class="fa-solid fa-cart-plus fa-2xl"></i></p>
            </button>
            {/* Phần bình luận */}

          </div>
        </div>
        
        </React.Fragment>
      )
    }
  </React.Fragment>
 
);



  // return (
  //   <div>
  //     { 
  //       product != undefined && (
          
  //         <div className="product-detail-container">
  //           <div className="product-image">
  //             <img src={product.image} alt="" />
  //           </div>
  //           <div className="product-content">
  //             {product.name}
  //           </div>
  //         </div>
  //       )
  //     }
  //   </div>
  // )
}
