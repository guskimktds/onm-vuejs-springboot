<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자ID</th>
                    <th>상품코드</th>
                    <th>상품이름</th>
                    <th>상품유형</th>
                    <th>상품개수</th>
                    <th>등록일시</th>
                    <th>수정일시</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.productCode}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.productType}}</td>
                    <td>{{item.productCnt}}</td>
                    <td>{{item.addDate}}</td>
                    <td>{{item.modifiedDate}}</td>
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