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
        @click:row="handleClick"
      >
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
        options: {},
        totalList: 0,
        loading: true,

    }
  },
    methods: {
      handleClick:function(value){
        this.$emit("child",value.said)
      },
      getDataFromApi () {
        this.loading = true
        this.$emit("pagination", this.options)
      },
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    mounted () {
      this.getDataFromApi()
    }
}
</script>

<style>
    
</style>