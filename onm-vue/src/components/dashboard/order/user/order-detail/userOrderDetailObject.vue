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
            title="사용자 청약 오더 상세"
            class="px-5 py-3"
            >
          <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="pObject.guid"
                label="거래고유번호"
                readonly
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
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.pprodnm"
                label="상품명"
                readonly
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
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.oderno"
                label="오더번호"
                readonly
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
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.updatetype"
                label="변경유형코드"
                readonly
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
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.appointdate"
                label="처리희망일자"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.psaid"
                label="인터넷서비스 계약ID"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.custid"
                label="고객ID"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

           <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.salesmanid"
                label="영업대표사번"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.salesmannm"
                label="영업대표명"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

           <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.user_id"
                label="USERID"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.said"
                label="계약ID"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

       <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.telno"
                label="전화번호"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.ktt_user_yn"
                label="KTT 고객여부"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.bizp_nm"
                label="사업장명"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.cust_nm"
                label="고객성명"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.arnoadrbassbst"
                label="지번주소 기본내용"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.arnoadrdtlsbst"
                label="지번주소 상세내용"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.svcofccd"
                label="수용국사코드"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.svcofcnm"
                label="수용국사명칭"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.notice_result"
                label="청약결과 통보 번호"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.regdate"
                label="청약 오더 처리 일시"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.resultcode"
                label="청약 오더 처리 결과 코드"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.resultmsg"
                label="청약 오더 처리 결과"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.notice_yn"
                label="OSS 통보 여부"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.notice_date"
                label="OSS 통보 시간"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.srcsystem"
                label="송신시스템ID"
                readonly
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="pObject.tgtsystem"
                label="수신시스템ID"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          
      </base-material-card>
    </v-container>
</template>

<script>

export default {
    props: ['pObject']  
}
</script>
<style>
    
</style>