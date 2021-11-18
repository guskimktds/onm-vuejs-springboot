<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader"  
        title="연결된 Sensor 정보"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="dsList"
        hide-default-header
        :options.sync="options"
        :server-items-length="dsPagingInfo.total_cnt"
        class="elevation-0"
        
        :footer-props="{ itemsPerPageOptions: pageoptions }"
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
      last: 0,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      pageoptions: this.$store.state.pageoptions,
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "매장 ID",
          align: "start",
          sortable: false,
          value: "user_id", class: 'my-header-style'
        },
        { text: "센서 ID", value: "sensor_id", class: 'my-header-style' },
        { text: "단말 GW ID", value: "terminal_gw_id", class: 'my-header-style' },
        { text: "센서 제품 ID", value: "sensor_prod_id", class: 'my-header-style' },
        { text: "사용자 ID", value: "user_id", class: 'my-header-style' },
        { text: "센서 이름", value: "sensor_name", class: 'my-header-style' },
        { text: "센서태그코드", value: "sensor_tag_cd", class: 'my-header-style' },
        { text: "시리얼 번호", value: "serial_num", class: 'my-header-style' },
        { text: "상태코드", value: "status_code", class: 'my-header-style' },
        { text: "등록일", value: "reg_date", class: 'my-header-style' },
        { text: "수정일", value: "mod_date", class: 'my-header-style' },
      ],
    };
  },
  methods: {
    // handleClick: function (value) {
    //   this.$emit("child", value);
    // },
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
  updated() {
      if(this.last!==this.dsPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.dsPagingInfo.total_cnt!==undefined){
      this.last=this.dsPagingInfo.total_cnt
      }
  },
    
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