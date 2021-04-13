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
      title="사용자 청약 오더 정보 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >          
      </v-data-table>
  </base-material-card>

  </v-container>
</template>

<script>

// import EventBus from '../../../../../EventBus';

export default {
    props: ['pList', 'resPagingInfo'],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'left',
            sortable: false, value: 'guid',
          },
          { text: '계약ID', value: 'said' , align: 'left'},
          { text: '상품코드', value: 'pprodcd' , align: 'left'},
          { text: '기가아이즈 모상품명', value: 'pprodnm' , align: 'left'},
          { text: '사업자명', value: 'bizpnm' , align: 'left'},
          { text: '오더번호', value: 'oderno' , align: 'left'},
          { text: '오더순번', value: 'oderseq' , align: 'left'},
          { text: '처리희망일자', value: 'appointdate' , align: 'left'},
          { text: '처리여부', value: 'use_yn' , align: 'left'},
          { text: '등록일시', value: 'cdate' , align: 'left' },
          { text: 'OSS 통보', value: 'notice_yn' , align: 'left' },
          { text: 'KTT 고객', value: 'ktt_user_yn' , align: 'left' }
        ]
      }
    },

methods: {
    handleClick: function(value){
      this.$emit("child", value.guid);
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
    
}
</script>
<style>
    
</style>