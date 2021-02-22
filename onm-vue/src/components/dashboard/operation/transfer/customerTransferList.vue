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
      title="고객이전 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        >
          
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

// import EventBus from '../../../../EventBus';

export default {
    props: ['pList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '이전 일련번호',
            align: 'start',
            sortable: false,
            value: 'mig_seq',
          },
          { text: '매장ID', value: 'user_id' },
          { text: '진행상태코드', value: 'process_code' },
          { text: '상태코드', value: 'status_code' },
          { text: '국사ID', value: 'local_gw_id' },
          { text: '이전국사ID', value: 'pre_local_gw_id' },
          { text: '이전iot_member', value: 'per_iot_member_seq' },
          { text: '이전iot_target', value: 'per_iot_target_seq' },
          { text: '이전시작일시', value: 'mig_start_date' },
          { text: '이전종료일시', value: 'mig_end_date' },
          { text: 'Data삭제일시', value: 'data_clean_date' },
          { text: 'Iot이전상태코드', value: 'iot_status' },
          // { text: '사용여부', value: 'useYn' },
          // { text: '등록일시', value: 'createDate' },
          // { text: '변경', value: 'actions', sortable: false }
        ],
        // editedItem: {
        //   codeClass: '',
        //   code: '',
        //   name: '',
        //   type: '',
        //   useYn: '',
        //   orderby: '',
        //   desc: '',
        //   editor: '82095586',
        //   editDate: '2021-01-06 10:20:30'
        // },
        // defaultItem: {
        //   codeClass: '',
        //   code: '',
        //   name: '',
        //   type: '',
        //   useYn: '',
        //   orderby: '',
        //   desc: '',
        //   editor: '82095586',
        //   editDate: '2021-01-06 10:20:30'
        // },
      }
    }
    // computed: {
    //   formTitle () {
    //     return this.editedIndex === -1 ? '고객이전' : '수정'
    //   },
    // },
    // methods: {
      

    //   // deleteItem (item) {
    //   //   console.log('deleteItem method call : ',item)
    //   //   this.editedIndex = this.codeList.indexOf(item)
    //   //   this.editedItem = Object.assign({}, item)
    //   //   this.dialogDelete = true
    //   // },

    //   deleteItemConfirm () {
    //     this.codeList.splice(this.editedIndex, 1)
    //     this.closeDelete()
    //   },

    //   close () {
    //     this.dialog = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   closeDelete () {
    //     this.dialogDelete = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   save () {
    //     console.log('save method call : ',this.editedIndex)
        
    //       // create
    //       const createItem = this.editedItem
    //       console.log("2222222222222")
    //       EventBus.$emit('createItem', createItem)
    //       this.close()
    //   }

    // }

}
</script>

<style scoped>
</style>>
