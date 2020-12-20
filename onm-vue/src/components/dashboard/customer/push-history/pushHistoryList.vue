<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>PUSH 이력 ID</th>
                    <th>사용자 아이디</th>
                    <th>알림 아이디</th>
                    <th>알림명</th>
                    <th>알림 태그 명</th>
                    <th>알림 발생 시작시간</th>
                    <th>알림 발생 끝시간</th>
                    <th>카메라 아이디</th>
                    <th>매장명</th>
                </tr>
            </thead>
            <tbody>       
                <tr v-for="item in pList" :key="item.pushHistoryId">
                    <td>{{item.pushHistoryId}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.alarmId}}</td>
                    <td>{{item.alarmInfo}}</td>
                    <td>{{item.alarmTagName}}</td>
                    <td>{{item.alarmStartTime}}</td>
                    <td>{{item.alarmEndTime}}</td>
                    <td>{{item.camId}}</td>
                    <td>{{item.storeName}}</td>
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