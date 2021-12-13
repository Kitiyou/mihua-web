export function setLoginInfo(loginInfo) {
  sessionStorage.setItem('token', loginInfo.token);
  sessionStorage.setItem('nickname', loginInfo.nickname);
}

export function getLoginInfo() {
  let token = sessionStorage.getItem('token');
  let nickname = sessionStorage.getItem('nickname');
  if ( token && nickname ) {
    return { loggedIn: true, token, nickname };
  }
  else {
    return { loggedIn: false, token: '', nickname: '' };
  }
}

export function clearLoginInfo() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('nickname');
}
