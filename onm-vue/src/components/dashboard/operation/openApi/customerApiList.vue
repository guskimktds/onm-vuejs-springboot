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
        title="고객별 API 목록 LIST"
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
        { text: '사이트 ID', value: 'site_id' },
        { text: '사이트 이름', value: 'site_name' },
        { text: '인터페이스 번호', value: 'api_no' },
        { text: '인터페이스 설명', value: 'description' },
        { text: '날짜', value: 'reg_date' },
        { text: 'API 접속 제한량', value: 'api_access_limit' },
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