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
        title="단말통계 LIST"
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
  props: ['pList'],
  data() {
    return {
      headers: [
        { text: '희망일자', value: 'appoint_date' },
        { text: '신규 청약 수', value: 'new_cnt' },
        { text: '변경 청약수', value: 'change_cnt' },
        { text: '일시정지 청약수', value: 'pause_cnt' },
        { text: '부활 청약 수', value: 'restore_cnt' },
        { text: '해지 청약 수', value: 'cloase_cnt' },
      ],
    }
  },


}
</script>

<style>
    
</style>