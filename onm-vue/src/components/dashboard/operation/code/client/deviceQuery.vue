<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="client 단말 정보 조회"
            class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="앱버전" 
                        v-model="param.appversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="OS타입" 
                        v-model="param.ostype"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field 
                        dense 
                        label="업데이터버전" 
                        v-model="param.updateversion"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>                
                <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                        color="primary"
                    >
                        검색
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
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
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.appversion"
                                    label="앱버전ID"
                                    
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.ostype"
                                    label="OS타입"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.updateversion"
                                    label="업데이트 버전"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.versioncode"
                                    label="버전코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.downloadurl"
                                    label="다운로드 URL"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.updateyn"
                                    label="필수 업데이트여부"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.createdate"
                                    label="등록일시"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.updatedate"
                                    label="수정일시"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.title"
                                    label="타이틀"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12" sm="6" md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.content"
                                    label="내용"
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
                </v-col>
            </v-row>
            
      </base-material-card>       
    </v-container>
</template>
<script>

import EventBus from '../../../../../EventBus';


export default {
    data() {
        return{
            param: {
                appversion: '',
                ostype: '',
                updateversion: ''
            },
            dialog: false,
            editedItem: {
                appversion: '',
                ostype: '',
                updateversion: '',
                versioncode: '',
                downloadurl: '',
                updateyn: '',
                createDate: '',
                updateDate: '',
                title: '',
                content: '',
                editor: '82095586',
                editDate: '2021-01-06 10:20:30'
            },
            defaultItem: {
                appversion: '',
                ostype: '',
                updateversion: '',
                versioncode: '',
                downloadurl: '',
                updateyn: '',
                createDate: '',
                updateDate: '',
                title: '',
                content: '',
                editor: '82095586',
                editDate: '2021-01-06 10:20:30'
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
    },  
}
</script>
<style>

</style>