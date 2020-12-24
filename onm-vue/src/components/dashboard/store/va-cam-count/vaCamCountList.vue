<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자ID</th>
                    <th>상품번호</th>
                    <th>VA 명</th>
                    <th>VA 개수</th>
                </tr>
            </thead>
            <tbody>
              <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.productCode}}</td>
                    <td>{{item.vaName}}</td>
                    <td>{{item.vaCount}}</td>
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