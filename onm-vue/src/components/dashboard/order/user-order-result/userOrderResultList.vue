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
            title="사용자 청약 오더 처리 결과 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          {
            text: '계약ID', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '오더유형', value: 'ordertype' },
          { text: '처리코드', value: 'resultcode' },
          { text: '처리메세지', value: 'resultmsg' },
          { text: '등록일시', value: 'regdate'},
          { text: '청약상태 통보여부', value: 'notice_yn'},
          { text: '청약상태 통보일시', value: 'notice_date' },
          { text: '청약상태 통보결과', value: 'notice_result' }
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

      fakeApiCall () {
        return new Promise((resolve) => {
          const {page, itemsPerPage } = this.options

          let items = this.props.pList
          console.log(items)
          const total = items.length

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            resolve({
              items,
              total,
            })
          }, 1000)
        })
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