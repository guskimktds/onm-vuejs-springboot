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
                                            v-model="mask.said"
                                            label="서비스계약아이디"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.oderno"
                                            label="오더번호"
                                            readonly
                                        ></v-text-field>
                                        </v-col>
           
                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.id_seq"
                                            label="일련번호"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.tel_no"
                                            label="전화번호"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.oderdivcd"
                                            label="오더구분"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12"  md="6">
                                        <v-text-field
                                            v-model="mask.status_code"
                                            label="상태코드"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.close_type"
                                            label="삭제유형"
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
                                            label="등록일"
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