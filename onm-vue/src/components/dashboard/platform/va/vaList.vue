<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>VA IP</th>
                    <th>VA 상태</th>
                    <th>최대용량</th>
                    <th>요청 카메라</th>
                    <th>분석 카메라</th>
                    <th>중지 카메라</th>
                    <th></th>
                    <th>3rd VA 상태</th>
                    <th>3rd 용량</th>
                    <th>3rd 요청 카메라</th>
                    <th>3rd 분석 카메라</th>
                    <th>요약영상 처리</th>
                    <th>가중치</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.ip">
                    <td>{{item.ip}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.maxMem}}</td>
                    <td>{{item.reqCam}}</td>
                    <td>{{item.analysisCam}}</td>
                    <td>{{item.stopCam}}</td>
                    <td>{{item.value}}</td>
                    <td>{{item.thirdVaStatus}}</td>
                    <td>{{item.thirdMaxMem}}</td>
                    <td>{{item.thirdReqCam}}</td>
                    <td>{{item.thirdAnalysisCam}}</td>
                    <td>{{item.summaryProc}}</td>
                    <td>{{item.weight}}</td>
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