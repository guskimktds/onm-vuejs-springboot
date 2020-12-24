<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>계약ID</th>
                    <th>사용자ID</th>
                    <th>사용자명</th>
                    <th>사용자 전화번호</th>
                    <th>상태코드</th>
                    <th>로컬융함GW아이디</th>
                    <th>해상도</th>
                    <th>전체 카메라 대수</th>
                    <th>정상 카메라 대수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.contractId">
                    <td>{{item.contractId}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.usrName}}</td>
                    <td>{{item.usrNumber}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.localGWId}}</td>
                    <td>{{item.resolution}}</td>
                    <td>{{item.camAllCount}}</td>
                    <td>{{item.camSuccessCount}}</td>
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