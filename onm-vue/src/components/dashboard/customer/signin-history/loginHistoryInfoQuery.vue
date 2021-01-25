<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-magnify"
      title="로그인 이력 조회"
      class="px-5 py-3"
    >
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
            <v-date-picker v-model="login_date_range" no-title scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="unselected_login">
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

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            dense
            label="로그인 ID"
            v-model="param.login_id"
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
            <v-date-picker v-model="logout_date_range" no-title scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="unselected_logout">
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

        <v-col cols="12" sm="6" md="2">
          <v-select
            v-model="param.os_type"
            :items="items"
            label="OS타입"
            attach
          ></v-select>
        </v-col>

        <v-col cols="auto">
          <v-btn v-on:click="searchMethod">검색</v-btn>
        </v-col>
      </v-row>
    </base-material-card>
  </v-container>
</template>
<script>
export default {
  props: ["param"],
  data() {
    return {
      login_date_range: ["", ""],
      logout_date_range: ["", ""],
      items: ["선택안함","PC", "iOS", "Android"],
      date_login: false,
      menu_login: false,
      date_logout: false,
      menu_logout: false,
    };
  },
  computed: {
    dateRangeTextLogin() {
      if (this.login_date_range[0].length == 0) {
        return "";
      } else {
        if (this.login_date_range[0] > this.login_date_range[1]) {
          return this.login_date_range[1] + " ~ " + this.login_date_range[0];
        } else return this.login_date_range.join(" ~ ");
      }
    },
    dateRangeTextLogout() {
      if (this.logout_date_range[0].length == 0) {
        return "";
      } else {
        if (this.logout_date_range[0] > this.logout_date_range[1]) {
          return this.logout_date_range[1] + " ~ " + this.logout_date_range[0];
        } else return this.logout_date_range.join(" ~ ");
      }
    },
  },

  methods: {
    unselected_login: function () {
      this.menu_login = false;
      this.login_date_range = ["", ""];
    },
    unselected_logout: function () {
      this.menu_logout = false;
      this.logout_date_range = ["", ""];
    },

    searchMethod: function () {
      if (this.login_date_range.length > 1) {
        if (this.login_date_range[0] > this.login_date_range[1]) {
          this.param.login_start_date = this.login_date_range[1];
          this.param.login_end_date = this.login_date_range[0];
        } else {
          this.param.login_start_date = this.login_date_range[0];
          this.param.login_end_date = this.login_date_range[1];
        }
      }
      if (this.logout_date_range.length > 1) {
        if (this.logout_date_range[0] > this.logout_date_range[1]) {
          this.param.logout_start_date = this.logout_date_range[1];
          this.param.logout_end_date = this.logout_date_range[0];
        } else {
          this.param.logout_start_date = this.logout_date_range[0];
          this.param.logout_end_date = this.logout_date_range[1];
        }
      }
      this.param.login_start_date = this.param.login_start_date.replace(/-/g, "");
      this.param.login_end_date = this.param.login_end_date.replace(/-/g, "");
      this.param.logout_start_date = this.param.logout_start_date.replace(/-/g, "");
      this.param.logout_end_date = this.param.logout_end_date.replace(/-/g, "");

      if (this.param.os_type === "선택안함") {
        this.param.os_type = "";
      }
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>