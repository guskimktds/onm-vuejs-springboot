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
        title="고객 청약 오더 처리 결과 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="headers"
        :items="bssList"
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
            v-show="is_result"
              >
            mdi-send
            </v-icon>
        </template>
      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
  props: ["bssList", "resPagingInfo"],
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
      ],
        last:0,
        options: {},
        totalList: 0,
        loading: true,
        is_result: true
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },

    sendItem (item) {
      this.$fire({
        title: '등록하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '예',
        cancelButtonText: '아니오',
      }).then(result =>{
        if(result.value){
          var select=this.bssList.indexOf(item)
          
          var url = `${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15021/update_bss_result`
          var param= this.bssList[select].guid
          this.is_result=false
          axios.post(url, param, this.$store.state.headers)
            .then((response) => {
              var resCode = response.data.res_code;
              var resMsg = response.data.res_msg;
              if(resCode == 200){
                alert('등록이 완료되었습니다!')
                this.is_result=false
              }else{
                this.is_result=true
                alert(resCode + " / " + resMsg);
              }
            })
            .catch((ex) => {
              console.log('변경 실패',ex)
            })
        }else{
          this.is_result=true
        }
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
      if(this.last!==this.bssPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.bssPagingInfo.total_cnt!==undefined){
      this.last=this.bssPagingInfo.total_cnt
      }
  },
    
}
</script>

<style>
    
</style>