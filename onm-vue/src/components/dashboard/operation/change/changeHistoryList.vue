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
            title="[매장]관리자 변경 이력 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="resPaginginfo.total_cnt"
                class="elevation-1"
                :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
                :header-props="{ sortIcon: null }"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['pList','resPaginginfo'],
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
            text: '관리자ID',
            align: 'start',
            sortable: false,
            value: 'admin_id',
          },
          { 
            text: '매장ID', 
            value: 'user_id',
          },
          { text: '전화번호', value: 'tel_no' },
          { text: '삭제여부', value: 'del_yn' },
          { text: '관리자구분', value: 'admin_type' },
          { text: '등록일', value: 'reg_date' },
          { text: '수정일', value: 'mod_date' },
          // { text: '생성자', value: 'editUser' },
        ]
      }
    },
    methods: {
       getDataFromApi() {
        this.loading = true;
        this.$emit("pagination", this.options);
      },
    },
    watch:{
      options:{
        handler(){
          this.getDataFromApi();
        },
        deep: true
      }
    },
    updated() {
      if(this.last!==this.resPaginginfo.total_cnt){
        this.options.page=1
      }
      if(this.resPaginginfo.total_cnt!==undefined){
      this.last=this.resPaginginfo.total_cnt
      }
  },
    mounted(){
      this.getDataFromApi();
    }

    //<th>사번</th><th>이름</th><th>작업</th><th>접속IP</th>
    //<th>권한</th><th>생성일자</th><th>수정일자</th><th>생성자</th>

}
</script>

<style scoped>
 /* table, tr, id {
     border: 1px solid blue;
 } */
 /* td:nth-last-of-type(-n+2) {
     text-align: right;
 } */
</style>>
