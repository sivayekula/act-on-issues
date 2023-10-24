import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL

export const headers = {
    Authorization:`Bearer ${localStorage.getItem('token')||""}`
}
console.log(headers)
const createInstanse = (URL)=>{ 
    return Axios.create({
        baseURL:URL,
        headers,
    });
};

export const backendAPI = createInstanse(API_URL)