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
                                            label="매장ID"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.user_name"
                                            label="매장명"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.prod_code"
                                            label="상품코드"
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
                                            v-model="mask.order_no"
                                            label="주문번호"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.iot_target_seq"
                                            label="iot target seq"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.iot_member_seq"
                                            label="iot member seq"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.mod_date"
                                            label="수정일시"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.local_gw_id"
                                            label="로컬융합GW아이디"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="mask.appoint_date"
                                            label="희망처리일자"
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