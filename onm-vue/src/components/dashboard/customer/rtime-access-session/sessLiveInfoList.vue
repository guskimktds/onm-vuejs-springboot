<template>
    <div id="app">
        <v-app id="inspire">
            <v-data-table
                :headers="headers"
                :items="List"
                :items-per-page="5"
                 item-key="loginKey"
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
            text: '로그인 키',
            align: 'start',
            sortable: false,
            value: 'loginKey',
          },
          { text: '사용자 ID', value: 'usrId'},
          { text: '전화번호', value: 'phoneNumber' },
          { text: '전화번호 타입', value: 'numberType' },
          { text: 'ip', value: 'ip' },
          { text: '만료일', value: 'expireDate' },
          { text: '장치타입', value: 'deviceType' }
        ]
      }
    }
}
     

</script>
<style>
    
</style>