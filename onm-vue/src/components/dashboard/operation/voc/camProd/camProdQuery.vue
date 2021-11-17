<template>
  <v-container id="regular-tables" fluid tag="section">
        <base-material-card icon="mdi-magnify" title="카메라 제품정보 조회" class="px-5 py-3">            
            <v-row>      
                <v-col cols="12" sm="6" md="3">
                     <v-text-field 
                        label="카메라 제품 ID" 
                        v-model="param.cam_prod_id"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        label="카메라 제품명" 
                        v-model="param.cam_prod_name"
                        placeholder=" "
                    >                        
                    </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
                </v-col>
                
                <!-- <v-col cols="12" sm="6" md="2">
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                        v-show="showAuth()"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="indigo"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                등록
                            </v-btn>
                        </template>

                        <v-card>    
                        <v-card-title>
                            <span class="headline" >{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-select label="단말구분"
                                        v-model="selected"
                                        :items="items"
                                        item-text="state"
                                        item-value="abbr"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                        v-model="editedItem.product_code"
                                        label="제품코드"
                                        counter
                                        maxlength="20"
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                        v-model="editedItem.vender_name"
                                        label="제조사명"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                        v-model="editedItem.model_name"
                                        label="모델명"
                                        counter
                                        maxlength="20"
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                        v-model="editedItem.conn_id"
                                        label="단말접속ID"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="saveSure">저장</v-btn>
                            <v-btn color="blue darken-1" text @click="closeSure">취소</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>                  
                </v-col> -->
            </v-row>       
       </base-material-card>       
    </v-container>
</template>

<script>
export default {
    
    props:['param'],
    data() {
        return{
            status_text:'',       
            dialog: false,    
            editedItem: {
                cam_prod_id: '',     
                cam_prod_name: '',
                cam_type: '',
                opening_date: '',
                reg_date: '',     
            },
            defaultItem: {
                cam_prod_id: '',     
                cam_prod_name: '',
                cam_type: '',
                opening_date: '',
                reg_date: '',    
            }
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
    }
}
</script>

<style>

</style>