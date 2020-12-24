<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>센서 ID</th>
                    <th>센서제품명</th>
                    <th>센서태그코드</th>
                    <th>상태 코드</th>
                    <th>센서 개수</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in pList" :key="item.sensorId">
                    <td>{{item.sensorId}}</td>
                    <td>{{item.sensorName}}</td>
                    <td>{{item.sensorTag}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.sensorCnt}}</td>
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