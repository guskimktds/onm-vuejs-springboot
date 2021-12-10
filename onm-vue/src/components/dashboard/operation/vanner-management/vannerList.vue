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
      title="배너목록"
      class="px-5 py-3"
    >
 
      <!-- class="px-5 py-3" -->
    <v-card
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
          @click:row="passPage"
        >
        </v-data-table>

    </v-card>
    <!-- <v-btn @click="testbbb"></v-btn> -->
  </base-material-card>
  </v-container>
</template>

<script>
//  import { eventBus } from '../../../../../main'
//  import EventBus from '../../../../EventBus';

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        options: {},
        headers: [
          // {
          //   text: 'No',
          //   align: 'start',
          //   sortable: false,
          //   value: '',
          //   width: '5%',
          // },

          { text: '배너타입', value: 'img_type', width: '5%', align: 'center'},
          { text: '제목', value: 'title', width: '20%', align: 'left'},
          { text: 'OS타입', value: 'os_type', width: '8%', align: 'center'},
          { text: '배너노출여부', value: 'pop_up_yn', width: '5%', align: 'center' },
          // { text: '노출시작일', value: 'disp_start_date',width: '10%', align: 'center' },
          // { text: '노출종료일', value: 'disp_end_date', width: '10%', align: 'center' },
          // { text: '작성자', value: 'reg_id', width: '10%', align: 'center' },
          // { text: '등록일시', value: 'reg_date' },
          { text: '등록일자', value: 'reg_date', width: '10%', align: 'center' }, 
          { text: '변경일자', value: 'mod_date', sortable: false, width: '10%', align: 'center' }
        ],
      }
    },
    methods: {
      getDataFromApi(){
        this.$emit("pagination",this.options)
      },
      passPage(value){
        console.log(value)
        console.log(this.pList)
        this.$router.push({name:"vanner-detailpage", params :{'val' : value}});
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
}
</script>

<style scoped>
.button{
  width:100px;
  height: 50px;
  float: right;
  padding-top:10px;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  background-color: #000000;
  border: 2px solid #ffffff;
  color: white;
}
</style>
