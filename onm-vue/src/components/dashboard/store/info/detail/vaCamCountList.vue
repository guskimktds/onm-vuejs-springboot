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
        title="VA 상품 및 카메라 대수 확인 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="vaList"
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
  props: ['vaList'],
  data() {
    return {
      headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "상품번호", value: "va_prod_id" },
        { text: "VA 명", value: "va_name" },
        { text: "VA 개수", value: "va_count" },
      ],
    };
  },
    
}
</script>
<style>
</style>