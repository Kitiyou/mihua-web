import * as userApi from '../api/user'
import * as storage from '../utils/storage'

const storageLoginInfo = storage.getLoginInfo();

export default {
  namespaced: true,
  state: {
    loggedIn: storageLoginInfo.loggedIn,
    token: storageLoginInfo.token,
    nickname: storageLoginInfo.nickname
  },
  mutations: {
    SET_LOGIN_INFO(state, loginInfo) {
      state.loggedIn = true;
      state.token = loginInfo.token;
      state.nickname = loginInfo.nickname;
    },
    DELETE_LOGIN_INFO(state) {
      state.loggedIn = false;
      state.token = '';
      state.nickname = '';
    }
  },
  actions: {
    async Register({ commit }, userInfo) {
      const res = await userApi.register(userInfo);
      const resData = res.data;
      if (resData.code == 0) {
        const loginInfo = resData.data;
        storage.setLoginInfo(loginInfo);
        commit('SET_LOGIN_INFO', loginInfo);
      }
      else {
        throw new Error(resData.msg);
      }
    },
    async LogIn({ commit }, userInfo) {
      const res = await userApi.logIn(userInfo);
      const resData = res.data;
      if (resData.code == 0) {
        const loginInfo = resData.data;
        storage.setLoginInfo(loginInfo);
        commit('SET_LOGIN_INFO', loginInfo);
      }
      else {
        throw new Error(resData.msg);
      }
    },
    LogOut({ commit }) {
      storage.clearLoginInfo();
      commit('DELETE_LOGIN_INFO')
    }
  }
}
