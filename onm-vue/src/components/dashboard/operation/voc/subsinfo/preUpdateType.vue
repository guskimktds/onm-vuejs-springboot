<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="UpdateType"
            class="px-2 py-1 customgrey"
            >
            <!-- <v-data-table
                :headers="headers"
                :items="putList"
                :options.sync="options"
                :server-items-length="dodPagingInfo.total_cnt"
                class="elevation-1"
                :footer-props="{ itemsPerPageOptions: pageoptions }"
                :header-props="{ sortIcon: null }"
            >    -->
            <v-data-table
                :headers="headers"
                :items="putList"
                hide-default-header
                hide-default-footer
                class="elevation-0"
                
                :header-props="{ sortIcon: null }"
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
    props: [
      'putList',
      'dodPagingInfo'
    ],
    data() {
      return {
        last:0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        // options: {},
        // pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '오더번호',
            // sortable: false, 
            value: 'orderno',
            class: 'my-header-style'
          },
          { text: '업데이트 타입', value: 'updatetype', class: 'my-header-style'},
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true     
        // this.$emit("pagination", this.options)
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
    // updated() {
    //   if(this.last!==this.dodPagingInfo.total_cnt){
    //     this.options.page=1
    //   }
    //   if(this.dodPagingInfo.total_cnt!==undefined){
    //   this.last=this.dodPagingInfo.total_cnt
    //   }
    // },
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