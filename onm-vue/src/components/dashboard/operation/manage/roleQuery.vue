<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="권한메뉴그룹 조회"
            class="px-5 py-3"
        >
        <v-row>
            <v-col cols="12" sm="6" md="3">
                 <v-select 
                  item-text="auth_group_name" 
                  item-value="auth_group_id" 
                  :items="authMenuOptions"
                  label="권한메뉴리스트" 
                  v-model="param.auth_group_id" 
                  v-on:change="searchMethod"
                  ></v-select>
            </v-col> 

                    <v-col cols="2">
                        <v-dialog
                            v-model="dialog"
                            max-width="400px"
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
                                        <v-col cols="6">
                                        <v-text-field
                                            v-model="editedItem.auth_group_id"
                                            counter
                                            maxlength="4"
                                            label="권한그룹ID"
                                        ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                        <v-text-field
                                            v-model="editedItem.auth_group_name"
                                            counter
                                            maxlength="10"
                                            label="권한그룹이름"
                                        ></v-text-field>
                                        </v-col>
                                    </v-row>                        
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="save"
                                >
                                저장
                                </v-btn>
                                <v-btn
                                color="blue darken-1"
                                text
                                @click="close"
                                >
                                취소
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>                        
                    </v-col> 
        </v-row>
        </base-material-card>       
    </v-container>
</template>
<script>
import axios from "axios"

export default {
    props:['param','authMenuOptions'],
    data() {
        return{
            dialog: false,
            menuList:[],
            subList:[],
            editedItem: {
                auth_group_id:'',
                auth_group_name:''
            },
            reqParam: {
                auth_group_id: '',
                auth_group_name:''
            },
        }
    },
    computed: {
      formTitle () {
        return '권한그룹 등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
        save: function(){
            console.log(this.editedItem)
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            html: "권한메뉴그룹ID : "+this.editedItem.auth_group_id +"<br>권한메뉴그룹이름 : "+this.editedItem.auth_group_name
            }).then(result => {
               if(result.value){
                var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15050/set_onm_group_list`
                this.reqParam.auth_group_id=this.editedItem.auth_group_id
                this.reqParam.auth_group_name=this.editedItem.auth_group_name

                axios
                .post(url, this.reqParam, this.$store.state.headers)
                .then((response) => {
                var resCode = response.data.res_code;
                
                if(resCode == 200){
                    this.$fire({
                       title: "등록 되었습니다.",
                       type : "success"})
                       this.dialog=false
                       this.$router.go();
                }else if(resCode==204){
                    this.$fire({
                       title: "등록 실패하였습니다.",
                       type : "error"})
                    this.dialog=false
                }else{
                    this.$fire({
                       title: "등록 실패하였습니다.",
                       type : "error"})
                    this.dialog=false
                }
                    })
                    .catch((ex) => {
                    console.log('조회 실패',ex)
                    })
               }else{
                   this.close()
               }
            });

        },
        close: function(){
            this.dialog=false
        }

    },  
}
</script>

<style>
</style>