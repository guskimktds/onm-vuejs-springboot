<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="코드 조회"
            class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드구분" 
                        v-model="param.codeClass"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드" 
                        v-model="param.code"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드명" 
                        v-model="param.name"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="코드타입" 
                        v-model="param.type"
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
                            <span class="headline" >{{ formTitle }}</span>
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
                                    v-model="editedItem.codeClass"
                                    label="코드구분"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.code"
                                    label="코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.name"
                                    label="코드명"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.type"
                                    label="코드타입"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.useYn"
                                    label="사용여부"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.orderby"
                                    label="정렬순서"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="12"
                                >
                                <v-text-field
                                    v-model="editedItem.desc"
                                    label="설명"
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
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
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
                codeClass: '',
                code: '',
                name: '',
                type: ''
            },
            dialog: false,
            dialogDelete: false,        
            editedItem: {
                codeClass: '',
                code: '',
                name: '',
                type: '',
                useYn: '',
                orderby: '',
                desc: '',
                editor: '82095586',
                editDate: '2021-01-06 10:20:30'
            },
            defaultItem: {
                codeClass: '',
                code: '',
                name: '',
                type: '',
                useYn: '',
                orderby: '',
                desc: '',
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

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            //   this.editedIndex = -1
            })
        },
        deleteItemConfirm () {
            // this.pList.splice(this.editedIndex, 1)
            this.closeDelete()
        },
    },  
}
</script>
<style>

</style>