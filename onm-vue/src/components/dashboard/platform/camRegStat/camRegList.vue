<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th rowspan="2">일자</th>
                    <th colspan="2">매장</th>                    
                    <th colspan="2">개통대기</th>                    
                    <th colspan="2">개통실패</th>
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
                <tr v-for="item in pList" :key="item">
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
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>