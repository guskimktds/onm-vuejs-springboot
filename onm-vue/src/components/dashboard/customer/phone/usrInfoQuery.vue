<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >

        <base-material-card
        icon="mdi-magnify"
        title="사용자 전화번호 조회(기능삭제 - 매장정보 조회 > 사용자 전화번호)"
        class="px-5 py-3"
        >
        <v-row>
          <!-- <v-col cols="12" sm="6">
            <v-date-picker v-model="dates" range></v-date-picker>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="dateRangeText"
              label="Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
            model: {{ dates }}
          </v-col> -->


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
                  label="승인날짜"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="param.approveDate" no-title scrollable range>
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


          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="사용자명"
              v-model="param.userName"
              placeholder=""
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="사용자 ID"
              v-model="param.userId"
              placeholder=" "
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="전화번호"
              v-model="param.phoneNum"
              placeholder=""
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
        approveDate: ["", ""],
        userName: "",
        userId: "",
        phoneNum: "",
      },
      date: false,
      menu: false
    };
  },
  computed: {
    dateRangeText() {
      return this.param.approveDate.join(" ~ ");
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