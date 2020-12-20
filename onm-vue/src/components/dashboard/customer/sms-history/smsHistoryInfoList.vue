<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>시퀀스 ID</th>
                    <th>발송 전화번호</th>
                    <th>OTP 번호</th>
                    <th>발송 메세지 내용</th>
                    <th>발송 결과 코드</th>
                    <th>발송 요청 시간</th>
                    <th>수정일</th>
                    <th>SMS 발송서버명</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.seqID">
                    <td>{{item.seqID}}</td>
                    <td>{{item.phoneNum}}</td>
                    <td>{{item.otpNum}}</td>
                    <td>{{item.message}}</td>
                    <td>{{item.sendCode}}</td>
                    <td>{{item.sendTime}}</td>
                    <td>{{item.modifiedDate}}</td>
                    <td>{{item.sendServerInfo}}</td>
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