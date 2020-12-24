<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>카메라 ID</th>
                    <th>카메라 IP</th>
                    <th>카메라명</th>
                    <th>mac_id</th>
                    <th>모델명</th>
                    <th>펌웨어 버전 정보</th>
                    <th>제조사</th>
                    <th>서비스 상태코드</th>
                    <th>관리상태코드</th>
                    <th>해상도</th>
                    <th>카메라 수정일자</th>
                    <th>개통일시</th>
                    <th>해지일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.camId">
                    <td>{{item.camId}}</td>
                    <td>{{item.camIp}}</td>
                    <td>{{item.camName}}</td>
                    <td>{{item.macId}}</td>
                    <td>{{item.modelName}}</td>
                    <td>{{item.firmwareVer}}</td>
                    <td>{{item.manufacturer}}</td>
                    <td>{{item.serviceCode}}</td>
                    <td>{{item.manageCode}}</td>
                    <td>{{item.resolution}}</td>
                    <td>{{item.modifiedDate}}</td>
                    <td>{{item.openDate}}</td>
                    <td>{{item.closeDate}}</td>
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