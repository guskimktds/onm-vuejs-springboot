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
        title="상품 요약정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="psList"
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
  props: ['psList'],
  data() {
    return {
     headers: [
        {
          text: "사용자ID",
          align: "start",
          sortable: false,
          value: "user_id",
        },
        { text: "상품코드", value: "prodcd" },
        { text: "상품이름", value: "prodnm" },
        { text: "상품유형", value: "prodtype" },
        { text: "상품개수", value: "prodcnt" },
        { text: "등록일", value: "reg_date" },
        { text: "수정일", value: "mod_date" },
      ],
    };
  },
    
}
</script>
<style>
</style>