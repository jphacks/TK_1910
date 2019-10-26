import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '',
})

http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
})

http.interceptors.response.use(res => {
    if (res.data.message) {
        Vue.prototype.$notification['success']({
            message: '完了',
            description:
            res.data.message
        });
    }
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$notification['warning']({
            message: 'エラー',
            description:
                err.response.data.message
        });
    }

    if (err.response.status === 401) {
        router.push('/login')
    }
    return Promise.reject(err)
})

export default http