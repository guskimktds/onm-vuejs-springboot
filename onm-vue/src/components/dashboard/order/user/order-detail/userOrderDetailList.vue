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
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '오더번호', value: 'oderno'},
          { text: '오더순번', value: 'oderseq'},
          { text: '사용여부', value: 'use_yn'},
          { text: '처리희망일자', value: 'appointdate'},
          { text: '오더유형', value: 'ordertype'},
          { text: '사업장명', value: 'bizpnm'},
          { text: '상품코드', value: 'prodcd'},
          { text: '파라미터타입코드', value: 'paramtypecd'},
          { text: '파라미터타입명칭', value: 'paramtypenm'},
          { text: '파라미터값', value: 'paramvalue'},
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
    mounted () {
      this.getDataFromApi()
    }

}
</script>
<style>
    
</style>