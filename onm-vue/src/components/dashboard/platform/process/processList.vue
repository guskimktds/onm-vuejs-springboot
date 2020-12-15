<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>국사코드</th><th>프로세스타입</th><th>프로세스명</th><th>상태</th><th>보고일시(Last)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="process in pList" :key="process.code">
                    <td>{{process.code}}</td>
                    <td>{{process.type}}</td>
                    <td>{{process.name}}</td>
                    <td>{{process.status}}</td>
                    <td>{{process.lastDate}}</td>
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