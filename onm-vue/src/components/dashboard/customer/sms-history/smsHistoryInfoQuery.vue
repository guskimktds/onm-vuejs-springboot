<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-material-card
      icon="mdi-magnify"
      title="SMS 발송 이력 조회"
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
                label="요청시간"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date_range" no-title scrollable range>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="unselected"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            dense
            label="발송 전화번호"
            v-model="param.tel_number"
            placeholder=" "
            outlined
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field
            dense
            label="OTP 번호"
            v-model="param.otp"
            placeholder=" "
            outlined
          >
          </v-text-field>
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
      date_range: ["", ""],
      date: false,
      menu: false,
    };
  },
  computed: {
    dateRangeText() {
      if (this.date_range[0].length == 0) {
        return "";
      } else {
        if (this.date_range[0] > this.date_range[1]) {
          return this.date_range[1] + " ~ " + this.date_range[0];
        } else return this.date_range.join(" ~ ");
      }
    },
  },
  methods: {
    unselected: function () {
      this.menu = false;
      this.date_range = ["", ""];
    },

    searchMethod: function () {
      if (this.date_range.length > 1) {
        if (this.date_range[0] > this.date_range[1]) {
          this.param.start_date = this.date_range[1];
          this.param.end_date = this.date_range[0];
        } else {
          this.param.start_date = this.date_range[0];
          this.param.end_date = this.date_range[1];
        }
      }
      
      this.param.start_date = this.param.start_date.replace(/-/g, "");
      this.param.end_date = this.param.end_date.replace(/-/g, "");
      this.$emit("search", this.param);
    },
  },
};
</script>
<style>
</style>