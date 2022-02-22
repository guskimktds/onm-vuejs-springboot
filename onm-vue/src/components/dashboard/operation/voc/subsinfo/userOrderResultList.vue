<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"
            title="청약 결과"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-0"
                hide-default-footer
                hide-default-header
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
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid', class: 'my-header-style'
          },
          { text: '계약ID', value: 'said', class: 'my-header-style' },
          { text: '오더유형', value: 'ordertype', class: 'my-header-style' },
          { text: '처리코드', value: 'resultcode', class: 'my-header-style' },
          { text: '처리메세지', value: 'resultmsg', class: 'my-header-style' },
          { text: '등록일시', value: 'regdate', class: 'my-header-style'},
          { text: '청약상태 통보여부', value: 'notice_yn', class: 'my-header-style'},
          { text: '청약상태 통보일시', value: 'notice_date', class: 'my-header-style' },
          { text: '청약상태 통보결과', value: 'notice_result', class: 'my-header-style' }
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true     
        // const { page, itemsPerPage } = this.options
        // console.log(page, itemsPerPage)
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
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
    
</style>