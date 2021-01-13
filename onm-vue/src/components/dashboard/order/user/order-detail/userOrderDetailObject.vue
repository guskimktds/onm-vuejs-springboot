<template>

    <v-form>
    <v-container dense>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="pObject.guid"

            label="거래고유번호"
            required
          ></v-text-field>
        </v-col>        
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.pprodcd"
         

            label="상품코드"

          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.pprodnm"

            label="상품명"

          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.ordertype"
         

            label="오더유형"

          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.orderno"

            label="오더번호"

          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.oderseq"
         

            label="오더순번"

          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.updatetype"

            label="변경유형코드"

          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.cdate"
         

            label="등록일시"

          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="pObject.appointdate"

            label="처리희망일자"

          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <!-- appointdate: "20171218"
arnoadrbassbst: "서울시 종로구 내수동"
arnoadrdtlsbst: "용비어천가"
bizpnm: "목동매장"
cdate: "20171218201651"
custid: "C394134"
custnm: "홍길동"
guid: "GPNA_201712182003000_TEST0011"
ktt_user_yn: "N"
notice_yn: "Y"
oderno: "20171218200200"
oderseq: "2"
ordertype: "4201"
pprodcd: "B001"
pprodnm: "GiGAeyes smart"
psaid: "099Q1030901"
regdate: 1513595812040
resultcode: "200"
resultmsg: "SUCCESS"
said: "TEST18201802"
salesmanid: "24134414"
salesmannm: "이순신"
srcsystem: "LBNR"
svcofccd: "R02471"
svcofcnm: "가경국사"
telno: "01012341111"
tgtsystem: "GPNA"
updatetype: "5512"
user_id: "0000028234"-->
  
</template>

<script>

export default {
    props: ['pObject']  
}
</script>
<style>
    
</style>