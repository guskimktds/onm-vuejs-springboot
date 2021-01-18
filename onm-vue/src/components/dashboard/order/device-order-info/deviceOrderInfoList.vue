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
            title="단말 오더 정보 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                class="elevation-1"
            >          
            </v-data-table>
        </base-material-card>
    </v-container>
</template>
<script>
export default {
    props: ['pList'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '처리희망일자', value: 'appointdate' },
          { text: '오더분류번호', value: 'oderdivcd' },
          { text: '오더번호', value: 'oderno' },
          { text: '오더순번', value: 'oderseq' },
          { text: '계약ID', value: 'said'},
          { text: '오더유형', value: 'type' },       
          { text: '등록일시', value: 'cdate' },
          { text: '청약처리통보여부', value: 'notice_yn' },
        ]
      }
    },
    created() {
        console.log(this.props)
    }
}
</script>
<style>
    
</style>