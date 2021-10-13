<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            icon="mdi-magnify"
            title="로컬 국사 정보 변경"
            class="px-5 py-3"
        >

            <v-row>
                <v-col cols="3">
                 <v-select 
                  item-text="server_name" 
                  item-value="local_gw_id" 
                  :items="localGwOptions"
                  v-model="localGwId"
                  label="국사코드" 
                  ></v-select>
                </v-col>

                <v-col cols="3">
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

</template>
<script>
import axios from 'axios'

export default {
    props: ['nowGw'],
    data() {
        return {
            localGwOptions:[],
            localGwId:''
        }
    },

beforeCreate() {  
    axios
    .post(`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15008/get_local_gw`)
    .then((response) => {
      this.localGwOptions = response.data.data.local_gw_list;
    })
    .catch(function (error) {
        console.log(error);
        alert("국사정보 조회실패")
      })
      .finally(function () {
      });
  },

    methods: {
        searchMethod: function() {
            this.$emit('gwid',this.localGwId)
        }
    },  
}
</script>
<style>
    
</style>