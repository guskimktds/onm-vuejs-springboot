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
        title="사용자 전화번호"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="pnList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
      </template>
      <template v-slot:item.mgt_status="{item}">
              <span>{{ switchString2(item.mgt_status) }}</span>
      </template>
      </v-data-table>
    </base-material-card>

  </v-container>  
</template>

<script>
export default {
    props: ['pnList', 'resPagingInfo'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
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
          text: "매장ID", align: "start",
          sortable: false, value: "user_id",
        },
        { text: "전화번호", value: "tel_no" },
        
        { text: "권한", value: "auth" },
        { text: "사용자이름", value: "user_name" },
        { text: "전화번호ID", value: "tel_no_id" },
        { text: "알림설정권한", value: "alim_auth_yn" },
        { text: "승인여부", value: "confirm_yn" },
        { text: "승일인날짜", value: "confirm_date" },
        { text: "상태코드", value: "status_code" },
        { text: "mgt상태코드", value: "mgt_status" },
        { text: "비고", value: "memo" },
      ],
    };
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },

    switchString(value){
      if(value=='S'){
        return '정상'
      }else if(value=='D'){
        return '삭제'
      }else if(value=='A'){
        return '접수/등록'
      }
    },
    switchString2(value){
      if(value=='X'){
        return '삭제대기'
      }else if(value=='S'){
        return '정상'
      }else if(value=='D'){
        return '삭제'
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
    if(this.last!==this.kttPagingInfo.total_cnt){
      this.options.page=1
    }
    if(this.kttPagingInfo.total_cnt!==undefined){
    this.last=this.kttPagingInfo.total_cnt
    }
  },
 

}

</script>
<style>

</style>