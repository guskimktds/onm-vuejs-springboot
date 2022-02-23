import Vue from 'vue'
import Router from 'vue-router'

import GoHome from '../components/utils/goHome'

import PlatformMain from '../components/dashboard/platformMain'
import ServiceMain from '../components/dashboard/serviceMain'
import OrderMain from '../components/dashboard/orderMain'
import StoreMain from '../components/dashboard/storeMain'
import CustomerMain from '../components/dashboard/customerMain'
import BizMain from '../components/dashboard/bizMain'
import NotFound from '../components/exceptions/NotFound'

// 하위 메뉴
import PlatformDashboard from '../components/dashboard/platform/dashboard/platformDashboard'
import ProcessStatus from '../components/dashboard/platform/processStatus'
import CameraStatus from '../components/dashboard/platform/cameraDeviceStatus'
import VaSettingStatus from '../components/dashboard/platform/vaSettingStatus'
import StreamerStatus from '../components/dashboard/platform/streamerStatus'
import IotGwStatus from '../components/dashboard/platform/iotGwStatus'
import CamregStat from '@/components/dashboard/platform/camRegStat/camRegStat'

// 플랫폼현황 > 통계
import OrderStats from '@/components/dashboard/platform/stats/order-stats/orderStats'
import CustomerTransferStats from '@/components/dashboard/platform/stats/customer-transfer-stats/customerTransferStats'
import ProductStats from '@/components/dashboard/platform/stats/product-stats/productStats'
import DeviceStats from '@/components/dashboard/platform/stats/device-stats/deviceStats'

// 하위 메뉴 - 서비스관리
import AccountInquiry from '../components/dashboard/service/accountInquiry/accountInquiry'

// 매장 정보 조회 메뉴
import StoreInfo from '../components/dashboard/store/storeInfo'
import StoreDetailInfo from '../components/dashboard/store/store-detail/storeDetailInfo'
import StoreProductInfo from '../components/dashboard/store/store-product/storeProductInfo'
import StoreProductSummaryInfo from '../components/dashboard/store/product-summary/storeProductSummaryInfo'
import VaCamCount from '../components/dashboard/store/va-cam-count/vaCamCount'
import SensorOrderInfo from '../components/dashboard/store/sensor-order/sensorOrderInfo'
import KTTInfo from '../components/dashboard/store/ktt/kttInfo'
import CameraInfo from '../components/dashboard/store/device-camera/cameraInfo'
import IotGWInfo from '../components/dashboard/store/device-iotgw/iotgwInfo'
import SensorInfo from '../components/dashboard/store/device-sensor/sensorInfo'
import DeviceKttInfo from '../components/dashboard/store/device-ktt/deviceKttInfo'
import termAuth from '../components/dashboard/store/term-auth/termAuth'



// 사용자 정보 조회 메뉴
import UsrInfo from '../components/dashboard/customer/phone/usrInfo'
import SessLiveInfo from '../components/dashboard/customer/rtime-access-session/sessLiveInfo'
import LoginHistoryInfo from '../components/dashboard/customer/signin-history/loginHistoryInfo'
import SmsHistoryInfo from '../components/dashboard/customer/sms-history/smsHistoryInfo'
//import OtpExpress from '../components/dashboard/customer/otpExpress'
import MobileListInfo from '../components/dashboard/customer/mobile-list/mobileListInfo'
import PushHistory from '../components/dashboard/customer/push-history/pushHistory'

// 계정관리 메뉴(SingIn/SignOut/SingUp/MyPage)
// import AccountView from '../components/dashboard/account/accountView'
import SignIn from '../components/dashboard/account/signIn'
import SignOut from '../components/dashboard/account/signOut'
import SignUp from '../components/dashboard/account/signUp'
import MyPage from '../components/dashboard/account/myPage'

//청약정보관리
import UserOrderInfo from '../components/dashboard/order/userOrderInfo'
import UserOrderDetail from '../components/dashboard/order/userOrderDetail'
import UserOrderResult from '../components/dashboard/order/userOrderResult'
import UserOrderPhone from '../components/dashboard/order/userOrderPhone'
import KTTOrderInfo from '../components/dashboard/order/kttOrderInfo'
import ProdInfo from '../components/dashboard/order/prod-info/prodInfo'
import DeviceOrderInfo from '../components/dashboard/order/deviceOrderInfo'
import DeviceOrderResult from '../components/dashboard/order/deviceOrderResult'
import AuthTargetDevice from '../components/dashboard/order/authTargetDevice'
import SnapshotUser from '../components/dashboard/order/snapshotUser'
import SnapshotDevice from '../components/dashboard/order/snapshotDevice'

