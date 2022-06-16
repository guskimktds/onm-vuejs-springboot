import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import createPersistedState from "vuex-persistedstate"
// import module from '../module/index'
import menuMock from "../mock/authMenuList.json"


Vue.use(Vuex)

axios.defaults.withCredentials = true;
/*
axios.interceptors.request.use(
    function (config) {
        console.log("##### COOKIE = " + document.cookie)
        config.headers.headers.common['Cookie'] = document.cookie;

        
        console.log(config)

        return config;
    }, 
    function (error) {
        // 요청 에러 직전 호출됩니다.
        return Promise.reject(error);
    }
);
*/

export default new Vuex.Store({
    //const store = new Vuex.Store({
    state: {
        accessToken: null, //cookie 로 대체
        isAuthenticated: false,
        pageoptions: [10, 20, 50, 100],
        menu: [],
        topMenu:[],
        onmUserId: '',
        authGroupId:'',
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
        headers: {
            'User-Agent': 'GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)',
            'Content-Type': 'application/json'
          },
        menuIndex: '',
        subMenuIndex: 0
    },
    plugins: [createPersistedState()],
    getters: {
        getAuthenticated: function(state) {
            return state.isAuthenticated;
        },
        getMenus: function(state) {
            return state.menu
        },
        getAuthGroupId: function(state) {
            return state.authGroupId
        },
    },
    mutations: {
        LOGIN(state, param) {
            state.accessToken = param
            state.isAuthenticated = true
            state.topMenu = param.data.menu_list
            state.authGroupId = param.data.auth_group_id
            state.menu = param.data.menu_list
            state.onmUserId = param.id
        },
        LOGOUT(state) {
            state.accessToken = null
            state.isAuthenticated = false
            state.menu = []
            state.topMenu = []
            state.authGroupId = ''
            state.onmUserId = ''
            state.headers = {}
        },
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        MENU(state,payload){
            state.menuIndex=payload
        },
        SUB_MENU(state,payload){
            state.subMenuIndex=payload
        }

    },
    actions: {
        LOGIN({ commit }, { id, password }) {
            // commit("LOGIN", { menuMock, id, password })
            // var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
            var url = `http://localhost:3000/V110/ONM_10001/user_login`
            // var url = `/${process.env.VUE_APP_API_VERSION}/ONM_10001/user_login`
            var params = {
                login_id: id,
                login_pwd: password
            }
            // res.header("Access-Control-Allow-Origin", "*");
            //console.log(params)
            // return axios.post(url, params, this.headers)
            return axios.get(url)
                .then((response) => {
                    console.log("####  Cookie 1####");
                    // var cookie = response.headers.get('Set-Cookie');
                    console.log(response);
                    console.log("####  Cookie 2####");

                    var resCode = response.data.res_code
                    var resMsg = response.data.res_msg
                    var data = response.data.data

                    console.log("================== menus");
                    console.log(data.menus);
                    console.log(menuMock);

                    if(resCode == 200){
                        commit("LOGIN", { data, id })
              
                    }else{
                        console.log(resCode,resMsg)
                        alert(resMsg)
                    }
                })
                .catch(e => {
                    console.log("####### ERROR 1############")
                    console.error(e)
                    console.log("####### ERROR 2############")
                  })
        },
        LOGOUT({ commit }) {
            // commit("LOGOUT", id)
            var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_10002/user_logout`
            return axios
                .post(url, this.headers)
                .then(({ data }) => {
                    console.log(data)
                    commit("LOGOUT")
                })
        },
    },
})