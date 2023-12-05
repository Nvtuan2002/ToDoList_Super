import axios from 'axios'
import { store } from '@/redux/store'
const { VITE_BASE_URL } = import.meta.env

axios.defaults.baseURL = VITE_BASE_URL
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
    var token = store.getState().auth.token // lấy ra token bên store redux
    var currentToken = config.headers.Authorization && config.headers.Authorization.split(' ')[1] 
    // token cũ và tách chuỗi thàng mảng bằng dấu cách lấy giá trị đằng sau bỏ Bearer đằng trước
    if(!currentToken){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})