<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>단만 GW ID</th>
                    <th>단말GWID</th>
                    <th>단말GW명</th>
                    <th>단말모델코드</th>
                    <th>mac_id</th>
                    <th>IOT장치seq</th>
                    <th>서비스 상태코드</th>
                    <th>등록일시</th>
                    <th>개통일시</th>
                    <th>관리자상태코드</th>
                    <th>해지일시</th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="item in pList" :key="item.gwKey">
                    <td>{{item.gwKey}}</td>
                    <td>{{item.gwId}}</td>
                    <td>{{item.gwName}}</td>
                    <td>{{item.modelCode}}</td>
                    <td>{{item.mac_id}}</td>
                    <td>{{item.iotDeviceSeq}}</td>
                    <td>{{item.serviceCode}}</td>
                    <td>{{item.addDate}}</td>
                    <td>{{item.openDate}}</td>
                    <td>{{item.manageCode}}</td>
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