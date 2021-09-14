<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="푸시 발송 이력 조회"
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
                        label="시작일(알림시작)"
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
                        label="종료일(알림시작)"
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

          <v-col cols="2">
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
          <v-col cols="2">
              <v-select 
                  item-text="server_name" 
                  item-value="local_gw_id" 
                  :items="filteredData" 
                  v-model="param.local_gw_id" 
                  v-on:change="searchMethod">
              </v-select>
          </v-col>

          <v-col cols="2">
            <v-text-field
              label="알림 ID"
              v-model="param.alim_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              label="사용자 ID"
              v-model="param.user_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="2">
            <v-text-field
              label="카메라 ID"
              v-model="param.cam_id"
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
    };
  },
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
  // select box => version_code가 1302이상인 국사정보만 노출하도록 추가(21.06.03)
  computed: {
      filteredData(){
          return this.localGwOptions.filter(function(param){
              return Number(param.version_code) > 1301;
          });
      }
  }
};
</script>
<style>
</style>