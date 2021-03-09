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
              required
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.user_id"
              label="매장ID"
              readonly>
            </v-text-field>
        </v-col>
   
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.user_name"
              label="매장명"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.local_gw_id"
              label="로컬GW아이디"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.tel_no"
              label="전화번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

       <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="status_code"
              label="상태코드"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.prod_code"
              label="상품번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.resolution"
              label="해상도"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.subid_cnt"
              label="서브ID 개수"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.storage_chg_day"
              label="영상저장기간"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.iot_target_seq"
              label="iot_target_seq"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.iot_member_seq"
              label="iot_member_seq"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.order_no"
              label="주문번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

    </base-material-card>
  </v-container>
  
</template>

<script>
export default {
    props: ['pObject'],
    data() {
      return {
        status_code:''
      }
    },
    created() {
      this.switchString()
    },
    updated(){
      this.switchString()
    },
    methods: {
      switchString(){
        var status=this.pObject.status_code
        if(status=='S'){
        this.status_code= '정상 사용자'
      }else if(status=='D'){
        this.status_code= '해지'
      }else if(status=='T'){
        this.status_code= '일시정지'
      }else if(status=='P'){
        this.status_code='사용자 생성 대기중'
      }
      }
    },

}
</script>
<style>
    
</style>