<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>거래고유번호</th>
                    <th>오더유형</th>
                    <th>오더번호</th>
                    <th>청약처리결과코드</th>
                    <th>청약처리결과메세지</th>
                    <th>청약상태 통보여부</th>
                    <th>오더처리 통보일시</th>
                    <th>청약결과 통보결과</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.tranId">
                    <td>{{item.tranId}}</td>
                    <td>{{item.orderType}}</td>
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.responseCode}}</td>
                    <td>{{item.responseMessage}}</td>
                    <td>{{item.orderStatusAlarm}}</td>
                    <td>{{item.orderStatusAlarmDate}}</td>
                    <td>{{item.orderStatusAlarmResult}}</td>
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