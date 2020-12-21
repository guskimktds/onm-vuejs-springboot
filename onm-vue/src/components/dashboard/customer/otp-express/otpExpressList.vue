<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자ID</th>
                    <th>전화번호</th>
                    <th>전화번호 타입</th>
                    <th>사용자 이름</th>
                    <th>Sub ID(전화번호 ID)</th>
                    <th>알림설정권한(Y/N)</th>
                    <th>승인여부</th>
                    <th>승인날자</th>
                    <th>상태 코드</th>
                    <th>mgt 상태코드</th>
                    <th>비고</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.numberType}}</td>
                    <td>{{item.usrName}}</td>
                    <td>{{item.subId}}</td>
                    <td>{{item.alarmAuth}}</td>
                    <td>{{item.approve}}</td>
                    <td>{{item.approveDate}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.mgtCode}}</td>
                    <td>{{item.etc}}</td>
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