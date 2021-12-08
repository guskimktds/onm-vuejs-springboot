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
        title="매장 승인 정보"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="pList"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
        :options.sync="options"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>

    export default{
         props: ['pList','resPagingInfo'],
        components:{    
        },
        methods:{
            handleClick: function(value){
                this.$router.push({name: "register-store-list", params:value})

            },
            getDateFromApi(){
                this.$emit("pagination",this.options)
            }
        },
        data(){
            return {
                headers: [
                    {
                    text: "업체 ID",
                    align: "start",
                    sortable: false,
                    value: "site_id",
                    width: '13%',
                    },
                    { text: "업체 명", value: "site_name", width: '8%', align:'center' },
                    { text: "등록 매장", value: "registered_store_count", width: '7%', align:'right'},
                    { text: "등록 API", value: "api_count" ,width: '8%', align:'right'},
                    { text: "API 제한 여부", value: "control_type", width: '9%', align:'center' },
                    { text: "담당자 명", value: "user_name", width: '10%', align:'center' },
                    { text: "승인자", value: "adm_id", width: '8%', align:'center' },
                    { text: "상태", value: "status_value", width: '7%' , align:'center'},
                    { text: "등록일자", value: "reg_date" ,width: '10%', align:'center'},
                    { text: "수정일자", value: "mod_date", width: '10%', align:'center' },
              
                ],
                options:{}
            }
        },
        updated() {
            if(this.last!==this.resPagingInfo.total_cnt){
                this.options.page=1
            }
            if(this.resPagingInfo.total_cnt!==undefined){
            this.last=this.resPagingInfo.total_cnt
            }
        },
        watch:{
            options:{
                handler(){
                    this.getDateFromApi();
                },
                deep:true
            }
        },
    }

</script>
<style scoped>


</style>