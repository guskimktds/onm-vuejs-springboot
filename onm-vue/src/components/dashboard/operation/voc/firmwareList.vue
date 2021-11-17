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
        title="단말 펌웨어 정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="fList"
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
  props: ['fList'],
  data() {
    return {
      headers: [
        {
          text: "단말구분",
          align: "start",
          sortable: false,
          value: "dev_type",
        },
        { text: "제품코드", value: "product_code" },
        { text: "펌웨어 버전", value: "firmware_version" },
        { text: "카메라명", value: "device_yn" }
      ],
    };
  },
}
</script>
<style>
</style>