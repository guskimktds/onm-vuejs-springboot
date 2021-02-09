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
        <v-col cols="12" md="6">
          <v-text-field
            v-model="pObject.terminal_gw_id"
            label="GWID(시스템)"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.user_id" label="매장 ID">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.gw_id" label="GWID(청약)">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.gw_name" label="GW 명"> </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.gw_model_code" label="GW 모델코드">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.mac_id" label="mac_id"> </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.iot_device_seq" label="IoT 장치 seq">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.status_code" label="상태코드">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.reg_date" label="등록일시">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.open_date" label="개통일시">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.mgt_status" label="관리상태코드">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.close_date" label="해지일시">
          </v-text-field>
        </v-col>
      </v-row>

      <!-- <i class="fa fa-check"
    @click="checkObject(pObject)"></i> -->
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["pObject"],
  // ,methods: {
  //   checkObject:function(values){
  //     console.log(values)
  //   }
  // },
};
</script>
<style>
</style>