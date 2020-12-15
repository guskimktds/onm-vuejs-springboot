<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>WOWZA 서버 인덱스</th>
                    <th>프로토콜</th>
                    <th>사설IP</th>
                    <th>공인IP</th>
                    <th>스트림주소</th>
                    <th>포트</th>
                    <th>계정</th>
                    <th>패스워드</th>
                    <th>RTSP 포트</th>
                    <th>RTMP 포트</th>
                    <th>RTMPS 포트</th>
                    <th>WOWZA URL</th>
                    <th>WOWZA 상태</th>
                    <th>GLS 여부</th>
                    <th>GLS RTC 포트</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.vo1">
                    <td>{{item.vo1}}</td>
                    <td>{{item.vo2}}</td>
                    <td>{{item.vo3}}</td>
                    <td>{{item.vo4}}</td>
                    <td>{{item.vo5}}</td>
                    <td>{{item.vo6}}</td>
                    <td>{{item.vo7}}</td>
                    <td>{{item.vo8}}</td>
                    <td>{{item.vo9}}</td>
                    <td>{{item.vo10}}</td>
                    <td>{{item.vo11}}</td>
                    <td>{{item.vo12}}</td>
                    <td>{{item.vo13}}</td>
                    <td>{{item.vo14}}</td>
                    <td>{{item.vo15}}</td>
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