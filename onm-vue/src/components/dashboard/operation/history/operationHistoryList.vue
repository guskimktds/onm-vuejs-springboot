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
            title="처리 이력 LIST"
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
            <template v-slot:item.result_code="{item}">
              <span>{{ switchString(item.result_code) }}</span>
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
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
        headers: [
          {
            text: '사번',
            align: 'start',
            sortable: false,
            value: 'onm_user_id',
          },
          { 
            text: '이름', 
            value: 'name',
          },
          { text: '권한그룹', value: 'auth_group_id' },
          { text: '호출IP주소', value: 'client_ip_addr' },
          { text: '호출uri', value: 'proc_api_uri' },
          { text: '유형', value: 'cmd_type' },
          { text: '요청메세지', value: 'request_msg' },
          { text: '결과코드', value: 'result_code' },
          { text: '마스킹(Y/N)', value: 'is_masking' },
          { text: '호출일시', value: 'reg_date' },
          { text: '응답메시지', value: 'response_msg' }
        ]
      }
    },
    methods:{
       getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
      },
    
      switchString(values){
      if(values===200){
        return '성공'
      }else{
        return '실패'
      }
    }
  },
   watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  // mounted() {
  //   this.getDataFromApi();
  // },
    
}
</script>

<style scoped>
</style>>
