<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>센서 ID</th>
                    <th>단말 GW ID</th>
                    <th>센서 제품id</th>
                    <th>사용자 ID</th>
                    <th>센서 이름</th>
                    <th>센서태그코드</th>
                    <th>시리얼 번호</th>
                    <th>상태코드</th>
                    <th>등록일시</th>
                    <th>수정일시</th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="item in pList" :key="item.sensorId">
                    <td>{{item.sensorId}}</td>
                    <td>{{item.gwId}}</td>
                    <td>{{item.sensorDeviceId}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.sensorName}}</td>
                    <td>{{item.sensorTagCode}}</td>
                    <td>{{item.serialNum}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.addDate}}</td>
                    <td>{{item.modifiedDate}}</td>
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