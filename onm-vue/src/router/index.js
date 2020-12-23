import Vue from 'vue'
import Router from 'vue-router'
import PlatformMain from '../components/dashboard/platformMain'
import ServiceMain from '../components/dashboard/serviceMain'
import VocMain from '../components/dashboard/vocMain'
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

// 사용자 정보 조회 메뉴
import UsrInfo from '../components/dashboard/customer/usrInfo'
import SessLiveInfo from '../components/dashboard/customer/sessLiveInfo'
import LoginHistoryInfo from '../components/dashboard/customer/loginHistoryInfo'
import SmsHistoryInfo from '../components/dashboard/customer/smsHistoryInfo'
import OtpExpress from '../components/dashboard/customer/otpExpress'
import MobileListInfo from '../components/dashboard/customer/mobileListInfo'
import PushHistory from '../components/dashboard/customer/pushHistory'

// 계정관리 메뉴(SingIn/SignOut/SingUp/MyPage)
import AccountView from '../components/dashboard/account/accountView'
import SignIn from '../components/dashboard/account/signIn'
import SignOut from '../components/dashboard/account/signOut'
import SignUp from '../components/dashboard/account/signUp'
import MyPage from '../components/dashboard/account/myPage'

//청약정보관리
import OrderMain from '../components/dashboard/order/orderMain'
import UserOrderInfo from '../components/dashboard/order/userOrderInfo'
import UserOrderDetail from '../components/dashboard/order/userOrderDetail'

//운영관리
import AccountMain from '../components/dashboard/account/accountMain'
import OperationMain from '../components/dashboard/operationMain'
import OperationHistory from '../components/dashboard/operation/operationHistory'
import AdminHistory from '../components/dashboard/operation/adminHistory'
import ChangeHistory from '../components/dashboard/operation/changeHistory'

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
    console.log(store.state.isAuthenticated)
    if (store.state.isAuthenticated) return next()
    next({
        path: "/signin",
        query: { redirect: to.fullPath },
    })
    
    //next('/signin?returnPath=platform')
  }

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,

    routes: [
        {
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
                component: UserOrderInfo,
                children: [{
                    path: "user/order-detail",
                    name: 'UserOrderDetail',
                    component: UserOrderDetail

                }]
            }]
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
            children: [
                {
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
            children: [
                {
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