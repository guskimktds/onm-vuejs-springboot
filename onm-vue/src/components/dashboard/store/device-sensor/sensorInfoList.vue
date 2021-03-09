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
        title="센서 정보 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="dsList"
        :options.sync="options"
        :server-items-length="dsPagingInfo.total_cnt"
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
  props: ["dsList",'dsPagingInfo'],
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_id",
        },
        { text: "단말 GW ID", value: "terminal_gw_id" },
        { text: "센서 제품id", value: "sensor_prod_id" },
        { text: "사용자 ID", value: "user_id" },
        { text: "센서 이름", value: "sensor_name" },
        { text: "센서태그코드", value: "sensor_tag_cd" },
        { text: "시리얼 번호", value: "serial_num" },
        { text: "상태코드", value: "status_code" },
        { text: "등록일시", value: "reg_date" },
        { text: "수정일시", value: "mod_date" },
      ],
    };
  },
  methods: {
    handleClick: function (value) {
      this.$emit("child", value);
    },
    getDataFromApi() {
      this.loading = true;
      this.dsList.status_code=this.switchString(this.dsList.status_code)
      this.$emit("pagination", this.options);
    },
    switchString(values){
        if(values=='S'){
          return '정상'
        }else if(values=='F'){
          return '장애'
        }else if(values=='D'){
          return '삭제'
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
    
}
</script>
<style>
    
</style>