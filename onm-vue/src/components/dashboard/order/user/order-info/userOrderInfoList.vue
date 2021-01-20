<template>
   <!-- <div id="app">
    <v-app id="inspire">
      <div>
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
        >          
        </v-data-table>
      </div>      
    </v-app>
  </div> -->
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
  <!-- <base-material-card
      icon="mdi-clipboard-text"
      title="Simple Table"
      class="px-5 py-3"
    > -->
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="사용자 청약 오더 정보 LIST"
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

// import EventBus from '../../../../../EventBus';

export default {
    props: ['pList', 'resPagingInfo'],
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
          { text: '계약ID', value: 'said'},
          { text: '상품코드', value: 'pprodcd'},
          { text: '기가아이즈 모상품명', value: 'pprodnm'},
          { text: '사업자명', value: 'bizpnm'},
        //   { text: '오더유형', value: 'type' },
          { text: '오더번호', value: 'oderno' },
          { text: '오더순번', value: 'oderseq' },
        //   { text: '변경유형코드', value: 'useYn' },
          { text: '처리희망일자', value: 'appointdate' },
          { text: '사용여부', value: 'use_yn' },
          { text: '생성일시', value: 'cdate' }
        ]
      }
    },
    methods: {
      handleClick: function(value){
        console.log(value)
        this.$emit("child", value.guid);
      },

      getDataFromApi () {
        // console.log(this.resPagingInfo)
        this.loading = true
        // this.fakeApiCall().then(data => {
        //   this.desserts = data.items
        // this.totalList = this.resPagingInfo.total_page_cnt
        //   this.loading = false
        // })

        const { page, itemsPerPage } = this.options
        console.log(page, itemsPerPage)
        this.$emit("pagination", this.options)
      },

      fakeApiCall () {
        return new Promise((resolve) => {
          const {page, itemsPerPage } = this.options

          // let items = this.getDesserts()
          let items = this.props.pList
          console.log(items)
          const total = items.length

          // if (sortBy.length === 1 && sortDesc.length === 1) {
          //   items = items.sort((a, b) => {
          //     const sortA = a[sortBy[0]]
          //     const sortB = b[sortBy[0]]

          //     if (sortDesc[0]) {
          //       if (sortA < sortB) return 1
          //       if (sortA > sortB) return -1
          //       return 0
          //     } else {
          //       if (sortA < sortB) return -1
          //       if (sortA > sortB) return 1
          //       return 0
          //     }
          //   })
          // }

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