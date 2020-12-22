<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>상품번호</th>
                    <th>사용자ID</th>
                    <th>사용자별 변경 저장기간</th>
                    <th>IP 카메라대수</th>
                    <th>POS 카메라대수</th>
                    <th>전체 카메라대수</th>
                    <th>서브ID 개수</th>
                    <th>해상도</th>
                    <th>IoTGW 대수</th>
                    <th>수정일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.productCode">
                    <td>{{item.productCode}}</td>
                    <td>{{item.usrId}}</td>
                    <td>{{item.savePeriod}}</td>
                    <td>{{item.ipCamCnt}}</td>
                    <td>{{item.posCamCnt}}</td>
                    <td>{{item.allCamCnt}}</td>
                    <td>{{item.subIdCnt}}</td>
                    <td>{{item.resolution}}</td>
                    <td>{{item.iotGWCnt}}</td>
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