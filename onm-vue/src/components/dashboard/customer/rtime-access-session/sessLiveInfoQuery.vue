<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-magnify"
      title="실시간 접속 세션 조회"
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

                <v-col cols="3">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col> 

                <v-col cols="3">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹 해제`"
                        color="secondary"
                    ></v-switch>
                </v-col>
      </v-row>
      
      <v-row>
         <v-col cols="3">
          <v-select
            v-model="param.device_type"
            :items="items"
            label="장치타입"
            attach
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            dense
            label="전화번호"
            v-model="param.tel_no"
            placeholder=""
        
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field
            dense
            label="사용자 ID"
            v-model="param.user_id"
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
  props: ['param'],
  data() {
    return {
      items: ["선택안함","PC", "iPhone", "Android"],
    };
  },
  methods: {
    searchMethod: function () {
      if (this.param.device_type === "선택안함"){
        this.param.device_type =""
      }
      this.$emit("search", this.param);
    }
  },
};
</script>
<style>
</style>