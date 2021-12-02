<template>
<v-container>
<v-row>
  <v-col
    cols="12"
    sm="3"
    md="3"
  >

  <v-text-field label="API 전체 수"
  v-model="apiCountInfo.total"
  readonly
  >
  </v-text-field>

  </v-col>
    <v-col
    cols="12"
    sm="3"
    md="3"
    readonly
  >
    <v-text-field label="사용가능"
     v-model="apiCountInfo.usedApi"
     readonly>
  </v-text-field>
  </v-col>
    <v-col
    cols="12"
    sm="3"
    md="3"
  >
    <v-text-field label="사용불가"
    v-model="apiCountInfo.unusedApi"
    readonly>

  </v-text-field>
    </v-col>
    <v-col cols="12" sm="3" md="3">

                 <v-select 
                    label="API명" 
                    :items="apiCountInfo.arr"
                      item-text="apiCountInfo.arr.[index]" 
                      item-value="apiCountInfo.arr.value" 
                  ></v-select>

                </v-col>
</v-row>
</v-container>

</template>

<script>

export default {
  props: ['apiCountInfo'],
      data() {
      return {
        arr:[
          {state: '',value:''}
        ]
      }
    },
  method:{
    
  }
} 
</script>

<style>

</style>