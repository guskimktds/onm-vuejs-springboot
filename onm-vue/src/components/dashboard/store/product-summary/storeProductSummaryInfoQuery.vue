<template>
  <div>
    <v-form>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="상품 요약정보 조회"
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
        </v-row>

        <v-row>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="상품이름"
              v-model="param.product_name"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.user_id"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="상품코드"
              v-model="param.prodcd"
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