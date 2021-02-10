<template>
  <div>
    <v-form>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
        icon="mdi-magnify"
        title="사용자 청약 오더 상세 검색"
        class="px-5 py-3"
        >
        <v-row>         
          <v-col cols="12" sm="6" md="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
              attach
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="희망처리일자"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.appoint_date"
                no-title
                scrollable
                range
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
             
                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="오더번호" 
                        v-model="param.oderno"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>    

                 <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="거래고유번호" 
                        v-model="param.guid"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>   

                <v-col cols="12" sm="6" md="4">
                    <v-text-field 
                        dense 
                        label="사업장명" 
                        v-model="param.user_id"
                        placeholder=" " 
                    >                        
                    </v-text-field>
                </v-col>   
                        

                <v-col cols="12" sm="6" md="2">
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
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    }, 
}
</script>
<style>
    
</style>