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
        title="개통/해지 추이 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
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
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
        headers: [
          { text: '일자', value: 'date', align:'left' },
          { text: '신규 매장 수', value: 'user_new_cnt', align:'left'},
          { text: '해지 매장 수', value: 'user_close_cnt', align:'left' },
          { text: '개통 카메라 수', value: 'cam_open_cnt', align:'left' },
          { text: '해지 카메라 수', value: 'cam_close_cnt', align:'left' },
          { text: '개통 iot 수', value: 'iot_open_cnt', align:'left' },
          { text: '해지 iot 수', value: 'iot_close_cnt', align:'left' },
        ]
      }
    },
}

</script>


<style>
    
</style>