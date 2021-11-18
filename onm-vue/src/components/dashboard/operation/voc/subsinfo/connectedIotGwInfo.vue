<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="customheader"  
      title="연결된 IoT GW 정보 "
      class="px-2 py-1 customgrey"
    >
      <v-data-table
        :headers="headers"
        :items="iotList"
        hide-default-header
        :options.sync="options"
        :server-items-length="iotPagingInfo.total_cnt"
        
        class="my-class"
        
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
        <template v-slot:item.mgt_status="{item}">
                <span>{{ switchString2(item.mgt_status) }}</span>
        </template>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["iotList", "iotPagingInfo"],
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
          text: "매장ID",
          align: "start",
          sortable: false,
          value: "user_id", class: 'my-header-style'
        },
        { text: "GWID(시스템)", value: "terminal_gw_id" , class: 'my-header-style'},
        { text: "GWID(청약)", value: "gw_id" , class: 'my-header-style'},        
        { text: "GW명", value: "gw_name" , class: 'my-header-style'},
        { text: "GW모델코드", value: "gw_model_code" , class: 'my-header-style'},
        { text: "mac ID", value: "mac_id" , class: 'my-header-style'},
        { text: "idevseq", value: "iot_device_seq" , class: 'my-header-style'},
        { text: "stat", value: "status_code" , class: 'my-header-style'},
        { text: "등록일", value: "reg_date" , class: 'my-header-style'},
        { text: "개통일", value: "open_date" , class: 'my-header-style'},
        { text: "gib_yn", value: "gib_yn" , class: 'my-header-style'},
        { text: "mgt_status", value: "mgt_status" , class: 'my-header-style'},
        { text: "해지일", value: "close_date" , class: 'my-header-style' },
        { text: "수정일", value: "mod_date" , class: 'my-header-style'},
      ],
    };
  },
  methods: {
    // handleClick: function (value) {
    //   this.$emit("child", value);
    // },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '성공'
      }else if(values==='F'){
        return '실패'
      }else if(values==='D'){
        return '삭제'
      }
    },
    switchString2(values){
      if(values==='S'){
        return '성공'
      }else if(values==='F'){
        return '실패'
      }else if(values==='D'){
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
      if(this.last!==this.iotPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.iotPagingInfo.total_cnt!==undefined){
      this.last=this.iotPagingInfo.total_cnt
      }
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

.my_class td{
    font-size: small!important;
    height: 0!important;
    padding: 1px!important;
}
</style>