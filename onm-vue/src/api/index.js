import axios from 'axios';

const config ={
    serverUrl: 'process.env.VUE_APP_BACKEND_SERVER_URL',
    apiUrl: 'process.env.VUE_APP_API_VERSION'
}

//searchToButton method정리
function termAuthList(){
    return axios.get(`${config.serverUrl}/${config.apiUrl}/ONM_13012/get_term_auth_hist`)
}
    export{
       termAuthList
    }