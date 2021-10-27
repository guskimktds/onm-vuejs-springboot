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
        :options.sync="options"
        :server-items-length="storePagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
    export default{
         props: ['pList','storePagingInfo'],
        components:{
            
        },
        methods:{
            handleClick: function(value){
                this.$emit("child", value);
            },
        },
        data(){
            return {
                headers: [
                    {
                    text: "사이트 ID",
                    align: "start",
                    sortable: false,
                    value: "site_id",
                    },
                    { text: "업체 명", value: "site_name" },
                    { text: "업체 ID", value: "site_id" },
                    { text: "등록 매장 수", value: "registered_store_count" },
                    { text: "등록 API", value: "api_count" },
                    { text: "담당자 명", value: "user_name" },
                    { text: "등록일자", value: "reg_date" },
                    { text: "수정일자", value: "mod_date" },
                    { text: "상태", value: "status_code" },
                ],
            }
        },
        getDataFromApi() {
        this.loading = true;
        this.$emit("pagination", this.options);
        },
        watch: {
            options: {
            handler() {
                this.getDataFromApi();
            },
            deep: true,
            },
        },
        updated() {
            if(this.last!==this.storePagingInfo.total_cnt){
                this.options.page=1
            }
            if(this.storePagingInfo.total_cnt!==undefined){
            this.last=this.storePagingInfo.total_cnt
            }
        },
    }

</script>
<style scoped>


</style>