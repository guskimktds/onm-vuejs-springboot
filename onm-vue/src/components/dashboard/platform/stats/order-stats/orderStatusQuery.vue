<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="청약 통계 조회"
            class="px-5 py-3"
        >

            <v-row>

                <v-col cols="12" sm="6" md="3">
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
                        label="희망일자"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="param.appointdate" no-title scrollable range>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">
                        Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">
                        OK
                        </v-btn>
                    </v-date-picker>
                    </v-menu>
                </v-col>
                
 
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>                
            </v-row>

        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['param'],
    data() {
        return{
            date: false,
            menu: false
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },
    computed: {
        dateRangeText() {
            if (this.param.appointdate.length == 0) {
                return "";
            } else return this.param.appointdate.join(" ~ ");
        },
    }
}
</script>
<style>
    
</style>