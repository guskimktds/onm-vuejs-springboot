<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자 ID</th>
                    <th>서비스번호</th>
                    <th>시스템ID</th>
                    <th>단말설치여부</th>
                    <th>상태 코드</th>
                    <th>등록일시</th>
                </tr>
            </thead>
            <tbody>  
                <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.serviceNum}}</td>
                    <td>{{item.systemId}}</td>
                    <td>{{item.installStatus}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.addDate}}</td>
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