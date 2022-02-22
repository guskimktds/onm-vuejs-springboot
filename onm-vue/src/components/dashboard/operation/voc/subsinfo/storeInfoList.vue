<template>
  <v-container 
    id="regular-tables" 
    fluid 
    tag="section"
    >
    <base-material-card
      color="customheader" 
      title="로그인 관련:: 사용자-매장-전화번호-카메라"
      class="px-2 py-1 customgrey"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-0"
        hide-default-header
        hide-default-footer
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

      <!-- <template v-slot:item.status_code="{item}">
              <span>{{ switchString(item.status_code) }}</span>
      </template> -->
      <template v-slot:item.status_code ="{item}">
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
      totalList: 0,
      pageoptions: this.$store.state.pageoptions,
      loading: true,
      headers: [
        {
          text: "계약ID",
          align: "start",
          sortable: false,
          value: "said",
          class: 'my-header-style'
        },
        { text: "매장ID", value: "user_id", class: 'my-header-style' },
        { text: "매장명", value: "user_name", class: 'my-header-style' },
        { text: "매장 전화번호", value: "tel_no", class: 'my-header-style' },
        { text: "상태코드", value: "status_code", class: 'my-header-style' },
        { text: "로컬융합GW아이디", value: "local_gw_id", class: 'my-header-style' },
        { text: "해상도", value: "resolution", class: 'my-header-style' },
        { text: "전체카메라대수", value: "total_cnt", class: 'my-header-style' },
        { text: "정상카메라대수", value: "normal_cnt", class: 'my-header-style' },
        { text: "상품코드", value: "prod_code", class: 'my-header-style' },
        { text: "등록일", value: "reg_date", class: 'my-header-style' },
      ],
    };
  },

  methods: {
    // handleClick: function (value) {
    //   this.$emit("child", value.user_id);
    // },
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
};
</script>

<style scoped>
.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
</style>