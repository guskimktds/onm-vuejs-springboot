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
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.sensor_id" label="센서 ID" required>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.user_id" label="매장 ID">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.terminal_gw_id" label="단말 GW ID">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.sensor_prod_id" label="센서 제품 ID">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.sensor_name" label="센서명">
          </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.sensor_tag_cd" label="센서태그코드">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="pObject.serial_num" label="시리얼코드">
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
          <v-text-field v-model="pObject.mod_date" label="수정일시">
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