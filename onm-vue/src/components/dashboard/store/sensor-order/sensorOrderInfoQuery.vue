<template>
  <div>
    <v-form>
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
              v-model="param.sensorId"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="상태 코드"
              v-model="param.statusCode"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="센서 제품명"
              v-model="param.sensorName"
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
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        sensorId: "",
        statusCode: "",
        sensorName: "",
      },
    };
  },
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>