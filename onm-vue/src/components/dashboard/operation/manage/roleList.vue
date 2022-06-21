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
            v-model="authList"
            selectable
            :items="menuList"
            return-object
            >
            </v-treeview>
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
   props: ['menuList', 'authList'],
    data: () => ({
      selection: [],
      updateList: []
    }),
  methods: {
    updateMenu(){
      console.log(this.authList)
      this.$emit("updateMenu",this.authList)
    }
  },
}
</script>

<style>

</style>