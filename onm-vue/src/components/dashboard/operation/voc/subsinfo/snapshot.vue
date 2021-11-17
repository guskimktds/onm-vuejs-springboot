<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader" 
            title="스냅샷 정보"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                :options.sync="options"
                :server-items-length="snPagingInfo.total_cnt"
                class="elevation-0"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
                
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>

export default {
    props: ['pList','snPagingInfo'],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '계약ID',
            sortable: false, value: 'said', class: 'my-header-style'
          },
          { text: '오더번호', value: 'oderno', class: 'my-header-style'},
          { text: '사용자ID', value: 'user_id', class: 'my-header-style'},
          { text: '스냅샷', value: 'snapshot', class: 'my-header-style'},
          { text: '등록일시', value: 'reg_date', class: 'my-header-style'},
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
      if(this.last!==this.snPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.snPagingInfo.total_cnt!==undefined){
      this.last=this.snPagingInfo.total_cnt
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