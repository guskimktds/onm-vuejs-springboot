<template>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="센서 신청 현황 조회"
        class="px-5 py-3"
        >
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="센서 ID"
              v-model="param.sensor_prod_id"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="상태 코드"
              v-model="param.status_code"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="센서 제품명"
              v-model="param.sensor_prod_name"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
         
          <v-col cols="auto">
            <v-btn color="primary"
               v-on:click="searchMethod"
               >
               검색
            </v-btn>
          </v-col>

        </v-row>
        </base-material-card>
      </v-container>
</template>

<script>
export default {
 props:['param'],
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>