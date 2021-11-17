<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >
    <base-material-card
        color="customheader" 
        title="사용자 센서 신청 현황"
        class="px-2 py-1 customgrey"
      >
      <v-data-table
        :headers="headers"
        :items="soList"
        hide-default-header
        :options.sync="options"
        :server-items-length="soPagingInfo.total_cnt"
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
  props: ["soList",'soPagingInfo'],
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
          text: "센서 ID",
          align: "start",
          sortable: false,
          value: "sensor_prod_id", class: 'my-header-style'
        },
        { text: "사용자 ID", value: "user_id", class: 'my-header-style' },
        { text: "센서제품명", value: "sensor_prod_name", class: 'my-header-style' },
        { text: "센서태그코드", value: "sensor_tag_cd", class: 'my-header-style' },
        { text: "상태 코드", value: "status_code", class: 'my-header-style' },
        { text: "센서 개수", value: "sensor_count", class: 'my-header-style' },
      ],
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='S'){
        return '정상'
      }else if(values==='F'){
        return '장애'
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
      if(this.last!==this.soPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.soPagingInfo.total_cnt!==undefined){
      this.last=this.soPagingInfo.total_cnt
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