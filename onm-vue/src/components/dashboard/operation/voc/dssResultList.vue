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
        title="고객 단말 오더 처리 결과 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="dssList"
        class="elevation-1"
        :options.sync="options"
         :server-items-length="resPagingInfo.total_cnt"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >


        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="sendItem(item)"
              >
            mdi-send
            </v-icon>
        </template>
      <template v-slot:top>
                <v-dialog v-model="dialogSend" max-width="500px">
                  <v-card>
                    <v-card-title class="headline">전송 하시겠습니까?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="sendItemConfirm">OK</v-btn>
                      <v-btn color="blue darken-1" text @click="closeSend">Cancel</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              
      </template>

      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  props: ["dssList", "resPagingInfo"],
  data() {
    return {
      headers: [
        { text: '거래고유번호', value: 'guid'},
        { text: '계약 ID', value: 'said' },
        { text: '오더번호', value: 'oderno' },
        { text: '오더순번', value: 'oderseq' },
        { text: '오더유형', value: 'odertype' },
        { text: '접수일자', value: 'receiptdate' },
        { text: '등록일시', value: 'regdate' },
        { text: '  ', value: 'actions', sortable: false }
      ],
        last:0,
        options: {},
        totalList: 0,
        loading: true,
        sendItemIndex: -1,
        dialogSend: false,
        tempitems:{},
        selectItem:{
          guid:''
        },
        defaultItem:{
          guid:''
        }

    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },

    sendItem(item){
      this.sendItemIndex = this.dssList.indexOf(item)
      this.tempItems = Object.assign({},item)
      this.selectItem.guid=this.tempItems.guid
      this.dialogSend = true
    },

    sendItemConfirm () {
          var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15028/update_oss_result`
          var param= this.selectItem
          var sendIndex = this.sendItemIndex

          axios.post(url, param, this.$store.state.headers)
            .then((response) => {
              console.log(response)
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                this.dssList.splice(sendIndex, 1)
                alert('등록이 완료되었습니다!')
              }else{
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              alert('전송 실패')
              console.log('전송 실패',ex)
            }),
          this.closeSend()
        },

   closeSend () {
        this.dialogSend = false
        this.$nextTick(() => {
          this.selectItem = Object.assign({}, this.defaultItem)
          this.sendItemIndex = -1
        })
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
    
}
</script>

<style>
    
</style>