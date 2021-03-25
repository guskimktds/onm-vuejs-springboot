<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-magnify"
      title="로그인 이력 조회"
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

                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>
      </v-row>

      <v-row>
        <v-radio-group
           row
           v-on:change="handleRadio"
           v-model="param.optionType">
            <v-radio
              label="로그인"
              value="login"></v-radio>
            <v-radio
              label="로그아웃"
              value="logout"></v-radio>                        
        </v-radio-group>

        <v-col cols="2">
          <v-select
            v-model="param.os_type"
            :items="items"
            label="OS타입"
            attach
          ></v-select>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            dense
            label="로그인 ID"
            v-model="param.login_id"
            placeholder=" "
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="로그인 키"
              v-model="param.login_key"
              placeholder=" "
            >
            </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="브라우저 타입"
              v-model="param.user_agent"
              placeholder=" "
            >
            </v-text-field>
        </v-col>

        <v-col cols="auto">
          <v-btn v-on:click="searchMethod">검색</v-btn>
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
      items: ["선택안함","PC", "iOS", "Android"],
    };
  },

  methods: {
    searchMethod: function () {
      if (this.param.os_type === "선택안함") {
        this.param.os_type = "";
      }
      this.$emit("search", this.param);
    },
    handleRadio(values){
      if(values=="로그인"){
        this.param.optionType="login"
      }else if(values=="로그아웃"){
        this.param.optionType="logout"
      }
    }
  },
};
</script>
<style>
</style>