<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="IoT GW 상세 정보"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="3" md="3">
          <v-text-field
            v-model="pObject.terminal_gw_id"
            label="GWID(시스템)"
            required
          >
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.user_id" label="매장 ID" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.gw_id" label="GWID(청약)" readonly>
          </v-text-field>
        </v-col>
  
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.gw_name" label="GW 명" readonly> </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.gw_model_code" label="GW 모델코드" readonly>
          </v-text-field>
        </v-col>
     
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.mac_id" label="mac_id" readonly> </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.iot_device_seq" label="IoT 장치 seq" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="status_code" label="상태코드" readonly>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.reg_date" label="등록일시" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.open_date" label="개통일시" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="mgt_status" label="관리상태코드" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.close_date" label="해지일시" readonly>
          </v-text-field>
        </v-col>
      </v-row>

    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["pObject"],
  data() {
    return {
      status_code:'',
      mgt_status: ''
    }
  },
  created() {
    this.switchString()
  },
  updated() {
    this.switchString()
  },
  methods: {
    switchString(){
      var status=this.pObject.status_code
      var mgt=this.pObject.mgt_status
      console.log('fdsafasd')
      console.log(status)
      console.log(mgt)
      if(status=='S'){
        this.status_code='정상'
      }else if(status=='F'){
        this.status_code='장애'
      }else if(status=='D'){
        this.status_code='삭제'
      }
      
      if(mgt=='S'){
        this.mgt_status='정상'
      }else if(mgt=='F'){
        this.mgt_status='장애'
      }else if(mgt=='D'){
        this.mgt_status='삭제'
      }
    }
  },
};
</script>
<style>
</style>