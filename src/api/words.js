import request from '../utils/request'

export function getMyWords() {
  return request({
    url:'/mywords',
    method:'get',
  });
}
export function getWords(id) {
  return request({
    url:`/words/${id}`,
    method:'get',
  });
}
export function addWords(data) {
  return request({
    url:'/words',
    method:'post',
    data
  });
}
export function updateWords(id, data) {
  return request({
    url:`/words/${id}`,
    method:'put',
    data
  });
}
export function deleteWords(id) {
  return request({
    url:`/words/${id}`,
    method:'delete'
  });
}
