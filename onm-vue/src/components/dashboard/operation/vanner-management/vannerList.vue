<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
  >
    <v-row style="padding-top: 50px">
      <v-col>
            <h3 style="font-size: 30px; height: 20px; padding-left:12px">배너 목록</h3>
      </v-col>
      <div class = "button">
        <router-link to="/operation/vanner-register" >+신규</router-link>
      </div>
    </v-row>
    <v-row style="padding-top:30px">
      <v-btn @click="pageinfo">sssss</v-btn>
    </v-row>


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
  </v-container>
</template>

<script>
// import { eventBus } from '../../../../../main'
// import EventBus from '../../../../../EventBus';

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        options: {},
        loading: true,
        headers: [
          {
            text: 'No',
            align: 'start',
            sortable: false,
            value: 'no',
            width: '5%',
          },

          { text: '배너타입', value: 'img_type', width: '10%', align: 'center'},
          { text: '제목', value: 'img_name', width: '25%', align: 'center'},
          { text: '노출여부', value: 'disp_yn', width: '10%', align: 'center' },
          { text: '노출시작일', value: 'disp_start_date',width: '10%', align: 'center' },
          { text: '노출종료일', value: 'disp_end_date', width: '10%', align: 'center' },
          { text: '작성자', value: 'reg_id', width: '10%', align: 'center' },
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
        console.log(value);
        this.$router.push({name:"vanner-register", value});

      },
      pageinfo(){
        console.log(this.resPagingInfo)
      }  
    }     
}
</script>

<style scoped>
.button{
  float: right;
  padding-right: 45px;
  padding-top:20px;
  font-size:20px;
}
</style>>
