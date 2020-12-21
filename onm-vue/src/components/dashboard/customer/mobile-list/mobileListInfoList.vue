<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>로그인키</th>
                    <th>전화번호ID</th>
                    <th>사용자 ID</th>
                    <th>계약자구분</th>
                    <th>알림수신여부</th>
                    <th>클라이언트 IP</th>
                    <th>OS 타입</th>
                    <th>OS 버전</th>
                    <th>앱버전</th>
                    <th>장치타입</th>
                    <th>장치모델명</th>
                    <th>로그인 일시</th>
                </tr>
            </thead>
            <tbody> 
                <tr v-for="item in pList" :key="item.loginKey">
                    <td>{{item.loginKey}}</td>
                    <td>{{item.phoneNumId}}</td>
                    <td>{{item.usrID}}</td>
                    <td>{{item.contractType}}</td>
                    <td>{{item.alarmAuth}}</td>
                    <td>{{item.clientIp}}</td>
                    <td>{{item.osType}}</td>
                    <td>{{item.osVersion}}</td>
                    <td>{{item.appVersion}}</td>
                    <td>{{item.deviceType}}</td>
                    <td>{{item.deviceModelInfo}}</td>
                    <td>{{item.loginDate}}</td>
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