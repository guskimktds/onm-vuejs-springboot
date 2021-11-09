<template>
<v-container>
<v-row>
  <v-col
    cols="12"
    sm="4"
    md="4"
  >

  <v-text-field label="집계기간 전체 호출 수"
  v-model="cList.access_cnt_all"
  >
  </v-text-field>

  </v-col>
</v-row>
<v-row>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 일 평균 API 호출 수"
     v-model="cList.access_cnt_day">
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 월 평균 API 호출 수"
    v-model="cList.access_cnt_month">

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
        access_cnt_all: '',
      }
    },
} 
</script>

<style>

</style>