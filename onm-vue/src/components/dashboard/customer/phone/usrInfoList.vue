<template>
    <!-- <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사용자ID</th>
                    <th>전화번호</th>
                    <th>전화번호 타입</th>
                    <th>사용자 이름</th>
                    <th>Sub ID(전화번호 ID)</th>
                    <th>알림설정권한(Y/N)</th>
                    <th>승인여부</th>
                    <th>승인날자</th>
                    <th>상태 코드</th>
                    <th>mgt 상태코드</th>
                    <th>비고</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.usrId">
                    <td>{{item.usrId}}</td>
                    <td>{{item.phoneNumber}}</td>
                    <td>{{item.numberType}}</td>
                    <td>{{item.usrName}}</td>
                    <td>{{item.subId}}</td>
                    <td>{{item.alarmAuth}}</td>
                    <td>{{item.approve}}</td>
                    <td>{{item.approveDate}}</td>
                    <td>{{item.statusCode}}</td>
                    <td>{{item.mgtCode}}</td>
                    <td>{{item.etc}}</td>
                </tr>
            </tbody>
        </table>
    </div> -->

    <div id="app">
        <v-app id="inspire">
            <v-data-table
                :headers="headers"
                :items="List"
                :items-per-page="5"
                 item-key="usrId"
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
    props: ['List'],
    data() {
      return {
        headers: [
          {
            text: '사용자ID',
            align: 'start',
            sortable: false,
            value: 'usrId',
          },
          { text: '전화번호', value: 'phoneNumber'},
          { text: '전화번호 타입', value: 'numberType' },
          { text: '사용자 이름', value: 'usrName' },
          { text: 'Sub ID(전화번호 ID)', value: 'subId' },
          { text: '알람설정권한(Y/N)', value: 'alarmAuth' },
          { text: '승인여부', value: 'approve' },
          { text: '승인날짜', value: 'approveDate' },
          { text: '상태 코드', value: 'statusCode' },
          { text: 'mgt 상태코드', value: 'mgtCode' },
          { text: '비고', value: 'etc' },
        ]
      }
    }
}
     
</script>

<style scoped>
    
</style>