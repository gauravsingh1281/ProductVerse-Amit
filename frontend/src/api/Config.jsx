import axios from 'axios';

const instance = axios.create({
    baseURL: "https://productverse-amit.onrender.com/"
})

export default instance;
