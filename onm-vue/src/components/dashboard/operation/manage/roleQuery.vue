<template>
    <v-container
    id="regular-tables"
    fluid
    tag="section"
    >

        <base-material-card
            icon="mdi-magnify"
            title="권한메뉴그룹 조회"
            class="px-5 py-3"
        >
        <v-row>
            <v-col cols="3">
                <v-text-field
                    label="권한그룹ID" 
                    v-model="param.auth_group_id" 
                    placeholder=" " >                        
                </v-text-field>
            </v-col>
            <v-col cols="2" >
                <v-btn 
                    elevation="2" 
                    medium
                    v-on:click="searchMethod"
                    >
                    검색</v-btn>
            </v-col>     
                    <v-col cols="2">
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
                                        <v-col cols="6">
                                        <v-text-field
                                            v-model="editedItem.menu_id"
                                            counter
                                            maxlength="10"
                                            label="권한그룹ID"
                                        ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            상위메뉴ID<br>
                                            <input type="checkbox" value="M100" v-model="menuList">
                                            <label for="M100">M100</label>
                                            <input type="checkbox" value="M200" v-model="menuList">
                                            <label for="M100">M200</label>
                                            <input type="checkbox" value="M300" v-model="menuList">
                                            <label for="M100">M300</label>
                                            <input type="checkbox" value="M400" v-model="menuList">
                                            <label for="M100">M400</label>
                                            <input type="checkbox" value="M500" v-model="menuList">
                                            <label for="M100">M500</label>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            하위메뉴ID<br>
                                            <input type="checkbox" value="M100" v-model="subList">
                                            <label for="M100">M100</label>
                                            <input type="checkbox" value="M200" v-model="subList">
                                            <label for="M100">M200</label>
                                            <input type="checkbox" value="M300" v-model="subList">
                                            <label for="M100">M300</label>
                                            <input type="checkbox" value="M400" v-model="subList">
                                            <label for="M100">M400</label>
                                            <input type="checkbox" value="M500" v-model="subList">
                                            <label for="M100">M500</label>
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


export default {
    props:['param'],
    data() {
        return{
            dialog: false,
            menuList:[],
            subList:[],
            editedItem: {
                menu_id: '',     
                upper_menu_id:''
            },
            defaultItem: {
                onm_user_id: '',     
                accept_ip: '',
                auth_group_id: '',
                cmd_type: '' 
            }

        }
    },
    computed: {
      formTitle () {
        return '권한그룹 등록'
      },
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        },
        save: function(){
            console.log(this.editedItem)
            console.log(this.menuList)
        },
        close: function(){
            this.dialog=false
        }

    },  
}
</script>

<style>
</style>