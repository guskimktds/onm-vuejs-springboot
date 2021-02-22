<template>
 
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="매장정보 조회"
        class="px-5 py-3"
        >
        <v-row>
                <v-col>
                    <!-- 디자인을 위한 공백 처리 -->
                </v-col>
            </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="계약 ID"
              v-model="param.said"
              placeholder=" "
            >
            </v-text-field>
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
              label="매장 전화번호"
              v-model="param.tel_no"
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

</template>

<script>
export default {
    props: ['param'],
    data() {
        return {}
    },
    methods: {
        searchMethod: function() {
            this.$emit('search', this.param)
        }
    },  
}
</script>
<style>
</style>