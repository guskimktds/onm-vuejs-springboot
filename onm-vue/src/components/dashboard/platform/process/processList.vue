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
        title="프로세스 현황 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
        class="elevation-1"
      >
      <template v-slot:item.proc_status="{item}">
            <span>{{ switchString(item.proc_status) }}</span>
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
      last:0,
      listSize : [
        10, 100, 200
      ],
      headers: [
        { text: '국사코드', value: 'local_gw_id' },
        { text: '서버명', value: 'hostname'},
        { text: '프로세스타입', value: 'proc_type' },
        { text: '프로세스명', value: 'proc_name' },
        { text: '상태', value: 'proc_status' },
        { text: '보고일시(Last)', value: 'last_upd_date' },
      ],
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,

    }
  },

  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    
    switchString(values){
      if(values=='D'){
        return '미가동'
      }else if(values=='U'){
        return '정상'
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