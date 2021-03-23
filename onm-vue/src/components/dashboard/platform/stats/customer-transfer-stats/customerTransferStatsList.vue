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
        title="고객이전 통계 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
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
        { text: '이전실행일자', value: 'mig_start_date' },
        { text: '이전완료', value: 'new_cnt' },
        { text: '진행중', value: 'process_cnt' },
        { text: '실패', value: 'fail_cnt' },
      ],
    }
  },


}
</script>

<style>
    
</style>