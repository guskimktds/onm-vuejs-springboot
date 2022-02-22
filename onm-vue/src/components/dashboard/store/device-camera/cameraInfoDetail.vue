<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="카메라 정보 상세"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.cam_id" label="카메라 ID" required readonly>
          </v-text-field>
        </v-col>
 
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.user_id" label="매장 ID" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.cam_ip" label="카메라 IP" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.mac_id" label="MAC ID" readonly> </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.cam_name" label="카메라명" readonly>
          </v-text-field>
        </v-col>
 
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.model_name" label="모델명" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.firmware" label="펌웨어" readonly>
          </v-text-field>
        </v-col>
 
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.vendor" label="제조사" readonly> </v-text-field>
        </v-col>

      </v-row>
      
      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="status_code" label="서비스 상태코드" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="mgt_status" label="관리상태코드" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.resolution" label="해상도" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.mod_date" label="수정일자" readonly>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.open_date" label="개통일시" readonly>
          </v-text-field>
        </v-col>
     
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.reg_date" label="등록일시" readonly>
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
      
      if(status=='A'){
        this.status_code='접수'
      }else if(status=='D'){
        this.status_code='삭제'
      }else if(status=='F'){
        this.status_code= '실패'
      }else if(status=='P'){
        this.status_code='진행중'
      }else if(status=='S'){
        this.status_code='성공'
      }else if(status=='Z'){
        this.status_code='카메라 장애'
      }
      
      if(mgt=='A'){
        this.mgt_status='접수'
      }else if(mgt=='D'){
        this.mgt_status='삭제'
      }else if(mgt=='F'){
        this.mgt_status='실패'
      }else if(mgt=='P'){
        this.mgt_status='진행중'
      }else if(mgt=='S'){
        this.mgt_status='성공'
      }else if(mgt=='Z'){
        this.mgt_status='카메라 장애'
      }
    }
  },

};
</script>
<style>
</style>