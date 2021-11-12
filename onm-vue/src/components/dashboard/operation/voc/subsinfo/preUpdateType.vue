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
            title="UpdateType"
            class="px-5 py-3"
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
               
                hide-default-footer
                class="elevation-1"
                
                :header-props="{ sortIcon: null }"
            >        
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
          },
          { text: '업데이트 타입', value: 'updatetype'},
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
<style>
    
</style>