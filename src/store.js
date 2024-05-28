// store/index.js
import { createStore } from 'vuex';

const persistedState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : {user: null, token: null,};

const store = createStore({
  state: persistedState,
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('store', JSON.stringify(state));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('store', JSON.stringify(state));
    },
  },
  actions: { 
    saveUser({ commit }, user) {
      commit('setUser', user);
    },

    saveToken({ commit }, token ) {
        commit('setToken', token);
      },
  },
});

export default store;
