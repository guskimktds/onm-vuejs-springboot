<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="푸시 발송 이력 조회"
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
                  label="알림시간"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.alarmTime"
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
              label="알림 ID"
              v-model="param.alarmId"
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
              label="카메라 ID"
              v-model="param.camId"
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
  data() {
    return {
      param: {
        alarmTime: ["", ""],
        alarmId: "",
        usrId: "",
        camId: "",
      },
      date: false,
      menu: false,
    };
  },
  computed: {
    dateRangeText() {
      if (this.param.alarmTime[0].length == 0) {
        return "";
      } else return this.param.alarmTime.join(" ~ ");
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