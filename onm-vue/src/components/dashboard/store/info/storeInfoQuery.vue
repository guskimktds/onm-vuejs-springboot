<template>
  <div>
    <!-- <table class="search">
      <tr>
        <th>계약 ID : </th>
        <td><input type="text" v-model="param.contractId" placeholder="계약 ID"></td>
        <th>사용자명 : </th>
        <td><input type="text" v-model="param.usrName" placeholder="사용자명"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrID" placeholder="사용자 ID"></td>
        <th>사용자 전화번호 : </th>
        <td><input type="text" v-model="param.usrNumber" placeholder="전화번호"></td>      
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table> -->
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="계약 ID"
              v-model="param.contractId"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자명"
              v-model="param.usrName"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.usrID"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 전화번호"
              v-model="param.usrNumber"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
                    <v-btn 
                        elevation="2" 
                        medium
                        v-on:click="searchMethod"
                    >
                        검색
                    </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      param: {
        contractId: "",
        usrName: "",
        usrID: "",
        usrNumber: "",
      },
    };
  },
  methods: {
    searchMethod: function () {
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>