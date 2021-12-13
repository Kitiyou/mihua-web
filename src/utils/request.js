import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 15000 // 请求超时时间
})

service.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers['Authorization'] = store.state.user.token;
  }
  return config;
}, error => {
  Promise.reject(error);
})

export default service
