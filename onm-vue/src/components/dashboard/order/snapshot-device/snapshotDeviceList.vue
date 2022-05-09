<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>오더번호</th>
                    <th>사용자 ID</th>
                    <th>스냅샷</th>
                    <th>등록 일자</th>
                    <th>롤백 일자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.orderNumber">
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.snapshot}}</td>
                    <td>{{item.registerDate}}</td>
                    <td>{{item.rollbackDate}}</td>
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