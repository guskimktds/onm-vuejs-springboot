<template>
    <!-- <div> -->


    <!-- search -->
    <!--
    <table class="search">
        <colgroup>
            <col width="10%"><col width="40%"><col width="10%"><col width="40%">
        </colgroup>
      <tr>
        <th>국사코드 : </th>
        <td><input type="text" v-model="param.local_gw_id" placeholder="국사코드"></td>
        <th>프로세스 : </th>
        <td><input type="text" v-model="param.process" placeholder="프로세스"></td>   
      </tr> 
      <tr> 

        <th>상태 : </th>
        <td colspan="3"><input type="text" v-model="param.process_status" placeholder="상태"></td>   
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table>

   </div>
    -->
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="국사코드" placeholder="Placeholder" outlined v-model="param.local_gw_id">                        
                    </v-text-field>
                </v-col>         
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="프로세스" placeholder="Placeholder" outlined v-model="param.process">                        
                    </v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="3">
                    <v-text-field dense label="상태" placeholder="Placeholder" outlined v-model="param.process_status">                        
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        검색
                    </v-btn>
                </v-col>                
            </v-row>
        </v-container>
    </v-form>

</template>
<script>
export default {
    data() {
        return{
            param: {
                local_gw_id: '',
                process_status: '',
                process: ''
            }
        }
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
    
</style>