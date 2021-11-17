<template>
  <v-container
      id="regular-tables"
      fluid
      tag="section"
    >

    <base-material-card
        color="orange"
        dark
        icon="mdi-keyboard"
        title="카메라 제품정보 LIST"
        class="px-5 py-3"
      >
      <!--//resPagingInfo.total_cnt -->
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="10" 
        class="elevation-1"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >
      </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>
export default {
    props: ["pList", "resPagingInfo"],
    data() {
        return {
            headers: [
                { text: '카메라 제품 ID', value: 'cam_prod_id' },
                { text: '카메라 제품명', value: 'cam_prod_name' },
                { text: '카메라 타입', value: 'cam_type' },
                { text: '출시일', value: 'opening_date' },
                { text: '등록일', value: 'reg_date' },
            ],
                last: 0,
                options: {},
                totalList: 0,
                loading: true,

            }
  },
  methods: {
    getDataFromApi(){
        this.$emit("pagination",this.options)
    },
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
}
</script>

<style>

</style>