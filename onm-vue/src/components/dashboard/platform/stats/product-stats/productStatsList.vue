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
        title="상품통계 LIST"
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
        { text: '상품명', value: 'prod_name' },
        { text: '일자목록', value: 'date_list' },
        { text: '희망일', value: 'appoint_date' },
        { text: '카운트', value: 'cnt' },
      ],
    }
  },


}
</script>

<style>
    
</style>