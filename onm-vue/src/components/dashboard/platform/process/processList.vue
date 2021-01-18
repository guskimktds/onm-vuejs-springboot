<template>
  <!-- <div id="app">
    <v-app id="inspire"> -->
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="프로세스 현황 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        :items-per-page="5"
        item-key="id"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
      >
      </v-data-table>

    </base-material-card>
  </v-container>
    <!-- </v-app>
  </div> -->
</template>


<script>
export default {
    props: ['pList'],
    data() {
      return {
        headers: [
          { text: '국사코드', value: 'local_gw_id' },
          { text: '프로세스타입', value: 'proc_type' },
          { text: '프로세스명', value: 'proc_name' },
          { text: '상태', value: 'proc_status' },
          { text: '보고일시(Last)', value: 'last_upd_date' },
        ]
      }
    },

    
}
</script>

<style>
    
</style>