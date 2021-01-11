<template>
   <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
        >        
        </v-data-table>
      </div>
    </v-app>
  </div>
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