<template>

  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="매장정보 상세"
        class="px-5 py-3"
      >
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.said"
              label="계약ID"
              required>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.user_id"
              label="매장ID">
            </v-text-field>
        </v-col>
   
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.user_name"
              label="매장명">
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.local_gw_id"
              label="로컬GW아이디">
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.tel_no"
              label="전화번호">
            </v-text-field>
        </v-col>
      </v-row>

       <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.status_code"
              label="상태코드">
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.prod_code"
              label="상품번호">
            </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.resolution"
              label="해상도">
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.subid_cnt"
              label="서브ID 개수">
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.storage_chg_day"
              label="영상저장기간">
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.iot_target_seq"
              label="iot_target_seq">
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.iot_member_seq"
              label="iot_member_seq">
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.order_no"
              label="주문번호">
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
    props: ['pObject']
  // ,methods: {
  //   checkObject:function(values){
  //     console.log(values)
  //   }
  // },
}
</script>
<style>
    
</style>