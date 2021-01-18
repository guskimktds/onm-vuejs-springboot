<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="실시간 접속 세션 조회"
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
                  label="만료일"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.expireDate"
                no-title
                scrollable
                range
              >
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
              label="전화번호"
              v-model="param.phoneNum"
              placeholder=""
              outlined
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.userId"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="param.deviceType"
              :items="items"
              label="장치타입"
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
  data() {
    return {
      param: {
        expireDate: ["", ""],
        phoneNum: "",
        userID: "",
        deviceType: "",
      },
      items: ["PC", "iPhone", "Android"],
      date: false,
      menu: false,
    };
  },

  computed: {
    dateRangeText() {
      if (this.param.expireDate[0].length == 0) {
        return "";
      } else return this.param.expireDate.join(" ~ ");
    },
  },
  methods: {
    searchMethod: function () {
      this.param.expireDate[0] += " 00:00:00.000000";
      this.param.expireDate[1] += " 00:00:00.000000";
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>