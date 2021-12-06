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
  readonly
  >
  </v-text-field>

  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 일 평균 API 호출 수"
     v-model="cList.access_cnt_day"
     readonly>
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 월 평균 API 호출 수"
    v-model="cList.access_cnt_month"
    readonly
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

  <v-text-field label="집계기간 서비스 업체별 전체 호출 수"
  v-model="sList.access_cnt_all"
  readonly
  >
  </v-text-field>

  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 서비스 업체별 일 평균 API 호출 수"
     v-model="sList.access_cnt_day"
     readonly>
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="집계기간 서비스 업체별 월 평균 API 호출 수"
    v-model="sList.access_cnt_month"
    readonly
    >

  </v-text-field>
    </v-col>
</v-row>
</v-container>

</template>

<script>
export default {
  props: ['cList', 'sList'],
      data() {
      return {
        options: {},
      }
    },
} 
</script>

<style>

</style>