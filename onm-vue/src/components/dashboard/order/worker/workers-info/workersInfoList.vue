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
        title="현장작업자 LIST"
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
        { text: '서비스계약아이디', value: 'said' },
        { text: '오더번호', value: 'oderno' },
        { text: '일련번호', value: 'id_seq' },
        { text: '전화번호', value: 'tel_no' },
        { text: '오더구분', value: 'oderdivcd' },
        { text: '상태코드', value: 'status_code' },
        { text: '삭제유형', value: 'close_type' },
        { text: '삭제일시', value: 'close_date' },
        { text: '등록일', value: 'reg_date' },
      ],
        last: 0,
        options: {},
        totalList: 0,
        loading: true,

    }
  },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.$emit("pagination", this.options)
      },
      switchString(values){
        if(values==='S'){
          return '사용중'
        }else if(values==='D'){
          return '삭제'
        }
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
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
    mounted () {
      this.getDataFromApi()
    }
}
</script>

<style>
    
</style>