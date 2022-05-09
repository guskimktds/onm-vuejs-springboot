<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="Temp ID 오더 확인"
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
          { text: '계약ID', value: 'said', class: 'my-header-style'},
          { text: '오더번호', value: 'oderno', class: 'my-header-style'},
          { text: '고객주문버전번호', value: 'oderseq', class: 'my-header-style'},
          { text: '요청구분', value: 'requesttypecd', class: 'my-header-style'},
          { text: '오더구분', value: 'oderdivcd', class: 'my-header-style'},
          { text: '현장작업자전화번호', value: 'spotwrkrtelno', class: 'my-header-style'},
          { text: '등록일', value: 'reg_date', class: 'my-header-style'},
          { text: '결과메세지', value: 'resultmsg', class: 'my-header-style'},
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
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
    
</style>