<template>
<v-container>

<v-text-field
    label="serch"
    v-model="search"
    >

</v-text-field>
    <!-- v-on:click=checkSearch  -->
  <v-data-table
      :items="item"
      :search="search"
      :headers="headers"
      >
  </v-data-table>
</v-container>
</template>

<script>
export default {
    data(){
        return{
            search:"",
            headers: [
                {text:'과일', value:"fruit"},
                {tet:'당도', value: 'sweet'},
                {text:'맛',value: 'flavor'}
            ],
            item: [
                {fruit:"사과", sweet:"3", flavor: "상큼함"},
                {fruit:"배", sweet:"2", flavor: "시원함"},
                {fruit:"딸기", sweet:"5", flavor: "달콤함"},
                 {fruit:"감", sweet:"3", flavor: "상큼함"},
                {fruit:"포도", sweet:"2", flavor: "시원함"},
                {fruit:"망고", sweet:"5", flavor: "달콤함"},
            ]
        }
    },
    methods: {
        checkSearch(){
  
  console.log(this.search)

        }
    }
}
</script>

<style>

</style>