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
        title="단말 오더 상세"
        class="px-5 py-3">

      <v-row>
        <v-col
          cols="12"
          md="12">
            <v-text-field
              v-model="pObject.guid"
              label="거래고유번호"
              required>
            </v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.appointdate"
              label="처리희망일자"
              required>
            </v-text-field>
          </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.oderdivcd"
              label="오더분류번호"
              required>
            </v-text-field>
          </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.oderno"
              label="오더번호"
              required>
            </v-text-field>
        </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.oderseq"
              label="오더순번"
              required>
            </v-text-field>
          </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.said"
              label="계약ID"
              required>
            </v-text-field>
        </v-col>
         <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.oderseq"
              label="오더유형"
              required>
            </v-text-field>
          </v-col>
      </v-row> 

      <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.reg_date"
              label="등록일시"
              required>
            </v-text-field>
        </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.psaid"
              label="인터넷서비스 계약ID"
              required>
            </v-text-field>
          </v-col>
      </v-row>

    <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.updatetype"
              label="변경유형코드"
              required>
            </v-text-field>
        </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.use_yn"
              label="사용여부"
              required>
            </v-text-field>
          </v-col>
      </v-row>

            <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.resultcode"
              label="청약처리결과 코드"
              required>
            </v-text-field>
        </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.resultmsg"
              label="청약처리결과 메세지"
              required>
            </v-text-field>
          </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.notice_yn"
              label="청약상태 통보여부"
              required>
            </v-text-field>
        </v-col>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.notice_date"
              label="오더처리 통보일시"
              required>
            </v-text-field>
          </v-col>
      </v-row>

      <v-row>
          <v-col
          cols="12"
          md="6">
            <v-text-field
              v-model="pObject.notice_result"
              label="청약결과 통보번호"
              required>
            </v-text-field>
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