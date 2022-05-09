<template>
  <div>
    <v-form>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
         <base-material-card
         icon="mdi-magnify"
         title="매장상품정보 조회"
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

                <v-col cols="2">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-text-field
              
              label="상품번호"
              v-model="param.prod_info_id"
              placeholder=" "
        
            >
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              
              label="사용자 ID"
              v-model="param.user_id"
              placeholder=" "
           
            >
            </v-text-field>
          </v-col>

          <v-col cols="auto">
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
    </v-form>
  </div>
</template>

<script>
export default {
    props: ['param'],
    data() {
        return {
        }
    },

  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>