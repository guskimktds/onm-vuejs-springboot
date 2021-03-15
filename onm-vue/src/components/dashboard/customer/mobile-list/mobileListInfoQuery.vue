<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="모바일 단말 목록 조회"
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
                            :label="`날짜검색(Y/N)`"
                            color="secondary"
                        ></v-switch>
                </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
              <v-select 
                  item-text="server_name" 
                  item-value="local_gw_id" 
                  :items="localGwOptions" 
                  v-model="param.local_gw_id" 
                  v-on:change="searchMethod" 
                  ></v-select>
          </v-col>

          
          <v-col cols="12" sm="6" md="3">
            <v-select
            v-model="param.os_type"
            :items="items"
            label="OS타입"
            attach
            ></v-select>
          </v-col>
        </v-row>
        
        <v-row>

          <v-col cols="12" sm="6" md="4">
            <v-text-field
              dense
              label="전화번호 ID"
              v-model="param.tel_no_id"
              placeholder=" "
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
  props:['param','localGwOptions'],
  data() {
    return {
      items:["선택안함","iOS","Android"],
    };
  },

  methods: {
    searchMethod: function () {
      if(this.param.os_type=="선택안함"){
        this.param.os_type=""
      }
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>