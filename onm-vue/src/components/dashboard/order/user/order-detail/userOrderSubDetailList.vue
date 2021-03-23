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
            title="사용자 청약 오더 상세 List"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="sdList"
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
    props: ['sdList'],
    data() {
      return {
        editedIndex: -1,
        headers: [
          {
            text: '상품코드', align: 'start',
            sortable: false, value: 'prodcd',
          },
          { text: '파라미터타입코드', value: 'paramtypecd' },   
          { text: '파라미터타입명칭', value: 'paramtypenm' },
          { text: '값', value: 'paramvalue' }
        ]
      }
    },
}
</script>
<style>
    
</style>