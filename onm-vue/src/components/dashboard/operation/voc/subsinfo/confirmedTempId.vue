<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader" 
            title="Temp ID 확인"
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
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '오더번호',
            sortable: false, value: 'oderno', class: 'my-header-style'
          },
          { text: 'id_seq', value: 'id_seq', class: 'my-header-style'},
          { text: 'tel_no', value: 'tel_no', class: 'my-header-style'},
          { text: 'status', value: 'status', class: 'my-header-style'},
          { text: 'ctype', value: 'ctype', class: 'my-header-style'},
          { text: 'reg_date', value: 'reg_date', class: 'my-header-style'},
          { text: 'close_date', value: 'close_date', class: 'my-header-style'}
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
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
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