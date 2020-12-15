<template>
    <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>국사코드</th>
                    <th>전체</th>
                    <th>정상</th>
                    <th>개통대기</th>
                    <th>개통진행</th>
                    <th>개통실패</th>
                    <th>네트워크장애</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.code">
                    <td>{{item.code}}</td>
                    <td>{{item.totalCnt}}</td>
                    <td>{{item.normalCnt}}</td>
                    <td>{{item.waitCnt}}</td>
                    <td>{{item.procCnt}}</td>
                    <td>{{item.failCnt}}</td>
                    <td>{{item.networkFailCnt}}</td>
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