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
                
                <v-col cols="12" sm="6" md="2">
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
                                <!-- <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                        v-model="editedItem.cam_prod_id"
                                        label="카메라 제품 ID"
                                        counter
                                        maxlength="20"
                                    ></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field
                                        v-model="editedItem.cam_prod_name"
                                        label="카마레 제품명"
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
                </v-col>
            </v-row>       
       </base-material-card>       
    </v-container>
</template>

<script>
import dateInfo from '../../../../utils/common';
export default {
    
    props:['param'],
    data() {
        return{
            status_text:'',       
            dialog: false,    
            editedItem: {
                cam_type: 'C',
                cam_prod_id: '',    
                cam_prod_name: '',
                reg_date: '',     
            },
            defaultItem: {
                cam_type: 'C',
                cam_prod_id: '',     
                cam_prod_name: '',
                reg_date: '',    
            }
        }
    },
    computed: {
      formTitle () {
        return '카메라 제품정보 등록'
      },
    },

    methods: {
        showAuth(){
            var auth=this.$store.state.authGroupId
            if(auth=='G100'){
              return true;
            }else{
            alert('접근권한이 없습니다.')
              return false;
            }
        },

        searchMethod: function() {
            this.$emit('search', this.param)
        },

        save() {
            console.log('save method call : ',this.editedItem)     
            // 등록
            this.editedItem.cmd_type = 'I'
            this.editedItem.cam_type = 'C'
            this.editedItem.reg_date = dateInfo().current 
            this.$emit('Items',this.editedItem)
            this.close()
        },

        saveSure(){
            this.$fire({
                title: "등록하시겠습니까?",
                type: "error",
            }).then(result => {
               if(result.value){
                   this.save()
               }else{
                   this.closeSure()
               }
            });
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            })
        },

        closeSure(){
            this.close()
            this.$fire({
                title: "등록이 취소되었습니다.",
                type: "error",
            })
        },
    }
}
</script>

<style>

</style>