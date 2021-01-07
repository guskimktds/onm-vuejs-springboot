<template>
  <!-- <div>

    <table class="search">
      <tr>
        <th>로그인 일시 : </th>
        <td><input type="date" v-model="param.expireDateStart" placeholder="로그인 일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.expireDateEnd" placeholder="로그인 일시"></td>
        <th>로그인 ID : </th>
        <td><input type="text" v-model="param.loginID" placeholder="로그인 ID"></td>
      </tr> 
      <tr> 
        <th>로그아웃 일시 : </th>
        <td><input type="date" v-model="param.logoutDateStart" placeholder="로그아웃 일시"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.logoutDateEnd" placeholder="로그아웃 일시"></td>
        <th>OS타입 : </th>
        <select v-model="param.osType">
            <option disabled value="">선택해주세요</option>
            <option>PC</option>
            <option>iOS</option>
            <option>Android</option>
        </select>
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table>


    </div> -->
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              ref="menu_login"
              v-model="menu_login"
              :close-on-content-click="false"
              :return-value.sync="date_login"
              transition="scale-transition"
              offset-y
              min-width="290px"
              attach
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeTextLogin"
                  label="로그인 일시"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.loginDate"
                no-title
                scrollable
                range
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu_login = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu_login.save(date_login)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="로그인 ID"
              v-model="param.loginID"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-menu
              ref="menu_logout"
              v-model="menu_logout"
              :close-on-content-click="false"
              :return-value.sync="date_logout"
              transition="scale-transition"
              offset-y
              min-width="290px"
              attach
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeTextLogout"
                  label="로그아웃 일시"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.logoutDate"
                no-title
                scrollable
                range
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu_logout = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu_logout.save(date_logout)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="param.osType"
              :items="items"
              label="OS타입"
              attach
            ></v-select>
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
        loginDate: ["", ""],
        loginID: "",
        logoutDate: ["", ""],
        osType: "",
      },
      items: ["PC", "iOS", "Android"],
      date_login: false,
      menu_login: false,
      date_logout: false,
      menu_logout: false,
    };
  },
  computed: {
    dateRangeTextLogin() {
      if (this.param.loginDate[0].length == 0) {
        return "";
      } else return this.param.loginDate.join(" ~ ");
    },
    dateRangeTextLogout() {
      if (this.param.logoutDate[0].length == 0) {
        return "";
      } else return this.param.logoutDate.join(" ~ ");
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