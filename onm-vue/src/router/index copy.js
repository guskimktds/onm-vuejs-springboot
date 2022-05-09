import Vue from 'vue'
import Router from 'vue-router'

import PlatformMain from '../components/dashboard/platformMain'
import ServiceMain from '../components/dashboard/serviceMain'
import VocMain from '../components/dashboard/vocMain'
import OrderMain from '../components/dashboard/orderMain'
import StoreMain from '../components/dashboard/storeMain'
import CustomerMain from '../components/dashboard/customerMain'
import BizMain from '../components/dashboard/bizMain'
import NotFound from '../components/exceptions/NotFound'

// 하위 메뉴
import ProcessStatus from '../components/dashboard/platform/processStatus'
import CameraStatus from '../components/dashboard/platform/cameraDeviceStatus'
import VaSettingStatus from '../components/dashboard/platform/vaSettingStatus'
import StreamerStatus from '../components/dashboard/platform/streamerStatus'
import IotGwStatus from '../components/dashboard/platform/iotGwStatus'
import CamRegStat from '@/components/dashboard/platform/camRegStat/camRegStat'

// 하위 메뉴 - 서비스관리
import AccountInquiry from '../components/dashboard/service/accountInquiry/accountInquiry'

// 매장 정보 조회 메뉴
import StoreInfo from '../components/dashboard/store/info/storeInfo'
import StoreDetailInfo from '../components/dashboard/store/store-detail/storeDetailInfo'
import StoreProductInfo from '../components/dashboard/store/store-product/storeProductInfo'
import StoreProductSummaryInfo from '../components/dashboard/store/product-summary/storeProductSummaryInfo'
import VaCamCount from '../components/dashboard/store/va-cam-count/vaCamCount'
import SensorOrderInfo from '../components/dashboard/store/sensor-order/sensorOrderInfo'
import KTTInfo from '../components/dashboard/store/ktt/kttInfo'
import CameraInfo from '../components/dashboard/store/device-camera/cameraInfo'
import IotGWInfo from '../components/dashboard/store/device-iotgw/iotgwInfo'
import SensorInfo from '../components/dashboard/store/device-sensor/sensorInfo'

// 사용자 정보 조회 메뉴
import UsrInfo from '../components/dashboard/customer/phone/usrInfo'
import SessLiveInfo from '../components/dashboard/customer/rtime-access-session/sessLiveInfo'
import LoginHistoryInfo from '../components/dashboard/customer/signin-history/loginHistoryInfo'
import SmsHistoryInfo from '../components/dashboard/customer/sms-history/smsHistoryInfo'
import OtpExpress from '../components/dashboard/customer/otpExpress'
import MobileListInfo from '../components/dashboard/customer/mobile-list/mobileListInfo'
import PushHistory from '../components/dashboard/customer/push-history/pushHistory'

// 계정관리 메뉴(SingIn/SignOut/SingUp/MyPage)
import AccountView from '../components/dashboard/account/accountView'
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
import DeviceOrderInfo from '../components/dashboard/order/deviceOrderInfo'
import DeviceOrderResult from '../components/dashboard/order/deviceOrderResult'
import AuthTargetDevice from '../components/dashboard/order/authTargetDevice'
import SnapshotUser from '../components/dashboard/order/snapshotUser'
import SnapshotDevice from '../components/dashboard/order/snapshotDevice'

//운영관리
import AccountMain from '../components/dashboard/operation/manage/accountMain'
import OperationMain from '../components/dashboard/operationMain'
import OperationHistory from '../components/dashboard/operation/history/operationHistory'
import AdminHistory from '../components/dashboard/operation/admin/adminHistory'
import ChangeHistory from '../components/dashboard/operation/change/changeHistory'

//운영관리 / 관리자 이력 조회

//운영관리 / 코드 설정 관리 
import CodeConfig from '../components/dashboard/operation/code/manage/codeMain'
import LocalCode from '../components/dashboard/operation/code/local/codeMain'
import ClientDevice from '../components/dashboard/operation/code/client/deviceMain'

//운영관리 / 고객이전
import CustomerTransfer from '../components/dashboard/operation/transfer/customerTransfer'
import DeviceStatus from '../components/dashboard/operation/transfer/deviceStatus'

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
            path: "/",
            name: 'Home',
            component: PlatformMain,
            //beforeEnter: requireAuth()
            // 인증 여부를 체크하는 requreAuth를 beforeEnter 속성에 추가했다
            beforeEnter: requireAuth()
        },
        {
            path: "/platform",
            name: 'PlatformMain',
            component: PlatformMain,
            children: [{
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
                // {
                //     path: "streamerPopup",
                //     name: 'StreamerStatusPopup',
                //     component: StreamerStatusPopup
                // },
                {
                    path: "iotgw",
                    name: 'IotGwStatus',
                    component: IotGwStatus
                },
                {
                    path: "cam_reg_stat",
                    name: 'CamRegStat',
                    component: CamRegStat
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
                }
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
        {
            path: "/voc",
            name: 'VocMain',
            component: VocMain
        },
        {
            path: "/biz",
            name: 'BizMain',
            component: BizMain
        },
        {
            path: "/account",
            name: 'AccountView',
            component: AccountView,
            children: [{
                    path: "mypage",
                    name: 'MyPage',
                    component: MyPage
                },
                {
                    path: "signout",
                    name: 'SignOut',
                    component: SignOut
                }
            ]
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
                {
                    path: "otp-express",
                    name: 'otp-express',
                    component: OtpExpress
                },
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
            children: [{
                    path: "process-history",
                    name: 'OperationHistory',
                    component: OperationHistory
                },
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
                    path: "customer-transfer",
                    name: 'CustomerTransfer',
                    component: CustomerTransfer
                },
                {
                    path: "device-status",
                    name: 'DeviceStatus',
                    component: DeviceStatus
                }
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