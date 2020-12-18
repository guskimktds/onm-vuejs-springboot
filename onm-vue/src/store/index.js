import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const resourceHost = "http://localhost:3000"

export default new Vuex.Store({
  state: {
    accessToken: null,  //cookie 로 대체
    //isAuthenticated: false
  },
  getters: {
    // getAuthenticated: function (state) {
    //   return state.isAuthenticated;
    // }
  },
  mutations: {
    LOGIN(state, { data }) {
      console.log(data)
      state.accessToken = data
      //state.isAuthenticated = true
    },
    LOGOUT(state) {
      state.accessToken = null
      //state.isAuthenticated = false
    },
  },
  actions: {
    LOGIN({ commit }, { id, password }) {
      return axios
        .post(`${resourceHost}/login`, { id, password })
        .then(({ data }) => {
          commit("LOGIN", data)
          // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
          //axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
        })
    },
    LOGOUT({ commit }) {
      commit("LOGOUT")
    },
  },
})