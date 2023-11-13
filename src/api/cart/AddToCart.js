import axios from 'axios';
import {API_URL} from '../../config'
//http://127.0.0.1:8080/v1/api/user/create
const url = `${API_URL}/v1/api/cart`
export function AddToCart(token, quantity, productid) {
    return new Promise(function(resolve, reject) {
        if (quantity < 1 ) {
            reject(`Quantity must be positive. ${quantity} inappropriate`);
        }
        if (quantity >= 999 ) {
            reject(`Quantity must be less than 1000. ${quantity} inappropriate`);
        }
        axios.post(`${url}/${productid}`, { "quantity": parseInt(quantity) }, { headers: { token: token } })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data)
                    reject(`Server error: ${err.response.data}`);
                } else if (err.request) {
                    // The request was made but no response was received
                    console.log(err.request)
                    reject("No response from server");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log(err.message)
                    reject(`Error: ${err.message}`);
                }
            });
    });
}
