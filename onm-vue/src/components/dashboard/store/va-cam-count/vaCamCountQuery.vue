<template>
      <v-container>
        <base-material-card
        icon="mdi-magnify"
        title="VA 상품 및 카메라 대수 확인"
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
              label="사용자 ID"
              v-model="param.user_id"
              placeholder=" "
             
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              dense
              label="VA 명"
              v-model="param.va_name"
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