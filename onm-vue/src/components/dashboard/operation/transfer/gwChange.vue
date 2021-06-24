<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section">

        <base-material-card
            icon="mdi-cached"
            title="수용 국사 조회 및 변경"
            class="px-5 py-3">
            <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="3">
                 <v-select 
                  item-text="server_name" 
                  item-value="local_gw_id" 
                  :items="filteredData"
                  label="국사코드" 
                  v-model="param.local_gw_id" 
                  v-on:change="searchMethod"
                  ></v-select>

                <v-col cols="3">
                    <v-dialog
                        v-model="dialog"
                        max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="indigo"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on">
                                수용국사수정
                            </v-btn>
                        </template> 
                        <v-card>
                            <v-card-title>
                                <span class="headline" >{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                <v-select 
                                item-text="server_name" 
                                item-value="local_gw_id" 
                                :items="localGwOptions"
                                label="국사코드" 
                                v-model="editedItem.local_gw_id" 
                                ></v-select>
                                </v-col>
                            </v-row>
                            </v-card-text>
                             <v-card-actions>
                            <v-spacer></v-spacer>
                            
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="saveSure"
                            >
                            저장
                            </v-btn>
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="closeSure"
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
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>
