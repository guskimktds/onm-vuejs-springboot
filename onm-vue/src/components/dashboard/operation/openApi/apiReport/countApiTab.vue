<template>
<v-container>
<v-row>
  <v-col
    cols="12"
    sm="4"
    md="4"
  >

  <v-text-field label="API 전체 수"
  v-model="cList"
  >
  </v-text-field>

  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="사용가능"
     v-model="cList">
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="4"
    md="4"
  >
    <v-text-field label="사용불가"
    v-model="cList.access_cnt_all">

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
      }
    },
  method:{
    
  }
} 
</script>

<style>

</style>