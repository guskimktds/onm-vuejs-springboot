<template>
  <div>
    
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.usrID"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="VA 명"
              v-model="param.vaName"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn v-on:click="searchMethod">검색</v-btn>
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
        usrID: "",
        vaName: "",
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