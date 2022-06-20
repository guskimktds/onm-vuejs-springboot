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
            title="권한 메뉴 LIST"
            class="px-5 py-3"
            >
    
           <v-treeview
            v-model="selection"
            selectable
            :items="items"
            return-object
            ></v-treeview>
              <v-btn
                color="blue darken-1"
                text
                @click="test">
                테스트
              </v-btn>
              <v-btn
                color="white"
                text
                @click="check([1,3])">
                테스트2
              </v-btn>
              <v-btn
                color="white"
                text
                @click="checkAll">
                테스트3
              </v-btn>
        </base-material-card>
    </v-container>
</template>


<script>
// import dateInfo from '../../../utils/common'
// import axios from "axios"
export default {
    data: () => ({
      selection:[{id: 'M100'},
      {id: 3}],
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 'M1', name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 'M100', name: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' },
                  ],
                },
              ],
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  methods: {
    test(){
      console.log(this.selection)
    },
    check(arr){
      console.log(arr)
      this.selection = arr
      this.selection.selected=true
      
    },
    checkAll(){
      this.selection = [1];
      console.log(this.selection);
    }
  },
}
</script>

<style>

</style>