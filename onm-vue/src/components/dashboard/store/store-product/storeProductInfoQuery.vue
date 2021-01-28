<template>
  <div>
    <v-form>
      <v-container>
         <base-material-card
         icon="mdi-magnify"
         title="매장상품정보 조회"
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
                  label="수정일시"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.mod_date"
                no-title
                scrollable
                range
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="상품번호"
              v-model="param.prod_code"
              placeholder=" "
        
            >
            </v-text-field>
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
        mod_date: ["", ""],
        prod_code: "",
        user_id: "",
      },
      date: false,
      menu: false,
    };
  },
  computed: {
    dateRangeText() {
      if (this.param.mod_date[0].length == 0) {
        return "";
      } else return this.param.mod_date.join(" ~ ");
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