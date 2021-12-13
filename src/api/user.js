import request from '../utils/request'

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
export function logIn(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
