<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      color="orange"
      dark
      icon="mdi-keyboard"
      title="센서 상세 정보"
      class="px-5 py-3"
    >
      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.sensor_id" label="센서 ID" required readonly>
          </v-text-field>
        </v-col>
    
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.user_id" label="매장 ID" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.terminal_gw_id" label="단말 GW ID" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.sensor_prod_id" label="센서 제품 ID" readonly>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.sensor_name" label="센서명" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.sensor_tag_cd" label="센서태그코드" readonly>
          </v-text-field>
        </v-col>

        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.serial_num" label="시리얼코드" readonly>
          </v-text-field>
        </v-col>
  
        <v-col cols="3" md="3">
          <v-text-field v-model="status_code" label="상태코드" readonly >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.reg_date" label="등록일시" readonly>
          </v-text-field>
        </v-col>
      
        <v-col cols="3" md="3">
          <v-text-field v-model="pObject.mod_date" label="수정일시" readonly>
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
      status_code:''
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
     var values=this.pObject.status_code
        if(values=='S'){
          this.status_code='정상'
        }else if(values=='F'){
          this.status_code='장애'
        }else if(values=='D'){
          this.status_code='삭제'
        }
      }
  },

};
</script>
<style>
</style>