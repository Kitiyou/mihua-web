export default {
  namespaced: true,
  state: {
    // 转换页面时传递words数据
    wordsData: null
  },
  mutations: {
    PUSH_WORDS_DATA(state, wordsData) {
      state.wordsData = wordsData;
    },
    DELETE_WORDS_DATA(state) {
      state.wordsData = null;
    }
  },
  actions: {
    PushWordsData({ commit }, wordsData) {
      commit('PUSH_WORDS_DATA', wordsData);
    },
    DeleteWordsData({ commit }) {
      commit('DELETE_WORDS_DATA');
    }
  }
}
