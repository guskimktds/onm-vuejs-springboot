<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="단말오더 정보 확인(12월개발 예정)"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                :options.sync="options"
                :server-items-length="doiPagingInfo.total_cnt"
                class="elevation-0"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
                
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
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '거래고유번호',
            sortable: false, value: 'guid', class: 'my-header-style'
          },
          { text: '희망일시', value: 'appointdate', class: 'my-header-style'},
          { text: 'div', value: 'div', class: 'my-header-style'},
          { text: 'orderno', value: 'orderno', class: 'my-header-style'},
          { text: 'oseq', value: 'oseq', class: 'my-header-style'},
          { text: 'said', value: 'said', class: 'my-header-style'},
          { text: 'otype', value: 'otype', class: 'my-header-style'},
          { text: 'utype', value: 'utype', class: 'my-header-style'},
          { text: 'char', value: 'char', class: 'my-header-style'},
          { text: 'use', value: 'use', class: 'my-header-style'},
          { text: 'chgcd', value: 'chgcd', class: 'my-header-style'},
          { text: 'mac_id', value: 'mac_id', class: 'my-header-style'},
          { text: 'type', value: 'type', class: 'my-header-style'},
          { text: 'psaid', value: 'psaid', class: 'my-header-style'},
          { text: 'srv_no', value: 'srv_no', class: 'my-header-style'},
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
    updated() {
      if(this.last!==this.doiPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.doiPagingInfo.total_cnt!==undefined){
      this.last=this.doiPagingInfo.total_cnt
      }
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