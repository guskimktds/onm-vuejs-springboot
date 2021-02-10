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
                <v-col cols="12" sm="6" md="4">
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
                        label="검색기간"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="searchDate"
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
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="매장ID" 
                        v-model="param.user_id"
                        placeholder="Placeholder" 
                    >                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field 
                        dense 
                        label="상태코드" 
                        v-model="param.status_code"
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
                                    label="매장ID"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.to_local"
                                    label="이전할 국사코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.process_code"
                                    label="고객이전 처리코드"
                                ></v-text-field>
                                </v-col>
                                <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                >
                                <v-text-field
                                    v-model="editedItem.step"
                                    label="진행여부(Y/N)"
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
    props:['param'],
    data() {
        return{
            // param: {
            //     codeClass: '',
            //     code: '',
            //     name: '',
            //     type: ''
            // },
            searchDate: ["", ""],            
            date: false,
            menu: false,
            dialog: false,
            editedItem: {
                user_id: '',
                to_local: '',
                process_code: '',
                step: '',
                // mod_date:'',
                // reg_date:''
            },
             defaultItem: {
                user_id: '',
                to_local: '',
                process_code: '',
                step: '',
                // mod_date:'',
                // reg_date:''
            }

        }
    },
    computed: {
        formTitle () {
            // return this.editedIndex === -1 ? '고객이전' : '수정'
            return '고객이전'
        },

        dateRangeText() {
            return this.searchDate.join(" ~ ");
        },
    },
    methods: {
        searchMethod: function() {
            var newParam = this.param
            var startDate, endDate
            console.log(this.searchDate.length)
            if(this.searchDate.length > 1)
            {
                if(this.searchDate[0] > this.searchDate[1]){
                    startDate = this.searchDate[1]
                    endDate = this.searchDate[0]
                }
                else{
                    startDate = this.searchDate[0]
                    endDate = this.searchDate[1]
                }
            }
            newParam.start_date = startDate.replace(/-/g,"")
            newParam.end_date = endDate.replace(/-/g,"")
            console.log(newParam)

            this.$emit('search', newParam)
        },

        save () {
            console.log('save method call : ',this.editedItem)        
            
            EventBus.$emit('createItemTransfer', this.editedItem)

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