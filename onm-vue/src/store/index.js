import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate"
// import module from '../module/index'

Vue.use(Vuex)

const resourceHost = "http://localhost:3000"

// const dataState = createPersistedState({
//   paths: ['module']
// })

export default new Vuex.Store({
//const store = new Vuex.Store({
  state: {
    accessToken: null,  //cookie 로 대체
    isAuthenticated: false,
    menu: [],
    id: ''
  },
  // modules: {
  //   dataStore
  // },
  // modules: module,
  // plugins: [createPersistedState()],
  plugins: [createPersistedState()],
  getters: {
    getAuthenticated: function (state) {
      return state.isAuthenticated;
    },
    getMenus: function(state){
      return state.menu
    }
  },
  mutations: {
    LOGIN(state, param) {
      // console.log("mutations ============ ")
      console.log(param)
      console.log(param.data)
      console.log(JSON.parse(param.data.menu))
      console.log(param.id)
      // console.log("mutations end ============ ")
      state.accessToken = param.data
      state.isAuthenticated = true
      state.menu = JSON.parse(param.data.menu)
      state.id = param.id
    },
    LOGOUT(state) {
      state.accessToken = null
      state.isAuthenticated = false
      state.menu = []
      state.id = ''
    },
  },
  actions: {
    LOGIN({ commit }, { id, password }) {
      return axios
        .post(`${resourceHost}/login`, { id, password })
        .then(({ data }) => {
          console.log(id)
          commit("LOGIN", {data, id})
          // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
          //axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
        })
    },
    LOGOUT({ commit }, { id }) {
      //commit("LOGOUT")
      return axios
        .post(`${resourceHost}/logout`, { id })
        .then(({ data }) => {
          console.log(data)
          commit("LOGOUT")
          // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
          //axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
        })
    },
  },
})

//export default store;