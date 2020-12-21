import Vue from "vue"
import Vuex from "vuex"
//import axios from "axios"
import createPersistedState from "vuex-persistedstate"
import module from '../module/index'

Vue.use(Vuex)

//const resourceHost = "http://localhost:3000"

const dataState = createPersistedState({
  paths: ['module']
})

//export default new Vuex.Store({
const store = new Vuex.Store({
  // state: {
  //   accessToken: null,  //cookie 로 대체
  //   isAuthenticated: false,
  //   menu: []
  // },
  // modules: {
  //   dataStore
  // },
  modules: module,
  plugins: [dataState],
  // getters: {
  //   // getAuthenticated: function (state) {
  //   //   return state.isAuthenticated;
  //   // }
  // },
  // mutations: {
  //   LOGIN(state, param) {
  //     console.log("mutations ============ ")
  //     console.log(param)
  //     console.log(param.data)
  //     console.log(JSON.parse(param.menu))
  //     console.log("mutations end ============ ")
  //     state.accessToken = param.data
  //     state.isAuthenticated = true
  //     state.menu = JSON.parse(param.menu)
  //   },
  //   LOGOUT(state) {
  //     state.accessToken = null
  //     state.isAuthenticated = false
  //     state.menu = []
  //   },
  // },
  // actions: {
  //   LOGIN({ commit }, { id, password }) {
  //     return axios
  //       .post(`${resourceHost}/login`, { id, password })
  //       .then(({ data }) => {
  //         console.log(JSON.parse(data.menu))
  //         commit("LOGIN", data)
  //         // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
  //         //axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
  //       })
  //   },
  //   LOGOUT({ commit }) {
  //     commit("LOGOUT")
  //   },
  // },
})

export default store;