import axios from 'axios';
import {API_URL} from '../../config'
//http://127.0.0.1:8080/v1/api/user/create
const url = '/v1/api/product/get'
export function ProductDetailApi(productid){
    return new Promise(function(resolve, reject){
      var myurl = `${API_URL}/${url}`
        axios.get(myurl)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
            reject(error)
        });
    })
}