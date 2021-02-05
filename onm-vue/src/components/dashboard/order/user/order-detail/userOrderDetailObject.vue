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
                v-model="pObject.oderno"
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