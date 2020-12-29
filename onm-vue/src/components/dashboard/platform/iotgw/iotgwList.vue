<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>국사코드</th>
                    <th>전체</th>
                    <th>정상</th>
                    <th>개통대기</th>
                    <th>개통진행</th>
                    <th>개통실패</th>
                    <th>네트워크장애</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in pList" :key="idx">
                    <td>{{item.local_gw_id}}</td>
                    <td>{{item.iot_gw_cnt}}</td>
                    <td>{{item.status_code}}</td>
                    <!-- <td>{{item.local_gw_id}}</td> -->
                    <!-- <td>{{item.iot_gw_cnt}}</td> -->
                    <!-- <td>{{item.normal_cam_cnt}}</td> -->
                    <td>{{item.waiting_cam_cnt}}</td>
                    <td>{{item.proc_cam_cnt}}</td>
                    <td>{{item.open_fail_cam_cnt}}</td>
                    <td>{{item.networkfail_cam_cnt}}</td>
                    <!-- <td>{{item.pause_cam_cnt}}</td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['pList'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>