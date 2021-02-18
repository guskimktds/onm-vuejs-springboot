<template>
            <v-col cols="12" sm="6" md="2">
                
                        <v-dialog
                            v-model="show"
                            max-width="400px"
                        >
                            <v-card>
                            <v-card-title>
                                <span class="headline" >{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        
                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.oderno"
                                            label="오더번호"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.terminal_id"
                                            label="단말ID"
                                            readonly
                                        ></v-text-field>
                                        </v-col>
           
                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.said"
                                            label="계약ID"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.mac_id"
                                            label="MAC ID"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.mgt_status"
                                            label="관리상태코드"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12"  md="6">
                                        <v-text-field
                                            v-model="mask.productcode"
                                            label="제품코드"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.modelname"
                                            label="모델명"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.termauthcode"
                                            label="단말인증결과 코드"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.open_oderno"
                                            label="개통오더번호"
                                        ></v-text-field>
                                        </v-col>

                                       <v-col cols="12"  md="6">
                                        <v-text-field
                                            v-model="mask.auth_date"
                                            label="인증일시"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.close_date"
                                            label="삭제일시"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.reg_date"
                                            label="등록일시"
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
                                @click="close"
                                >
                                취소
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>                        
                    </v-col>
</template>
<script>
export default {
    props:['mask'],
    data() {
        return {
            show : false
        }
    },
    computed: {
      formTitle () {
        return '상세보기'
      },
    },
    methods: {
        open(){
            this.show = true;
        },

        close () {
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.show = false;
            })
        },
        
    },
}
</script>
<style>

</style>