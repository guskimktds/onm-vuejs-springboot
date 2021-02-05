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
            title="사용자 청약 오더 상세 List"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="sdList"
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
    props: ['sdList', 'resPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        loading:true,
        headers: [
          {
            text: '상품코드', align: 'start',
            sortable: false, value: 'prodcd',
          },
          { text: '파라미터타입코드', value: 'paramtypecd' },   
          { text: '파라미터타입명칭', value: 'paramtypenm' },
          { text: '값', value: 'paramvalue' }
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

          let items = this.props.dorList
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