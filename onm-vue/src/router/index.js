import Vue from 'vue'
import Router from 'vue-router'
import PlatformMain from '../components/dashboard/platformMain.vue'
import ServiceMain from '../components/dashboard/serviceMain.vue'
import VocMain from '../components/dashboard/vocMain.vue'
import BizMain from '../components/dashboard/bizMain.vue'
import NotFound from '../components/exceptions/NotFound.vue'

// 하위 메뉴
import ProcessStatus from '../components/dashboard/platform/processStatus'
import CameraStatus from '../components/dashboard/platform/cameraDeviceStatus'
import VaSettingStatus from '../components/dashboard/platform/vaSettingStatus'
import StreamerStatus from '../components/dashboard/platform/streamerStatus'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { 
            path: "/platform", 
            name: 'PlatformMain',
            component: PlatformMain,
            children: [
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
                }
            ]
        },
        { 
            path: "/service", 
            name: 'ServiceMain',
            component: ServiceMain            
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
            path: "*", 
            name: 'NotFound',
            component: NotFound
        }
    ]
})