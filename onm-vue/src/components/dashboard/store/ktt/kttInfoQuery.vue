<template>
  <div>
  
    <v-form>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="KTT 정보 조회"
        class="px-5 py-3"
        >
        <v-row>
          <v-col cols="12" sm="6" md="2">
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
              <v-date-picker v-model="param.reg_date" no-title scrollable range>
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
              label="사용자 ID"
              v-model="param.user_id"
              placeholder=" "
              
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="서비스 번호"
              v-model="param.service_no"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="시스템 ID"
              v-model="param.system_id"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        reg_date: ["",""],
        user_id: "",
        service_no: "",
        system_id: "",
      },
      date: false,
      menu: false,
    };
  },
  computed: {
    dateRangeText() {
      if (this.param.reg_date[0].length == 0) {
        return "";
      } else return this.param.reg_date.join(" ~ ");
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