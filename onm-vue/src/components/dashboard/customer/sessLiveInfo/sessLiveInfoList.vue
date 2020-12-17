<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>로그인 키</th>
                    <th>사용자 ID</th>
                    <th>전화번호</th>
                    <th>전화번호 타입</th>
                    <th>ip</th>
                    <th>만료일</th>
                    <th>장치타입</th>
                </tr>
            </thead>
            <tbody>        
                <tr v-for="item in pList" :key="item.loginKey">
                    <td>{{item.loginKey}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.numberType}}</td>
                    <td>{{item.ip}}</td>
                    <td>{{item.expireDate}}</td>
                    <td>{{item.deviceType}}</td>
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