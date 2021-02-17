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
            title="단말오더 처리 결과 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="dorList"
                :options.sync="options"
                :server-items-length="dorPagingInfo.total_cnt"
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>
<script>
export default {
    props: ['dorList', 'dorPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        loading:true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '오더유형', value: 'type' },   
          { text: '오더번호', value: 'oderno' },
          { text: '청약처리결과코드', value: 'resultcode' },
          { text: '청약처리결과메시지', value: 'resultmsg' },
          { text: '청약상태 통보여부', value: 'notice_yn' },
          { text: '오더처리 통보일시', value: 'notice_date' },
          { text: '청약결과 통보결과', value: 'notice_result' }
          
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true     
        const { page, itemsPerPage } = this.options
        console.log(page, itemsPerPage)
        this.$emit("pagination", this.options)
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