<template>
  <div>
    <v-form>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="매장정보 상세 조회"
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
                  label="희망처리일자"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="param.appoint_date"
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
              label="매장명"
              v-model="param.user_name"
              placeholder=" "
          
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="매장ID"
              v-model="param.user_id"
              placeholder=" "
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="상태"
              v-model="param.status_code"
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
    props: ['param'],
    data() {
        return {
          date:false,
          menu:false
        }
    },
  computed: {
    dateRangeText() {
      if (this.param.appoint_date.length == 0) {
        return "";
      } else return this.param.appoint_date.join(" ~ ");
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