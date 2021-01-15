<template>   
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="고객이전 조회"
            class="px-5 py-3"
        >
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.startdate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                    
                </v-col> 
                ~        
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="검색기간" 
                        v-model="param.enddate"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="상태코드" 
                        v-model="param.status"
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
                </v-col>

                <v-col>
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                고객이전 실행
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

import EventBus from '../../../../EventBus';

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
            }

        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '고객이전' : '수정'
        return '고객이전'
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