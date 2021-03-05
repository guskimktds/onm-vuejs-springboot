<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-magnify"
      title="SMS 발송 이력 조회"
      class="px-5 py-3"
    >
      <v-row>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
                        color="secondary"
                    ></v-switch>
                </v-col> 
      </v-row>

      <v-row>
        <v-col cols="12" sm="3" md="3">
          <v-text-field
            dense
            label="발송 전화번호"
            v-model="param.tel_number"
            placeholder=" "
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="3" md="3">
          <v-text-field
            dense
            label="OTP 번호"
            v-model="param.otp"
            placeholder=" "
          >
          </v-text-field>
        </v-col>

        <v-col cols="auto">
          <v-btn v-on:click="searchMethod">검색</v-btn>
        </v-col>
        <v-col>
          <v-dialog
          v-model="dialog"
          max-width="500px">
          <template v-slot:activator="{on,attrs}">
            <v-btn
             color="blue"
             v-bind="attrs"
             v-on="on">발송결과코드 보기</v-btn>
          </template>
          <v-card>
            <v-img
            src="@/img/sms_code1.png"
            v-show="this.img1"></v-img>
          </v-card>
          <v-card>
            <v-img
            src="@/img/sms-code2.png"
            v-show="this.img2"></v-img>
          </v-card>
          <v-card>
            <v-img
            src="@/img/sms-code3.png"
            v-show="this.img3"></v-img>
          </v-card>

          <v-card-actions>
            <v-btn
              color="green"
              v-on:click="showImg('1')"
              >1</v-btn>
          <v-btn
              color="green"
              v-on:click="showImg('2')"
              > 2</v-btn>
          <v-btn
              color="green"
              v-on:click="showImg('3')"
              > 3</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo"
              dark
              class="mb-2"
              @click="close"> 취소</v-btn>
          </v-card-actions>
          </v-dialog>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>
<script>
export default {
  props: ["param"],
  data() {
    return {
      img1: true,
      img2: false,
      img3: false,
      dialog: false
    };
  },

  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
    close(){
      this.dialog=false
    },
    showImg(values){
      if(values=='1'){
        this.img1=true
        this.img2=false
        this.img3=false
      }else if(values=='2'){
        this.img1=false
        this.img2=true
        this.img3=false
      }else if(values=='3'){
        this.img1=false
        this.img2=false
        this.img3=true
      }
    }
  },
};
</script>
<style>
</style>