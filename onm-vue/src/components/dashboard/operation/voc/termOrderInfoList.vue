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
      title="오더정보"
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
            text: '1=오더, 2=AS',
            align: 'start',
            sortable: false,
            value: 'Order_div_code',
          },
          { text: '접수일자', value: 'Recipt_date'},
          { text: '오더번호', value: 'Order_no'},
          { text: '오더순번', value: 'Order_seq' },
          { text: '계약ID', value: 'said' },
          { text: '인터넷서비스계약ID', value: 'psaid' },
          { text: '처리희망일자', value: 'Appoint_date' },
          { text: '수용국사코드', value: 'Svc_ofc_code' },
          { text: '수용국사명칭', value: 'Svc_ofc_nm' },
          { text: '사업장명', value: 'Bzip_nm' },
          { text: '오더유형', value: 'Change_code' },
          { text: '변경유형코드', value: 'Update_type' },
          { text: '지번주소우편번호', value: 'arno_adr_zip_code' },
          { text: '지번주소기본내용', value: 'Arno_adr_bas_sbst'},
          { text: '지번주소상세내용', value: 'Arno_adr_dtl_sbst' },
          { text: '도로명우편번호', value: 'Road_nadr_zip_code' },
          { text: '도로명주소기본내용', value: 'road_nadr_bas_sbst' },
          { text: '도로명주소상세내용', value: 'road_nadr_dtls_bst' },
          { text: '영업대표사번', value: 'sales_manid' },
          { text: '영업대표명', value: 'sales_mannm' },
          { text: '영업대표번호', value: 'sales_mantelno' },
          { text: '연관오더번호', value: 'corr_orderno' },
          { text: 'I:전입 / O:전출', value: 'change_area_cd' },
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
    
}
</script>

<style scoped>
</style>>
