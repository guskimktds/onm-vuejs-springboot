import Router from 'vue-router'
import PlatformMain from '../dashboard/platformMain.vue'
import ServiceMain from '../dashboard/serviceMain.vue'
import VocMain from '../dashboard/vocMain.vue'
import BizMain from '../dashboard/bizMain.vue'
import NotFound from '../exceptions/NotFound.vue'

// 하위 메뉴
import ProcessStatus from '../dashboard/platform/processStatus'
import CameraStatus from '../dashboard/platform/cameraStatus'
import VaSettingStatus from '../dashboard/platform/vaSettingStatus'
import StreamerStatus from '../dashboard/platform/streamerStatus'


// const menus = [
//     { 
//         path: "/", 
//         name: 'processStatusPage',
//         component: ProcessStatus
//     },
//     { 
//         path: "/platform/camera", 
//         name: 'ServiceMainPage',
//         component: CameraStatus
//     },
//     { 
//         path: "/platform/va", 
//         name: 'ServiceMainPage',
//         component: VaSettingStatus
//     },
//     { 
//         path: "/platform/streamer", 
//         name: 'ServiceMainPage',
//         component: StreamerStatus
//     }
// ]

export default new Router({
    routes: [
        { 
            path: "/", 
            name: 'PlatformMainPage',
            component: PlatformMain,
            children: [
                { 
                    path: "/", 
                    name: 'processStatusPage',
                    component: ProcessStatus
                },
                { 
                    path: "camera", 
                    name: 'ServiceMainPage',
                    component: CameraStatus
                },
                { 
                    path: "va", 
                    name: 'ServiceMainPage',
                    component: VaSettingStatus
                },
                { 
                    path: "streamer", 
                    name: 'ServiceMainPage',
                    component: StreamerStatus
                }
            ]
        },
        { 
            path: "/service", 
            name: 'ServiceMainPage',
            component: ServiceMain            
        },
        { 
            path: "/voc", 
            name: 'VocMainPage',
            component: VocMain
        },
        { 
            path: "/biz", 
            name: 'BizMainPage',
            component: BizMain
        },
        { 
            path: "*", 
            name: 'NotFoundPage',
            component: NotFound
        }
    ]
})