<template>

    <v-container
    id="regular-tables"
    fluid
    tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="계정 정보 조회"
        class="px-5 py-3"
        >
                <v-row >
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field dense label="사번" 
                        v-model="param.id" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col>         
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field dense label="이름" 
                        v-model="param.name" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col> 
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field dense label="권한" 
                        v-model="param.auth" 
                        placeholder="Placeholder" >                        
                        </v-text-field>
                    </v-col>
                    <v-col cols="auto" >
                        <v-btn color="primary"
                            v-on:click="searchMethod"
                            >
                            검색
                        </v-btn>
                    </v-col>  
                    <v-col cols="12" sm="6" md="2">
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
                                        <!-- <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        > -->
                                        <v-text-field
                                            v-model="editedItem.id"
                                            label="사번"
                                        ></v-text-field>
                                        <!-- </v-col> -->
                                    </v-row>
                                    <v-row>
                                        <!-- <v-col
                                        cols="12"
                                        > -->
                                        <v-text-field
                                            v-model="editedItem.ip"
                                            label="접속 IP"
                                        ></v-text-field>
                                        <!-- </v-col> -->
                                    </v-row>
                                    <v-row>
                                        <!-- <v-col
                                        cols="12"
                                        sm="6"
                                        md="4"
                                        > -->
                                        <v-text-field
                                            v-model="editedItem.auth"
                                            label="권한"
                                        ></v-text-field>
                                        <!-- </v-col> -->
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

// import modalTemplate from './signUpModal'
// Vue.component('modal', {
//   template: '#modal-template'
// })

import EventBus from '../../../../EventBus'


export default {
    // components:{
    //     appMyModal: modalTemplate
    // },
    data() {
        return{
            param: {
                id: '',
                name: '',
                auth: ''
            },
            // showModal: false,
            // visible: false,
            // modalTitle: '계정등록',
            dialog: false,
            editedItem: {
                id: '',
                name: '',
                auth: ''
            },

        }
    },
    computed: {
      formTitle () {
        // return this.editedIndex === -1 ? '등록' : '수정'
        return '계정등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
        registUser: function() {
            console.log("사용자 등록 화면으로 이동한다. -> 완료 또는 취소되면 이전화면으로 이동")
        },
        handleClickButton(){
            this.visible = !this.visible
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
v-btn {
    margin: auto;
}
</style>