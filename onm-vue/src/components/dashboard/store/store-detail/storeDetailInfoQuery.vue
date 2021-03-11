<template>
  <div>
    <v-form>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="매장정보 상세 조회"
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
                  <v-col cols="12" md="2">
                    <v-switch
                        v-model="param.is_masking"                    
                        :label="`마스킹(Y/N)`"
                        color="secondary"
                        v-show="showMasking()"
                    ></v-switch>
                </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="매장명"
              v-model="param.user_name"
              placeholder=" "
          
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="매장ID"
              v-model="param.user_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-select 
                    label="상태코드" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select>
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
          selected:'All',
          items:[
                    {state:'전체', abbr:'All'},
                    {state:'정상 사용자', abbr: 'S'},
                    {state:'해지', abbr:'D'},
                    {state:'일시정지', abbr:'T'},
                    {state:'사용자 생성 대기중', abbr:'P'}]
        }
    },
  methods: {
    searchMethod: function () {
      if(this.selected=='All'){
        this.param.status_code=''
      }else{
      this.param.status_code=this.selected
      }
      this.$emit("search", this.param);
    },
    showMasking(){
        var auth=this.$store.state.authGroupId
        if(auth=='G100'||auth=='G200'){
            return true;
        }else{
            return false;
        }
    }
  },
};
</script>
<style>
</style>