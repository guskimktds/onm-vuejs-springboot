<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="pList"
        item-key="id"
        class="elevation-1"
      >
      </v-data-table>
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
          { text: '전체', value: 'cam_cnt' },
          { text: '정상', value: 'status_code' },
          { text: '개통대기', value: 'waiting_cam_cnt' },
          { text: '개통진행', value: 'proc_cam_cnt' },
          { text: '개통실패', value: 'open_fail_cam_cnt' },
          { text: '네트워크장애', value: 'networkfail_cam_cnt' },
        ]
      }
    }
}
</script>

<style>
    
</style>