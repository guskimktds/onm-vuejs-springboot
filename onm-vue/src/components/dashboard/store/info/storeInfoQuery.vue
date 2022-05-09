<template>
 
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        icon="mdi-magnify"
        title="매장정보 조회"
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
                        label="시작일(등록일)"
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
                        label="종료일(등록일)"
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
        
          <v-col cols="3">
            <v-text-field
              
              label="계약 ID"
              v-model="param.said"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              
              label="매장명"
              v-model="param.user_name"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

           <v-col cols="3">
            <v-text-field
              
              label="상품코드"
              v-model="param.prod_code"
              placeholder=" "
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>

          <v-col cols="3">
            <v-text-field
              
              label="매장ID"
              v-model="param.user_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              
              label="매장 전화번호"
              v-model="param.tel_no"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              
              label="국사코드"
              v-model="param.local_gw_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="2">
            <v-btn 
              elevation="2" 
              medium
              v-on:click="searchMethod"
               >
               검색
            </v-btn>
          </v-col>
        </v-row>
        </base-material-card>
      </v-container>

</template>

<script>
export default {
    props: ['param'],
    data() {
        return {}
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
</style>