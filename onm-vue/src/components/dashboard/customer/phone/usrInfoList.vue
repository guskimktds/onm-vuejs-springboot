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
        title="사용자 전화번호 LIST"
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
      <template v-slot:item.mgt_status="{item}">
              <span>{{ switchString2(item.mgt_status) }}</span>
      </template>
      </v-data-table>

    </base-material-card>
  </v-container>
</template>


<script>
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      headers: [
        { text: '사용자 ID', value: 'user_id' },
        { text: '사용자 이름', value: 'user_name' },
        { text: '전화번호', value: 'tel_no' },
        { text: '전화번호 타입', value: 'auth' },
        { text: 'Sub ID(전화번호 ID)', value: 'tel_no_id' },
        { text: '알림설정권한(Y/N)', value: 'alim_auth_yn' },
        { text: '승인여부', value: 'confirm_yn' },
        { text: '승인날짜', value: 'confirm_date' },
        { text: '상태코드', value: 'status_code' },
        { text: 'Mgt 상태코드', value: 'mgt_status' },
        { text: '비고', value: 'memo' },

      ],
        last: 0,
        options: {},
        totalList: 0,
        loading: true,

    }
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '정상'
      }else if(values==='D'){
        return '삭제'
      }else if(values==='A'){
        return '접수/등록'
      }
    },
    switchString2(values){
      if(values==='X'){
        return '삭제대기'
      }else if(values==='S'){
        return '정상'
      }else if(values==='D'){
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