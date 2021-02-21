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
      title="고객이전 단말 상태 LIST"
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
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '이전일련번호',
            align: 'start',
            sortable: false,
            value: 'mig_seq',
          },
          { 
            text: '이전 디바이스ID', 
            value: 'pre_device_id',
          },
          { 
            text: '장치ID', 
            value: 'device_id',
          },
          { text: '단말종류', value: 'device_type' },
          { text: '진행상태코드', value: 'process_code' },
          { text: '상태코드', value: 'status_code' },
          { text: '고객이전 전 상태코드', value: 'pre_status_code' },
          { text: '등록일', value: 'reg_date' },
          { text: '수정일', value: 'mod_date' }
        ]
      }
    }
    

}
</script>

<style scoped>
</style>>
