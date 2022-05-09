<template>
      <v-container
        id="regular-tables"
        fluid
        tag="section">
        <base-material-card
        icon="mdi-magnify"
        title="카메라 정보 조회"
        class="px-5 py-3"
        >

        <v-row>
          <v-col cols="2">
                  <v-select 
                    label="단말 구분" 
                    v-model="selected"
                    :items="items"
                    item-text="state"
                    item-value="abbr"
                  ></v-select> 
          </v-col>
         <v-col cols="2">
                    <v-dialog
                        v-model="camInsert"
                        max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="indigo darken-3"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                카메라모델등록
                            </v-btn>
                        </template>

                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="camItem.dev_type"
                                    label="단말구분"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="camItem.vendor_name"
                                    label="제조사명"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="camItem.model_name"
                                    label="모델명"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="camItem.conn_id"
                                    label="단말접속ID"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="camItem.product_code"
                                    label="제품코드"
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
                            @click="saveCam"
                            >
                            저장
                            </v-btn>
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="closeCam"
                            >
                            취소
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-col cols="2">
                    <v-dialog
                        v-model="firmInsert"
                        max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="red"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                펌웨어등록
                            </v-btn>
                        </template>

                        <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="firmItem.dev_type"
                                    label="단말구분"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="firmItem.product_code"
                                    label="제품코드"
                                ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                <v-text-field                            
                                    v-model="firmItem.firmware_version"
                                    label="펌웨어 버전"
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
                            @click="saveFirm"
                            >
                            저장
                            </v-btn>
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="closeFirm"
                            >
                            취소
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-text-field
              label="모델명"
              v-model="param.model_name"
              placeholder=" ">
            </v-text-field>
          </v-col>

          <v-col cols="3">
            <v-text-field
              label="제품코드"
              v-model="param.product_code"
              placeholder=" ">
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
import axios from 'axios';
export default {
    props: ['param'],
    data() {
        return {
          selected:'CAM',
            items:[
                {state:'CAM', abbr:'CAM'},
                {state:'IOT', abbr:'IOT'},
            ],
          camInsert:false,
          firmInsert:false,
          camItem: {
                dev_type:'',
                product_code:'',
                vendor_name:'',
                model_name:'',
                conn_id: '',
                cmd_type: ''
            },
            firmItem:{
              dev_type:'',
              product_code:'',
              firmware_version:'',
              cmd_type: ''
            }
        }
    },

  methods: {
    searchMethod: function () {
      this.param.dev_type=this.selected
      this.$emit("search", this.param);
    },
    saveCam: function(){
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "단말구분 : "+this.camItem.dev_type+
            "<br/>제조사명 : "+this.camItem.vendor_name+
            "<br/>모델명 : "+this.camItem.model_name+
            "<br/>단말접속ID : "+this.camItem.conn_id+
            "<br/>제품코드 : "+this.camItem.product_code,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
            }).then(result => {
               if(result.value){
                      this.camItem.cmd_type='I'
                      var params = this.camItem
                      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15041/set_cam_model_info`

                      axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  console.log(response)
                                }else{
                                  console.log("등록실패"+resCode);
                                }
                              })
                              .catch((ex) => {
                                console.log('등록 실패',ex)
                              })
               }else{
                 this.closeCam()
               }
            });
            this.closeCam()
    },
    saveFirm: function(){
            this.$fire({
            title: "정말 등록 하시겠습니까?",
            type: "question",
            html: "단말구분 : "+this.firmItem.dev_type+
            "<br/>제품코드 : "+this.firmItem.product_code+
            "<br/>펌웨어 버전 : "+this.firmItem.firmware_version,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
            }).then(result => {
               if(result.value){
                      this.firmItem.cmd_type='I'
                      var params = this.firmItem
                      var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15031/set_cam_firmware_info`

                      axios.post(url, params, this.$store.state.headers)
                              .then((response) => {
                                var resCode = response.data.res_code;
                                console.log(params)
                                console.log(response)
                                if(resCode == 200){
                                  console.log(response)
                                }else{
                                  console.log("등록실패"+resCode);
                                }
                              })
                              .catch((ex) => {
                                console.log('등록 실패',ex)
                              })
               }else{
                 this.closeFirm()
               }
            });
            this.closeFirm()
    },
    closeCam: function(){
      this.camInsert=false
    },
    closeFirm: function(){
      this.firmInsert=false
    }
  },
};  
</script>
<style>
</style>