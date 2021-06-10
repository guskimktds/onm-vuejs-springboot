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
          cols="6"
          md="6">
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
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.user_id"
              label="매장ID"
              readonly>
            </v-text-field>
        </v-col>
   
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.user_name"
              label="매장명"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.local_gw_id"
              label="로컬GW아이디"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.tel_no"
              label="전화번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

       <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="status_code"
              label="상태코드"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.prod_code"
              label="상품번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.resolution"
              label="해상도"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.subid_cnt"
              label="서브ID 개수"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.storage_chg_day"
              label="영상저장기간"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.iot_target_seq"
              label="iot_target_seq"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.iot_member_seq"
              label="iot_member_seq"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.order_no"
              label="주문번호"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.reg_date"
              label="등록일시"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.mod_date"
              label="수정일시"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.cam_cnt"
              label="전체 카메라 대수"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.normal_cam_cnt"
              label="정상 카메라 대수"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.ip_cam_cnt"
              label="IP 카메라 대수"
              readonly>
            </v-text-field>
        </v-col>
        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.pos_cam_cnt"
              label="POS 카메라 대수"
              readonly>
            </v-text-field>
        </v-col>
      </v-row>
      
      <v-row>
      <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="pObject.iotgw_cnt"
              label="IoT GW 대수"
              readonly>
            </v-text-field>
        </v-col>

        <v-col
          cols="6"
          md="6">
            <v-text-field
              v-model="save_method"
              label="영상저장방식"
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
        status_code:'',
        save_mehod: ''
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

        var method=this.pObject.save_method
        if(method=='A'){
          this.save_method='상시'
        }
        else if(method=='E'){
          this.save_mehod='스마트'
        }else{
          this.save_method='-'
        }
      }
    },

}
</script>
<style>
    
</style>