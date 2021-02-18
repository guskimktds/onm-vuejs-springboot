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
                                        
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                        >
                                        <v-text-field
                                            v-model="mask.cdate"
                                            label="생성일시"
                                            readonly
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                        >
                                        <v-text-field
                                            v-model="mask.cdate"
                                            label="생성일시"
                                            readonly
                                        ></v-text-field>
                                        </v-col>
           
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                        >
                                        <v-text-field
                                            v-model="mask.contdivcd"
                                            label="계약자 구분"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                        >
                                        <v-text-field
                                            v-model="mask.telno"
                                            label="전화번호"
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