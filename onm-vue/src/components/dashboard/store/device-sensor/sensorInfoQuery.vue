<template>
  <div>
    <!-- search -->
    <!-- <table class="search">
      <tr>
        <th>등록일시 : </th>
        <td><input type="date" v-model="param.addDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.addDateEnd" placeholder="승인날자"></td>
        <th>단말 GWID : </th>
        <td><input type="text" v-model="param.deviceGWID" placeholder="단말 GWID"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.usrId" placeholder="사용자 ID"></td>
        <th>센서 이름 : </th>
        <td><input type="text" v-model="param.sensorName" placeholder="센서 이름"></td>      
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table> -->
    <v-form>
      <v-container>
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
                  label="등록일시"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="param.addDate" no-title scrollable range>
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
            <v-text-field
              dense
              label="단말 GWID"
              v-model="param.deviceGWID"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.usrId"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="센서 이름"
              v-model="param.sensorName"
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
        addDate: ["", ""],
        deviceGWID: "",
        usrId: "",
        sensorName: "",
      },
      date: false,
      menu: false,
    };
  },
  computed: {
    dateRangeText() {
      if (this.param.addDate[0].length == 0) {
        return "";
      } else return this.param.addDate.join(" ~ ");
    },
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