<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader" 
            title="청약 전화번호"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="phList"
                hide-default-header
                hide-default-footer
                :server-items-length="phPagingInfo.total_cnt"
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
    props: ['phList', 'phPagingInfo'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
      return {
        totalList: 0,
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
            class: 'my-header-style'
          },
          { text: '계약자구분', value: 'contdivcd', class: 'my-header-style' },
          { text: '전화번호', value: 'telno', class: 'my-header-style' },
          { text: '생성일시', value: 'cdate', class: 'my-header-style'}
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