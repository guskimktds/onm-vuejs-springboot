<template>
    <v-form>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="매장정보 조회"
        class="px-5 py-3"
        >
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="계약 ID"
              v-model="param.contractId"
              placeholder=" "
              v-on:click="counter+=1"
            >
            
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="사용자명"
              v-model="param.usrName"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.usrID"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="사용자 전화번호"
              v-model="param.usrNumber"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="auto">
            <v-btn color="primary"
               v-on:click="searchMethod"
               >
               검색
            </v-btn>
          </v-col>

        </v-row>
        </base-material-card>
      </v-container>
    </v-form>
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