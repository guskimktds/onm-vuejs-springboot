<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>거래고유번호</th>
                    <th>계약ID</th>
                    <th>상품코드</th>
                    <th>기가아이즈 모상품명</th>
                    <th>사업자명</th>
                    <th>오더유형</th>
                    <th>오더번호</th>
                    <th>오더순번</th>
                    <th>변경유형코드</th>
                    <th>처리희망일자</th>
                    <th>사용여부</th>
                    <th>생성일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.tranId">
                    <td>{{item.tranId}}</td>
                    <td>{{item.contractId}}</td>
                    <td>{{item.productCode}}</td>
                    <td>{{item.moProductName}}</td>
                    <td>{{item.storeName}}</td>
                    <td>{{item.orderType}}</td>
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.orderSeq}}</td>
                    <td>{{item.changeTypeCode}}</td>
                    <td>{{item.hopeDate}}</td>
                    <td>{{item.usageType}}</td>
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