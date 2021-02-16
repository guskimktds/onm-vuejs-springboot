import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate"
// import module from '../module/index'
import menuMock from "../mock/authMenuList.json"

Vue.use(Vuex)

// const resourceHost = "http://localhost:3000"
// const headers = {
//     'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
//     'Content-Type': 'application/json'
//   }

// const dataState = createPersistedState({
//   paths: ['module']
// })

export default new Vuex.Store({
    //const store = new Vuex.Store({
    state: {
        accessToken: null, //cookie 로 대체
        isAuthenticated: false,
        menu: [],
        topMenu:[],
        onmUserId: '',
        // auth_group_id:'',
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
        headers: {
            'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
            'Content-Type': 'application/json'
          }
    },
    // modules: {
    //   dataStore
    // },
    // modules: module,
    // plugins: [createPersistedState()],
    plugins: [createPersistedState()],
    getters: {
        getAuthenticated: function(state) {
            return state.isAuthenticated;
        },
        getMenus: function(state) {
            return state.menu
        }
    },
    mutations: {
        LOGIN(state, param) {
            // console.log("mutations ============ ")
            console.log(param)
            // console.log(param.data)
            // console.log(JSON.parse(param.data.menu))
            console.log(param.id)
                // console.log("mutations end ============ ")
            state.accessToken = param
            state.isAuthenticated = true
            // state.menu = JSON.parse(param.data.menu)
            // state.menu = param.menuMock
            console.log(param.data.data.auth_group_list[0].auth_group_list)
            state.topMenu = param.data.data.auth_group_list[0].auth_group_list 
            state.menu = menuMock

            state.onmUserId = param.id
            // state.headers = {
            //     'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
            //     'Content-Type': 'application/json'
            //   }
        },
        LOGOUT(state) {
            state.accessToken = null
            state.isAuthenticated = false
            state.menu = []
            state.topMenu = []
            state.onmUserId = ''
            state.headers = {}
        },
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },

    },
    actions: {
        LOGIN({ commit }, { id, password }) {
            // commit("LOGIN", { menuMock, id, password })
            var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
            var params = {
                login_id: id,
                login_pwd: password
            }
            console.log(params)
            return axios.post(url, params, this.headers)
                // .then(({ data }) => {
                //     console.log(id)
                //     commit("LOGIN", { data, id })
                // })
                .then((response) => {
                    // console.log(response.data)
                    var resCode = response.data.res_code
                    var resMsg = response.data.res_msg
                    var data = response.data.data

                    if(resCode == 200){
                        commit("LOGIN", { data, id })
              
                    }else{
                        console.log(resCode,resMsg)
                        // commit("LOGIN", { menuMock, id })
                    }
                  })
        },
        LOGOUT({ commit }) {
            // commit("LOGOUT", id)
            var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10002/user_logout`
            // var params = {
            //     "user_id":id
            // }
            // console.log(params)
            return axios
                .post(url, this.headers)
                .then(({ data }) => {
                    console.log(data)
                    commit("LOGOUT")
                })
        },
    },
})

//export default store;