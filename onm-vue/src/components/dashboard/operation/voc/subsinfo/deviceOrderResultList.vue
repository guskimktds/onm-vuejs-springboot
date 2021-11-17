<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="단말오더 처리 결과 확인"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="dorList"
                hide-default-header
                :options.sync="options"
                :server-items-length="dorPagingInfo.total_cnt"
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

              <template v-slot:item.notice_yn="{item}">
                <span>{{ switchString(item.notice_yn) }}</span>
              </template>  

            </v-data-table>
        </base-material-card>
    </v-container>
</template>
<script>
export default {
    props: ['dorList', 'dorPagingInfo'],
    data() {
      return {
        last: 0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        pageoptions: this.$store.state.pageoptions,
        loading:true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid', class: 'my-header-style'
          },
          { text: '오더유형', value: 'ordertype', class: 'my-header-style' },   
          { text: '오더번호', value: 'oderno', class: 'my-header-style' },
          { text: '청약처리결과코드', value: 'resultcode', class: 'my-header-style' },
          { text: '청약처리결과메시지', value: 'resultmsg', class: 'my-header-style' },
          { text: '청약상태 통보여부', value: 'notice_yn', class: 'my-header-style' },
          { text: '오더처리 통보일시', value: 'notice_date', class: 'my-header-style' },
          { text: '청약결과 통보결과', value: 'notice_result', class: 'my-header-style' }
          
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true     
        const { page, itemsPerPage } = this.options
        console.log(page, itemsPerPage)
        this.$emit("pagination", this.options)
      },

       switchString(values){
      if(values==='T'){
        return '청약취소'
      }else if(values==='Y'){
        return '통보완료'
      }else if(values==='N'){
        return '미통보'
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
      if(this.last!==this.dorPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dorPagingInfo.total_cnt!==undefined){
      this.last=this.dorPagingInfo.total_cnt
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