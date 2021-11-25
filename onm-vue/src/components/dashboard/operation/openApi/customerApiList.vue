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
        title="API별 사용 현황 조회"
        class="px-5 py-3"
      >
      <v-row>
        <v-col>

      <v-text-field 
      label="search"
      v-model="search"
      ></v-text-field>
        </v-col>
        <v-col>

      <v-btn>검색</v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
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
export default {
    props: ['pList','resPagingInfo'],
  data() {
    return {
      search: "",
      headers: [
        { text: '인터페이스 번호', value: 'api_no' },
        { text: 'api 접속량', value: 'access_cnt' },
        { text: '날짜', value: 'access_date' },
      ],
        last: 0,
        options: {},
        totalList: 0,

    }
  },

  methods: {
    handleClick:function(value){
        this.$emit("child", value.site_id);
      },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
      console.log("ㅇ페이징 옵션들"+this.options.total_cnt)
    },
    
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
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>

<style>
    
</style>