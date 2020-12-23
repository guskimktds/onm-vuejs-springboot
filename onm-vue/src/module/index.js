// export const dataStore = {
//     state: {
//       data: []
//     }
//   }
import axios from "axios"

const resourceHost = "http://localhost:3000"

const state = {
    //  id: 1,
    accessToken: null,  //cookie 로 대체
    isAuthenticated: false,
    menu: [],
    
}

const getters = {
    //   'get_id': state => state.id
}

const mutations = {
    LOGIN(state, param) {
        console.log("mutations ============ ")
        console.log(param)
        console.log(param.data)
        console.log(JSON.parse(param.menu))
        console.log("mutations end ============ ")
        state.accessToken = param.data
        state.isAuthenticated = true
        state.menu = JSON.parse(param.menu)
    },
    LOGOUT(state) {
        state.accessToken = null
        state.isAuthenticated = false
        state.menu = []
    },
}

const actions = {
    LOGIN({ commit }, { id, password }) {
        return axios
            .post(`${resourceHost}/login`, { id, password })
            .then(({ data }) => {
            console.log(JSON.parse(data.menu))
            commit("LOGIN", data)
            // 모든 HTTP 요청 헤더에 Authorization 을 추가한다.
            //axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
            })
    },
    LOGOUT({ commit }) {
        commit("LOGOUT")
    },
}

export default {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    ...state
  },
  getters,
  mutations,
  actions
}