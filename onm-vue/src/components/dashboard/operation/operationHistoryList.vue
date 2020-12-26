<template>
  <div>
        <table  class="contents">
            <thead>
                <tr>
                    <th>사번</th><th>이름</th><th>작업</th><th>접속IP</th><th>권한</th><th>생성일자</th><th>수정일자</th><th>생성자</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(history,index) in operationHistoryList" :key="index">
                    <td>{{history.id}}</td>
                    <td>{{history.name}}</td>
                    <td>{{history.job}}</td>
                    <td>{{history.ip}}</td>
                    <td>{{history.auth}}</td>
                    <td>{{history.createDate}}</td>
                    <td>{{history.updateDate}}</td>
                    <td>{{history.editUser}}</td>
                    <!-- <td>
                        <button>수정</button>
                        <button>X</button>
                    </td> -->
                </tr>
            </tbody>
        </table>      
  </div>
</template>

<script>
export default {
    props: ['operationHistoryList']

}
</script>

<style scoped>
 /* table, tr, id {
     border: 1px solid blue;
 } */
 /* td:nth-last-of-type(-n+2) {
     text-align: right;
 } */
</style>>
