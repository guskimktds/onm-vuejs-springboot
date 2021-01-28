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
            title="사용자 청약 오더 상세 LIST"
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
        totalList: 0,
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '상품코드', value: 'pprodcd' },
          { text: '상품명', value: 'pprodnm' },
          { text: '오터유형', value: 'ordertype' },
          { text: '오더번호', value: 'oderno'},
          { text: '오더순번', value: 'oderseq'},
          { text: '변경유형코드', value: 'updatetype'},


          { text: '등록일시', value: 'cdate'},
          { text: '오더유형', value: 'bizpnm'},
          { text: '사업자명', value: 'oderno' },
          { text: '상품코드', value: 'oderseq' },
          { text: '파라미터타입코드', value: 'appointdate' },
          { text: '파라미터타입명칭', value: 'use_yn' },
          { text: '파라미터값', value: 'cdate' }
        ]
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

    }

}
</script>
<style>
    
</style>