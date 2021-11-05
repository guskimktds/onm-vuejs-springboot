<template>
<v-container>
<v-row>
  <v-col
    cols="12"
    sm="4"
    md="4"
  >

  <v-text-field label="집계기간 전체 호출 수">
      {{total_api}}
  </v-text-field>
  </v-col>
</v-row>
<v-row>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 일 평균 API 호출 수">
      {{monthly_api}}
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 월 평균 API 호출 수">
      {{daily_api}}
  </v-text-field>
    </v-col>
</v-row>

</v-container>

</template>

<script>
export default {
  props: ['cList'],
      data() {
      return {
        options: {},
        total_api: '',
        monthly_api: '',
        daily_api: ''
      }
    },

methods: {
  handleParams(){
    this.total_api = this.cList.total_api;
    this.monthly_api = this.cList.total_api;
    this.daily_api = this.cList.total_api;
    }
  }
} 
</script>

<style>

</style>