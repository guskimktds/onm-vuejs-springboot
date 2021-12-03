import axios from 'axios';
const headers = {
    "User-Agent": "GiGA Eyes (compatible;DeviceType/iPhone;DeviceModel/SCH-M20;DeviceId/3F2A009CDE;OSType/iOS;OSVersion/5.1.1;AppVersion/3.0.0;IpAddr/14.52.161.208)",
    "Content-Type": "application/json",
  }
const config ={
    serverUrl: 'process.env.VUE_APP_BACKEND_SERVER_URL',
    apiUrl: 'process.env.VUE_APP_API_VERSION'
}
const url = `${config.serverUrl}/${config.apiUrl}````/ONM_15111/get_site_open_api `````

//searchToButton method정리
function fetchCustomerApi(){
    return axios.post(url, headers, params)
}
export {
    fetchCustomerApi
}