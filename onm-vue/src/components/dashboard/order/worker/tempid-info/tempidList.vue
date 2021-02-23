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
        title="TEMP ID 정보 LIST"
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
      <template v-slot:item.resultcode="{item}">
              <span>{{ switchString(item.resultcode) }}</span>
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
        { text: 'GUID', value: 'guid' },
        { text: '서비스계약아이디', value: 'said' },
        { text: '오더번호', value: 'oderno' },
        { text: '오더순번', value: 'oderseq' },
        { text: '요청구분', value: 'requesttypecd' },
        { text: '오더구분', value: 'oderdivcd' },
        { text: '전화번호', value: 'spotwrkrtelno' },
        { text: '처리결과 코드', value: 'resultcode' },
        { text: '처리결과 메세지', value: 'resultmsg' },
        { text: '등록일', value: 'reg_date' },
      ],
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
        if(values==='200'){
          return '성공'
        }else if(values==='204'){
          return '성공'
        }else if(values==='401'){
          return '실패'
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
    mounted () {
      this.getDataFromApi()
    }
}
</script>

<style>
    
</style>