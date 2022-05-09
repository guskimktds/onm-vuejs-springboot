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
        title="KTT 정보 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="kList"
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
  props: ['kList'],
  data() {
    return {
      headers: [
        {
          text: "거래고유번호",
          align: "start",
          sortable: false,
          value: "guid",
        },
        { text: "계약ID", value: "said" },
        { text: "서비스번호", value: "service_no" },
        { text: "시스템ID", value: "system_id" },
        { text: "KTT 계약 ID", value: "contract_id" }
      ],
    };
  },
    
}
</script>
<style>
</style>