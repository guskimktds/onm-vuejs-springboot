<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>거래고유번호</th>
                    <th>서비스번호</th>
                    <th>시스템ID</th>
                    <th>계약ID</th>
                    <th>KTT계약ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.tranId">
                    <td>{{item.tranId}}</td>
                    <td>{{item.serviceNum}}</td>
                    <td>{{item.systemId}}</td>
                    <td>{{item.contractId}}</td>
                    <td>{{item.kttContractId}}</td>
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