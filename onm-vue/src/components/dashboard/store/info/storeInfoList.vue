<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="매장정보 조회 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
      >
      <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
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
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "계약ID",
          align: "start",
          sortable: false,
          value: "said",
        },
        { text: "매장ID", value: "user_id" },
        { text: "매장명", value: "user_name" },
        { text: "매장 전화번호", value: "tel_no" },
        { text: "상태코드", value: "status_code" },
        { text: "로컬융합GW아이디", value: "local_gw_id" },
        { text: "상품코드", value: "prod_code" },
        { text: "등록일시", value: "reg_date" },
      ],
    };
  },

  methods: {
    handleClick: function (value) {
      this.$emit("child", value.said);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '정상 사용자'
      }else if(values==='D'){
        return '해지'
      }else if(values==='T'){
        return '일시정지'
      }else if(values==='P'){
        return '사용자 생성 대기중'
      }
    }
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },

  mounted() {
    this.getDataFromApi();
  },
};
</script>
<style>
</style>