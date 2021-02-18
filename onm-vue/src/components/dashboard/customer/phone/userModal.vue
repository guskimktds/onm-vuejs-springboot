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
                                            v-model="mask.user_id"
                                            label="사용자 ID"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.tel_no"
                                            label="전화번호"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.auth"
                                            label="전화번호 타입"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.user_name"
                                            label="사용자 이름"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.tel_no_id"
                                            label="Sub ID(전화번호 ID)"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.alim_auth_yn"
                                            label="알림설정권한(Y/N)"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.confirm_yn"
                                            label="승인여부"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.confirm_date"
                                            label="승인날짜"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.status_code"
                                            label="상태코드"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.mgt_status"
                                            label="Mgt 상태코드"
                                            readonly
                                        ></v-text-field>
                                        </v-col>
                                                                                <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.memo"
                                            label="비고"
                                            readonly
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