import TempIdInfo from '@/components/dashboard/order/worker/tempid-info/tempidInfo'
import WorkersInfo from '@/components/dashboard/order/worker/workers-info/workersInfo'
import WorkerLoginHistory from '@/components/dashboard/order/worker/worker-login-history/workerLoginHistory'

//운영관리
import AccountMain from '../components/dashboard/operation/manage/accountMain'
import OperationMain from '../components/dashboard/operationMain'
//import OperationHistory from '../components/dashboard/operation/history/operationHistory'
import AdminHistory from '../components/dashboard/operation/admin/adminHistory'
import ChangeHistory from '../components/dashboard/operation/change/changeHistory'
import termNms from '../components/dashboard/operation/voc/termNms.vue'
import termOrderInfo from '../components/dashboard/operation/voc/termOrderInfo.vue'
import subsInfo from '../components/dashboard/operation/voc/subsInfo.vue'
import dssResultInfo from '../components/dashboard/operation/voc/dssResultInfo.vue'
import bssResultInfo from '../components/dashboard/operation/voc/bssResultInfo.vue'
import deviceRecoInfo from '../components/dashboard/operation/voc/deviceRecoInfo'
import cameraModelInfo from '../components/dashboard/operation/voc/cameraModelInfo.vue'
import vannerManagement from '../components/dashboard/operation/vanner-management/vannerManagement'
import vannerRegster from '../components/dashboard/operation/vanner-register/vannerRegister';
import vannerDetailPage from '../components/dashboard/operation/vanner-register/vannerDetailPage';
//sun
import registerStore from '../components/dashboard/operation/register-store/registerStore'
import approvalStore from '../components/dashboard/operation/approval-store/approvalStore'
import registerStoreList from '../components/dashboard/operation/register-store-list/registerStoreList'
import approvalApi from '../components/dashboard/operation/approval-api/approvalApi'
import apiInfoDetail from '../components/dashboard/operation/api-info-detail/apiInfoDetail'

//운영관리 / 코드 설정 관리 
import CodeConfig from '../components/dashboard/operation/code/manage/codeMain'
import LocalCode from '../components/dashboard/operation/code/local/codeMain'
import ClientDevice from '../components/dashboard/operation/code/client/deviceMain'
import CodeMaster from '../components/dashboard/operation/code/master/codeMain'
import GwAcceptInfo from '../components/dashboard/operation/code/local/gwAcceptInfo'

//운영관리 / 고객이전
import CustomerTransfer from '../components/dashboard/operation/transfer/customerTransfer'
import DeviceStatus from '../components/dashboard/operation/transfer/deviceStatus'

// 운영관리, VOC관리
import CamProd from '../components/dashboard/operation/voc/camProd/camProd'
//open api 
import customerApi from '../components/dashboard/operation/openApi/customerApi.vue'
import apiReport from '../components/dashboard/operation/openApi/apiReport/apiReport.vue'

//공지사항
import notice from '../components/dashboard/operation/notice/notice.vue'
import camTamering from '../components/dashboard/operation/camera/camTampering.vue'
import failover from '../components/dashboard/operation/camera/failover.vue'

// store 에 로그인 여부 체크
import store from '../store'

Vue.use(Router)

