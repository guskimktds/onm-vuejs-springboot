<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    
                    <th>로그인 키</th>
                    <th>로그인 ID</th>
                    <th>로그인 타입</th>
                    <th>만료일시</th>
                    <th>로그인일시</th>
                    <th>로그아웃일시</th>
                    <th>OS타입</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.loginKey">
                    <td>{{item.loginKey}}</td>
                    <td>{{item.loginId}}</td>
                    <td>{{item.loginType}}</td>
                    <td>{{item.expireDate}}</td>
                    <td>{{item.loginDate}}</td>
                    <td>{{item.logoutDate}}</td>
                    <td>{{item.osType}}</td>
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