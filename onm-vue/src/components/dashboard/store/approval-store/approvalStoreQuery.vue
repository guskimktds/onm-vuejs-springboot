<template>
    <div>
        <v-form>
        <v-container
            id="regular-tables"
            fluid
            tag="section">
            <base-material-card
            icon="mdi-magnify"
            title="매장 승인 내역 조회"
            class="px-5 py-3"
            >
           <v-row>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.start_date"
                        label="시작일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.start_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="3">
                    <v-menu
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        v-model="param.end_date"
                        label="종료일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.end_date" no-title scrollable>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-switch
                        v-model="param.date_yn"                    
                        :label="`날짜검색`"
                        color="secondary"
                    ></v-switch>
                </v-col>
            </v-row> 
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                    label="승인자 ID"
                    v-model="param.admin_id"
                    placeholder=" "
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                    label="사이트 ID"
                    v-model="param.site_id"
                    placeholder=" "
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-text-field
                    label="사이트 명"
                    v-model="param.site_name"
                    placeholder=" "
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                    <v-select 
                    item-text="server_name" 
                    item-value="local_gw_id" 
                    :items="localGwOptions"
                    label="상태코드" 
                    v-model="param.local_gw_id" 
                    v-on:change="searchMethod"
                    ></v-select>
                </v-col>  
                <v-col cols="auto">
                <v-btn 
                elevation="2" 
                medium
                v-on:click="searchMethod"
                >
                검색
                </v-btn>
                </v-col>
            </v-row>
        </base-material-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
    export default {
        props: ['param','localGwOptions'],
        data() {
            return {
            }
        },

        methods: {
            searchMethod: function () {
            this.$emit("search", this.param);
            },
        },
    };
</script>