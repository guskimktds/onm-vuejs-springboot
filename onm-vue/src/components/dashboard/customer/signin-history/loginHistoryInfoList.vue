<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="로그인 History"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
       <template v-slot:item.user_agent="{item}">
              <span>{{ switchString(item.user_agent) }}</span>
      </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>
<script>
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "로그인 키",
          align: "start",
          sortable: false,
          value: "login_key",
        },
        { text: "로그인 ID", value: "login_id" },
        { text: "로그인 타입", value: "login_type" },
        { text: "만료일", value: "expire_date" },
        { text: "로그인일시", value: "login_date" },
        { text: "로그아웃일시", value: "logout_date" },
        { text: "OS 타입", value: "os_type" },
        { text: "브라우저 타입", value: "user_agent"}
      ],
    };
  },
  methods: {

    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      var safari=values.indexOf('Safari')
      var chrome=values.indexOf('Chrome')
      var firefox=values.indexOf('FireFox')
      var ie8=values.indexOf('Trident')

      if(safari>-1){
        return 'Safari'
      }else if(chrome>-1){
        return 'Chrome'
      }else if(firefox>-1){
        return 'FireFox'
      }else if(ie8>-1){
        return 'IE 8.0 이상'
      }else{
        return 'IE'
      }
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
};
</script>
<style>
</style>