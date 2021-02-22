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
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
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
          { text: '전체', value: 'total_cnt' },
          { text: '정상', value: 'normal_cnt' },
          { text: '개통대기', value: 'waiting_cnt' },
          { text: '개통진행', value: 'proc_cnt' },
          { text: '개통실패', value: 'disconn_cnt' },
          { text: '네트워크장애', value: 'fail_cnt' },

        ]
      }
    }
}
</script>

<style>
    
</style>