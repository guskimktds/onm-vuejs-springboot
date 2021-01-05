<!--
<template>
    <div>

    <table style="width:100%; right:10px">
      <tr>
        <td class="buttons" style="text-align:right;">
          <router-link to="/platform/streamerPopup" style="color:black;"><button>추가</button></router-link>
          <router-link to="/platform/streamerPopup" style="color:black;"><button>수정</button></router-link>
          <button>삭제</button>
        </td>
      </tr>
    </table>


    </div>
</template>
<script>


</script>
<style>
    
</style>
-->


<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        추가
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        수정
                    </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                    <v-btn elevation="2" medium v-on:click="searchMethod">
                        삭제
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