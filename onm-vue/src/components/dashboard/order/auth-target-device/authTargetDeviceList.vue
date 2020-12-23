<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>단말ID</th>
                    <th>오더번호</th>
                    <th>mac_id</th>
                    <th>관리 상태코드</th>
                    <th>제품코드</th>
                    <th>모델명</th>
                    <th>단말인증결과코드</th>
                    <th>개통오더번호</th>
                    <th>인증일시</th>
                    <th>삭제일시</th>
                    <th>등록일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.deviceId">
                    <td>{{item.deviceId}}</td>
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.mac_id}}</td>
                    <td>{{item.manageStatusCode}}</td>
                    <td>{{item.deviceCode}}</td>
                    <td>{{item.modelName}}</td>
                    <td>{{item.responseCode}}</td>
                    <td>{{item.openOrderNum}}</td>
                    <td>{{item.authDate}}</td>
                    <td>{{item.deleteDate}}</td>
                    <td>{{item.registDate}}</td>
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