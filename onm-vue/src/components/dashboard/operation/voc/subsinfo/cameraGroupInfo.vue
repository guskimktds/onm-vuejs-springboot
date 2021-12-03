<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"
            title="카메라 그룹 정보(12월 개발 예정)"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                hide-default-footer
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-0"
                
            >   
              <template v-slot:header="{ props: { headers } }">
                <thead>
                  <tr>
                    <th v-for="h in headers" :class="h.class" v-bind:key="h">
                      <span>{{h.text}}</span>
                    </th>
                  </tr>
                </thead>
              </template>        
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '거래고유번호',
            sortable: false, value: 'guid', class: 'my-header-style'
          },
          { text: '오더번호', value: 'oderno', class: 'my-header-style'},
          { text: '오더순번', value: 'oderseq', class: 'my-header-style'},
          { text: '사용여부', value: 'use_yn', class: 'my-header-style'},
          { text: '처리희망일자', value: 'appointdate', class: 'my-header-style'},
          { text: '오더유형', value: 'ordertype', class: 'my-header-style'},
          { text: '사업장명', value: 'bizpnm', class: 'my-header-style'},
          { text: '상품코드', value: 'prodcd', class: 'my-header-style'},
          { text: '파라미터타입코드', value: 'paramtypecd', class: 'my-header-style'},
          { text: '파라미터타입명칭', value: 'paramtypenm', class: 'my-header-style'},
          { text: '파라미터값', value: 'paramvalue', class: 'my-header-style'},
        ]
      }
    },
    methods: {
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
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
    
</style>