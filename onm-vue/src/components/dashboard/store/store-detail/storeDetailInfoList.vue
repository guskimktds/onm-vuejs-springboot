<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자ID</th>
                    <th>사용자명</th>
                    <th>상품코드</th>
                    <th>상태코드</th>
                    <th>주문번호</th>
                    <th>iot target seq</th>
                    <th>ito member seq</th>
                    <th>수정일시</th>
                    <th>로컬융함GW아이디</th>
                    <th>-</th>
                    <th>-</th>
                    <th>희망처리일자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.usrName}}</td>
                    <td>{{item.productCode}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.iotTargetSeq}}</td>
                    <td>{{item.iotMemberSeq}}</td>
                    <td>{{item.modifiedDate}}</td>
                    <td>{{item.localGWId}}</td>
                    <td>{{item.tbd_01}}</td>
                    <td>{{item.tbd_02}}</td>
                    <td>{{item.approveHopeDate}}</td>
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