<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="로컬 국사 정보 조회"
            class="px-5 py-3"
        >
            <v-row>
                <!-- <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="국사코드" 
                        v-model="param.local_gw_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="서버명" 
                        v-model="param.server_name"
                        placeholder="Placeholder" 
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
                </v-col> -->
                <v-col cols="12" sm="6" md="10"></v-col>
                <v-col cols="12" sm="6" md="2">
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
                    flat
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
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.local_gw_id"
                                label="LOCAL_GW_ID"
                                
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.server_name"
                                label="서버명"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.server_url"
                                label="서버URL"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.ws_url"
                                label="웹소켓URL"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.pattern"
                                label="국사판단패턴"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.ec_url"
                                label="EC URL"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.ldms_url"
                                label="LDMS URL"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.max_cam_cnt"
                                label="STM 최대 수용 카메라 수"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.max_va_cnt"
                                label="VA서버 최대 분석 채널 수"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="6"
                            >
                            <v-text-field
                                v-model="editedItem.version_code"
                                label="INT 배포버전 코드"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="12"
                            >
                            <v-text-field
                                v-model="editedItem.mq_url"
                                label="MQ URL"
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
                        완료
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
                <!-- <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    </v-card>
                </v-dialog> -->
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium
                    v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
                </v-col>   
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium
                    v-on:click="searchMethod"
                    >
                        등록
                    </v-btn>
                </v-col> 
                              
            </v-row> -->
        </base-material-card>
    </v-container>
</template>
<script>

import EventBus from '../../../../../EventBus';

export default {
    props:['param'],
    data() {
        return{
            // param: {
            //     url: '',
            //     name: '',
            //     websocket: ''
            // },
            dialog: false,
            // dialogDelete: false,
            editedItem: {
                local_gw_id: '',
                server_name: '',
                server_url: '',
                ws_url: '',
                pattern: '',
                ec_url: '',
                ldms_url: '',
                max_cam_cnt: 0,
                max_va_cnt: 0,
                version_code: '',
                mq_url: '',
                cmd_type:''
            },
            defaultItem: {
                local_gw_id: '',
                server_name: '',
                server_url: '',
                ws_url: '',
                pattern: '',
                ec_url: '',
                ldms_url: '',
                max_cam_cnt: 0,
                max_va_cnt: 0,
                version_code: '',
                mq_url: '',
                cmd_type:''
            },

        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },

        save () {
            console.log('save method call : ',this.editedItem)        
            // 수정
            this.editedItem.cmd_type = 'I'
            EventBus.$emit('createItem', this.editedItem)

            this.close()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            // this.editedIndex = -1
            })
        },

        // closeDelete () {
        //     this.dialogDelete = false
        //     this.$nextTick(() => {
        //     this.editedItem = Object.assign({}, this.defaultItem)
        //     //   this.editedIndex = -1
        //     })
        // },
        // deleteItemConfirm () {
        //     // this.codeList.splice(this.editedIndex, 1)
        //     this.closeDelete()
        // }
    }
}
</script>
<style>

</style>