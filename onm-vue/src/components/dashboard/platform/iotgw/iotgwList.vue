<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="IoT GW 현황 LIST"
        class="px-5 py-3"
      >

        <v-data-table
          :headers="headers"
          :items="pList"
          item-key="id"
          class="elevation-1"
        >
        </v-data-table>

    </base-material-card>
  </v-container>
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