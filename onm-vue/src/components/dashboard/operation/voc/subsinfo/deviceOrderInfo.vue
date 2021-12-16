<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="단말오더"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                hide-default-footer
                :server-items-length="doiPagingInfo.total_cnt"
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
    props: ['pList','doiPagingInfo'],
    data() {
      return {
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '거래고유번호',
            sortable: false, value: 'guid', class: 'my-header-style'
          },
          { text: '단말변경유형코드', value: 'termchangecd', class: 'my-header-style'},
          { text: 'MAC ID', value: 'mac_id', class: 'my-header-style'},
          { text: '단말타입', value: 'termtype', class: 'my-header-style'},
          { text: '제조사명', value: 'mfcname', class: 'my-header-style'},
          { text: '제품코드', value: 'productcode', class: 'my-header-style'},
          { text: '모델명', value: 'modelname', class: 'my-header-style'},
          { text: '오더타입', value: 'ordertype', class: 'my-header-style'},
          { text: '오더번호', value: 'orderno', class: 'my-header-style'},
          { text: '계약ID', value: 'said', class: 'my-header-style'},
          { text: '서비스NO', value: 'service_no', class: 'my-header-style'},
          { text: 'changeareacd', value: 'changeareacd', class: 'my-header-style'}
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