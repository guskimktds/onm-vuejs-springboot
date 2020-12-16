<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th rowspan="2">일자</th>
                    <th colspan="2">매장</th>
                    <th colspan="2">카메라</th>
                    <th colspan="2">IoT</th>
                </tr>
                <tr>
                    <th>가입</th>
                    <th>해지</th>
                    <th>개통</th>
                    <th>해지</th>
                    <th>개통</th>
                    <th>해지</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.date">
                    <td>{{item.date}}</td>
                    <td>{{item.storeReg}}</td>
                    <td>{{item.storeUnreg}}</td>
                    <td>{{item.camReg}}</td>
                    <td>{{item.camUnreg}}</td>
                    <td>{{item.iotReg}}</td>
                    <td>{{item.iotUnreg}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props: ['pList'],
    // data() {
    //     return {
    //         processList: [
    //             { code: '1', type: 'STM01', name: "STREAMER", status: 'U', lastDate:'2020-12-14 10:20:11'},
    //             { code: '2', type: 'INT', name: "LV_SAAS_INT", status: 'U', lastDate:'2019-12-14 10:20:11'},
    //             { code: '3', type: 'CTRL', name: "LV_SAAS_CTRL", status: 'U', lastDate:'2020-12-14 10:20:11'},
    //             { code: '4', type: 'VA', name: "VMS", status: 'U', lastDate:'2020-11-14 10:20:11'},
    //             { code: '5', type: 'STM02', name: "STREAMER", status: 'U', lastDate:'2018-12-14 10:20:11'},
    //             { code: '6', type: 'STM03', name: "STREAMER", status: 'U', lastDate:'2019-09-14 10:20:11'},
    //             { code: '7', type: 'STM04', name: "STREAMER", status: 'U', lastDate:'2020-10-14 10:20:11'},
    //         ]
    //     }
    // }
    created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>