<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="인증 대상 단말 정보 LIST"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="authList"
                hide-default-header
                :options.sync="options"
                :server-items-length="authPagingInfo.total_cnt"
                class="elevation-0"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
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

              <template v-slot:item.mgt_status="{item}">
                <span>{{ switchString(item.mgt_status) }}</span>
              </template>
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['authList', 'authPagingInfo'],
    data() {
      return {
        last: 0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          { text: '오더번호', align: 'start', 
            sortable: false, value: 'oderno', class: 'my-header-style'
             },
          { text: '단말ID', value: 'terminal_id', class: 'my-header-style' },
          { text: '계약ID', value: 'said', class: 'my-header-style'},
          { text: 'MAC ID', value: 'mac_id', class: 'my-header-style' },
          { text: '관리상태코드', value: 'mgt_status', class: 'my-header-style' },
          { text: '제품코드', value: 'productcode', class: 'my-header-style' },
          { text: '모델명', value: 'modelname', class: 'my-header-style' },          
          { text: '단말인증결과코드', value: 'termauthcode', class: 'my-header-style' },
          { text: '개통오더번호', value: 'open_oderno', class: 'my-header-style' },
          { text: '인증일', value: 'auth_date', class: 'my-header-style' },
          { text: '삭제일', value: 'close_date', class: 'my-header-style' },
          { text: '등록일', value: 'reg_date', class: 'my-header-style' } 
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.$emit("pagination", this.options)
      },
      switchString(values){
      if(values==='S'){
        return '정상'
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
      if(this.last!==this.authPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.authPagingInfo.total_cnt!==undefined){
      this.last=this.authPagingInfo.total_cnt
      }
  },

}
</script>

<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
  /* background-color: #3333FF; */
}

</style>