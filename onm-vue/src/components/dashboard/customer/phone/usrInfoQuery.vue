<template>
  <!-- <div>
    <table class="search">
      <tr>
        <th>승인날짜 : </th>
        <td><input type="date" v-model="param.approveDateStart" placeholder="승인날자"></td>
        <th> ~ </th>
        <td><input type="date" v-model="param.approveDateEnd" placeholder="승인날자"></td>
        <th>사용자명 : </th>
        <td><input type="text" v-model="param.userName" placeholder="사용자명"></td>
      </tr> 
      <tr> 
        <th>사용자 ID : </th>
        <td><input type="text" v-model="param.userID" placeholder="사용자 ID"></td>
        <th>전화번호 : </th>
        <td><input type="text" v-model="param.phoneNum" placeholder="전화번호"></td>      
      </tr>
      <button v-on:click="searchMethod">검색</button>
    </table>
    </div> -->
  <div>
    <v-form>
      <v-container>
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
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateRangeText"
                  label="Date range"
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


          <v-col cols="12" sm="6" md="3">
            <v-text-field
              dense
              label="사용자명"
              v-model="param.userName"
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
      </v-container>
    </v-form>
  </div>
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