<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="accountList"
        :items-per-page="5"
        item-key="id"
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
    props: ['accountList'],
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
          { text: '접속지', value: 'ip' },
          { text: '권한', value: 'auth' },
          { text: '생성일자', value: 'createDate' },
          { text: '수정일자', value: 'updateDate' },
          { text: '생성자', value: 'editUser' },
        ]
      }
    }
}
</script>

<style>

</style>