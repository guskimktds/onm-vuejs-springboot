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
        title="상품통계 LIST"
        class="px-5 py-3"
      >

      <v-data-table
        :headers="pHeader"
        :items="pList"
        class="elevation-1"
      >
      </v-data-table>

    </base-material-card>
  </v-container>
</template>


<script>
export default {
  props: ['pHeader','pList'],
  data() {
    return {
      headers:[{
        text:'text', value: 'value'
      }]
    }
  }, 
  
}

</script>

<style>
    
</style>