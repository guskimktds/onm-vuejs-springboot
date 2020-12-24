<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>거래고유번호</th>
                    <th>계약자구분</th>
                    <th>전화번호</th>
                    <th>생성일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.tranId">
                    <td>{{item.tranId}}</td>
                    <td>{{item.contractType}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.createDate}}</td>
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