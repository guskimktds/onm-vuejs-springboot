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
        title="청약통계 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
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
        { text: '희망일자', value: 'appointdate', align: 'left'},
        { text: '신규 청약 수', value: 'new_cnt', align: 'left'},
        { text: '변경 청약수', value: 'change_cnt', align: 'left' },
        { text: '일시정지 청약수', value: 'pause_cnt', align: 'left' },
        { text: '부활 청약 수', value: 'restore_cnt', align: 'left' },
        { text: '해지 청약 수', value: 'close_cnt', align: 'left' },
      ],
    }
  },


}
</script>

<style>
    
</style>