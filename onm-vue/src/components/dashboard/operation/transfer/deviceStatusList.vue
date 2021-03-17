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
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        >        
          <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
          </template>

          <template v-slot:item.pre_status_code="{item}">
              <span>{{ switchString2(item.pre_status_code) }}</span>
          </template>
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
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
    },
    methods:{
       switchString(values){
        if(values==='P'){
          return '진행'
        }else if(values==='S'){
          return '성공'
        }else if(values==='F'){
          return '실패'
        }else if(values==='A'){
          return '등록'
        }
      },
      switchString2(values){
        if(values==='P'){
          return '진행'
        }else if(values==='S'){
          return '성공'
        }else if(values==='F'){
          return '실패'
        }else if(values==='A'){
          return '등록'
        }
      },
      getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
  mounted() {
    this.getDataFromApi();
  },
    
}
</script>

<style scoped>
</style>>
