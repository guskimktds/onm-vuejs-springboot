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
            :items="rList"
            return-object
            >
            </v-treeview>
              <v-btn
                color="white"
                text
                @click="selected">
                권한메뉴확인
              </v-btn>
              <v-btn
                color="white"
                text
                @click="updateMenu">
                권한메뉴수정
              </v-btn>
        </base-material-card>
    </v-container>
</template>


<script>
// import dateInfo from '../../../utils/common'
// import axios from "axios"
export default {
  props: ['rList','sList'],
    data: () => ({
      selection:[],
      updateList:[]
    }),

  methods: {
    selected(){
      this.selection=this.sList
    },
    updateMenu(){
      console.log(this.selection)
      this.$emit("updateMenu",this.selection)
    }
  },
}
</script>

<style>

</style>