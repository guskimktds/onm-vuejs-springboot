<template>
    <!-- <div id="app">
      <v-app id="inspire">
          <v-data-table
              :headers="headers"
              :items="List"
              :items-per-page="5"
                item-key="usrId"
              class="elevation-1"
              :style="`background-color: #d6f5e5`"
          >
          </v-data-table>
      </v-app>
    </div> -->
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="orange"
            dark
            icon="mdi-keyboard"
            title="사용자 전화번호 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['pList', 'title'],
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