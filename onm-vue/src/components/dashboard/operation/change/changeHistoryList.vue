<template>
  <!-- <div>
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
                    <td>
                        <button>수정</button>
                        <button>X</button>
                    </td>
                </tr>
            </tbody>
        </table>      
  </div> -->

  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="changeHistoryList"
        :items-per-page="5"
        item-key="seq"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
      >
        <!-- <template v-slot:expanded-item="{ headers }" :style="`background-color: red`">
          <td :colspan="headers.length">
            <List></List>
          </td>
        </template>       -->
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
export default {
    props: ['changeHistoryList'],
    data() {
      return {
        headers: [
          {
            text: '사번',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { 
            text: '이름', 
            value: 'name',
          },
          { text: 'JOB', value: 'job' },
          { text: '접속지', value: 'ip' },
          { text: '권한', value: 'auth' },
          { text: '생성일자', value: 'createDate' },
          { text: '수정일자', value: 'updateDate' },
          { text: '생성자', value: 'editUser' },
        ]
      }
    }

    //<th>사번</th><th>이름</th><th>작업</th><th>접속IP</th>
    //<th>권한</th><th>생성일자</th><th>수정일자</th><th>생성자</th>

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