// 네비게이션 가드 
// 라우터 매칭을 결정하고, 컴포넌트가 생성하기 전에 호출되는 함수
// 로그인 인증 여부를 여기서 판단하고 next() 컴포넌트 렌더링할지, 로그인 페이지로 갈지 결정됨
const requireAuth = () => (from, to, next) => {
    //const isAuthenticated = false

    //console.log('isAuthenticated : '+this.$store.state.getAuthenticated)
    //alert('isAuthenticated '+isAuthenticated)
    //if (isAuthenticated) return next()
    //next('/login?returnPath=me')
    // console.log(store.state.isAuthenticated)
    if (store.state.isAuthenticated) { return next() }
    next({
        path: "/signin",
        query: { redirect: to.fullPath },
    })

    //next('/signin?returnPath=platform')
}

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [{
            path: "/go-home",
            name: 'GoHome',
            component: GoHome,
        },{
            path: "/",
            name: 'Home',
            component: GoHome,
            //beforeEnter: requireAuth()
            // 인증 여부를 체크하는 requreAuth를 beforeEnter 속성에 추가했다
            beforeEnter: requireAuth()
        },
        {
            path: "/platform",
            name: 'PlatformMain',
            component: PlatformMain,
            children: [{
                    path: "dashboard",
                    name: 'PlatformDashboard',
                    component: PlatformDashboard
                },
                {
                    path: "process",
                    name: 'ProcessStatus',
                    component: ProcessStatus
                },
                {
                    path: "camera",
                    name: 'CameraStatus',
                    component: CameraStatus
                },
                {
                    path: "va",
                    name: 'VaSettingStatus',
                    component: VaSettingStatus
                },
                {
                    path: "streamer",
                    name: 'StreamerStatus',
                    component: StreamerStatus
                },
                {
                    path: "iotgw",
                    name: 'IotGwStatus',
                    component: IotGwStatus
                },
                {
                    path: "camreg-stat",
                    name: 'CamregStat',
                    component: CamregStat
                },
                {
                    path: "order-stats",
                    name: 'OrderStats',
                    component: OrderStats
                },
                {
                    path: "customer-transfer-stats",
                    name: 'CustomerTransferStats',
                    component: CustomerTransferStats
                },
                {
                    path: "product-stats",
                    name: 'ProductStats',
                    component: ProductStats
                },
                {
                    path: "device-stats",
                    name: 'DeviceStats',
                    component: DeviceStats
                }

            ]
        },
        {
            path: "/order",
            name: 'OrderMain',
            component: OrderMain,
            children: [{
                    path: "user/order-info",
                    name: 'UserOrderInfo',
                    component: UserOrderInfo
                },
                {
                    path: "user/order-info1",
                    name: 'UserOrderInfo1',
                    component: UserOrderInfo

                },
                {
                    path: "user/order-detail",
                    name: 'UserOrderDetail',
                    component: UserOrderDetail
                },
                {
                    path: "user-order-result",
                    name: 'UserOrderResult',
                    component: UserOrderResult
                },
                {
                    path: "user-order-phone",
                    name: 'UserOrderPhone',
                    component: UserOrderPhone
                },
                {
                    path: "ktt-order", 
                    name: 'KTTOrderInfo',
                    component: KTTOrderInfo
                },
                {
                    path: "prod-info", 
                    name: 'ProdInfo',
                    component: ProdInfo
                },
                {
                    path: "device-order-info",
                    name: 'DeviceOrderInfo',
                    component: DeviceOrderInfo
                },
                {
                    path: "device-order-result",
                    name: 'DeviceOrderResult',
                    component: DeviceOrderResult
                },
                {
                    path: "auth-target-device",
                    name: 'AuthTargetDevice',
                    component: AuthTargetDevice
                },
                {
                    path: "snapshot-user",
                    name: 'SnapshotUser',
                    component: SnapshotUser
                },
                {
                    path: "snapshot-device",
                    name: 'SnapshotDevice',
                    component: SnapshotDevice
                },

                // 현장 작업자
                {
                    path: "tempid-info",
                    name: 'TempidOnfo',
                    component: TempIdInfo
                },
                {
                    path: "workers-info",
                    name: 'WorkersInfo',
                    component: WorkersInfo
                },
                {
                    path: "worker-login-history",
                    name: 'WorkerLoginHistory',
                    component: WorkerLoginHistory
                },

            ]
        },
        {
            path: "/service",
            name: 'ServiceMain',
            component: ServiceMain,
            children: [{
                path: "account-inquiry",
                name: 'AccountInquiry',
                component: AccountInquiry
            }]
        },
        // {
        //     path: "/voc",
        //     name: 'VocMain',
        //     component: VocMain
        // },
        {
            path: "/biz",
            name: 'BizMain',
            component: BizMain
        },
        {
            path: "/account",
            name: 'MyPage',
            component: MyPage,
            // children: [{
            //         path: "mypage",
            //         name: 'MyPage',
            //         component: MyPage
            //     },
            //     {
            //         path: "signout",
            //         name: 'SignOut',
            //         component: SignOut
            //     }
            // ]
        },
        {
            path: "/store",
            name: 'StoreMain',
            component: StoreMain,
            children: [{
                    path: "info",
                    name: 'info',
                    component: StoreInfo
                },
                {
                    path: "store-detail",
                    name: 'store-detail',
                    component: StoreDetailInfo
                },
                {
                    path: "store-product",
                    name: 'store-product',
                    component: StoreProductInfo
                },
                {
                    path: "product-summary",
                    name: 'product-summary',
                    component: StoreProductSummaryInfo
                },
                {
                    path: "va-cam-count",
                    name: 'va-cam-count',
                    component: VaCamCount
                },
                {
                    path: "sensor-order",
                    name: "sensor-order",
                    component: SensorOrderInfo
                },
                {
                    path: "ktt",
                    name: "ktt",
                    component: KTTInfo
                },
                {
                    path: "device-camera",
                    name: "device-camera",
                    component: CameraInfo
                },
                {
                    path: "device-iotgw",
                    name: "device-iotgw",
                    component: IotGWInfo
                },
                {
                    path: "device-sensor",
                    name: "device-sensor",
                    component: SensorInfo
                },
                {
                    path: "device-ktt",
                    name: "device-ktt",
                    component: DeviceKttInfo
                }
           

            ]
        },

        {
            path: "/customer",
            name: 'CustomerMain',
            component: CustomerMain,
            children: [{
                    path: "phone",
                    name: 'phone',
                    component: UsrInfo
                },
                {
                    path: "rtime-access-session",
                    name: 'rtime-access-session',
                    component: SessLiveInfo
                },
                {
                    path: "signin-history",
                    name: 'signin-history',
                    component: LoginHistoryInfo
                },
                {
                    path: "sms-history",
                    name: 'sms-history',
                    component: SmsHistoryInfo
                },
                // {
                //     path: "otp-express",
                //     name: 'otp-express',
                //     component: OtpExpress
                // },
                {
                    path: "mobile-list",
                    name: 'mobile-list',
                    component: MobileListInfo
                },
                {
                    path: "push-history",
                    name: 'push-history',
                    component: PushHistory
                }
            ]
        },
        {
            path: "/operation",
            name: 'OperationMain',
            component: OperationMain,
            children: [
                {
                    path: "account",
                    name: 'AccountMain',
                    component: AccountMain
                },
                {
                    path: "admin-history",
                    name: 'AdminHistory',
                    component: AdminHistory
                },
                {
                    path: "change-history",
                    name: 'ChangeHistory',
                    component: ChangeHistory
                },
                {
                    path: "code",
                    name: 'CodeConfig',
                    component: CodeConfig
                },
                {
                    path: "lv",
                    name: 'LocalCode',
                    component: LocalCode
                },
                {
                    path: "client-device",
                    name: 'ClientDevice',
                    component: ClientDevice
                },
                {
                    path: "code-master",
                    name: 'CodeMaster',
                    component: CodeMaster
                },
                {
                    path: "customer-transfer",
                    name: 'CustomerTransfer',
                    component: CustomerTransfer
                },
                {
                    path: "device-status",
                    name: 'DeviceStatus',
                    component: DeviceStatus
                },
                {
                    path: "term-auth",
                    name: 'termAuth',
                    component: termAuth
                },
                {
                    path: "term-nms",
                    name: 'termNms',
                    component: termNms
                },
                {
                    path: "term-order",
                    name: 'termOrderInfo',
                    component: termOrderInfo
                },
                {
                    path: "subsinfo",
                    name: 'subsInfo',
                    component: subsInfo
                },
                {
                    path: "dss-result",
                    name: 'dssResultInfo',
                    component: dssResultInfo
                },
                {
                    path: "bss-result",
                    name: 'bssResultInfo',
                    component: bssResultInfo
                },
                {
                    path: "device-reco",
                    name: 'deviceRecoInfo',
                    component: deviceRecoInfo
                },
                {
                    path: "gw-accept",
                    name: 'GwAcceptInfo',
                    component: GwAcceptInfo
                },
                {
                    path: "cam-prod",
                    name: "CamProd",
                    component: CamProd
                },
                {
                    path: "camera-model",
                    name: 'cameraModelInfo',
                    component: cameraModelInfo
                },
                {
                    path: "customer-api",
                    name: 'customerApi',
                    component: customerApi
                },
                {
                    path: "api-report",
                    name: 'apiReport',
                    component: apiReport
                },
                {
                    path: "notice",
                    name: 'notice',
                    component: notice
                },
                {
                    path: "vanner-management",
                    name: 'vanner-management',
                    component:vannerManagement
                },
                {
                    path: "vanner-register",
                    name: 'vanner-register',
                    component: vannerRegster
                },
                {
                    path: "vanner-detailpage",
                    name: 'vanner-detailpage',
                    component: vannerDetailPage,
                    props:true
                },     
                {
                    path: "register-store",
                    name: "register-store",
                    component: registerStore
                },
                {
                    path: "approval-store",
                    name : "approval-store",
                    component: approvalStore
                },
                {
                    path: "register-store-list",
                    name: "register-store-list",
                    component:registerStoreList
                },
                {
                    path: "approval-api",
                    name: "approval-api",
                    component:approvalApi
                },
                {
                    path: "api-info-detail",
                    name: "api-info-detail",
                    component:apiInfoDetail
                },
                {
                    path: "cam-tampering",
                    name: "cam-tampering",
                    component: camTamering
                },
                {
                    path: "failover",
                    name: "failover",
                    component: failover
                },
               
            ]
        },

        {
            path: "/signup",
            name: 'SignUp',
            component: SignUp
        },
        {
            path: "/signin",
            name: 'SignIn',
            component: SignIn

        },
        {
            path: "/signout",
            name: 'SignOut',
            component: SignOut
        },
        {
            path: "*",
            name: 'NotFound',
            component: NotFound
        }
    ]
})