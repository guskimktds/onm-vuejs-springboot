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
      title="고객이전 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
        >
          <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
          </template>

          <template v-slot:item.iot_status="{item}">
              <span>{{ switchString(item.iot_status) }}</span>
          </template>
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

// import EventBus from '../../../../EventBus';
// import axios from "axios"

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
            text: '이전 일련번호',
            align: 'left',
            sortable: false,
            value: 'mig_seq',
          },
          { text: '매장ID', value: 'user_id' },
          { text: '진행상태코드', value: 'process_code' },
          { text: '상태코드', value: 'status_code' },
          { text: '국사ID', value: 'local_gw_id' },
          { text: '이전국사ID', value: 'pre_local_gw_id' },
          { text: '이전IoT MEMBER', value: 'pre_iot_member_seq' },
          { text: '이전IoT TARGET', value: 'pre_iot_target_seq' },
          { text: '이전시작일시', value: 'mig_start_date' },
          { text: '이전종료일시', value: 'mig_end_date' },
          { text: 'Data삭제일시', value: 'data_clean_date' },
          { text: 'IoT이전상태코드', value: 'iot_status' },
        ],
  
      }
    },
    methods: {
      getDataFromApi(){
        this.loading=true;
        this.$emit("pagination", this.options);
      },
      switchString(values){
        if(values=='P'){
          return '진행'
        }else if(values=='S'){
          return '성공'
        }else if(values=='F'){
          return '실패'
        }else if(values=='A'){
          return '등록'
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
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },

   
    //   EventBus.$on('createItemTransfer', params => {
    //     console.log(params)
    //     var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15013/move_local`

    //     axios.post(url, params, this.$store.state.headers)
    //         .then((response) => {
    //           console.log(response)
    //           var resCode = response.data.res_code;
    //           var resMsg = response.data.res_msg;
    //           if(resCode == 200){
    //             //현재 목록에서 선택한 Item을 삭제한다.
    //             console.log(params)
    //             // this.pList.unshift(params)
    //           }else{
    //             alert(resCode + " / " + resMsg);
    //           }
    //         })
    //         .catch((ex) => {
    //           console.log('변경 실패',ex)
    //         })
    // })
    
}
</script>

<style scoped>
</style>>
