
import axios from 'axios';
import {API_URL} from '../../config'
//http://127.0.0.1:8080/v1/api/user/create
const url = 'v1/api/user/create'
export function AuthenSignUp(formData){
    return new Promise(function(resolve, reject){
      var myurl = `${API_URL}/${url}`
        axios.post(myurl, formData)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          if (error.response.data)
            reject(error.response.data.error)
          else reject(error.message)
        });
    })
}