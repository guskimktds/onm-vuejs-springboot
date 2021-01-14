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
          { text: '오더유형', value: 'type' },   
          { text: '오더번호', value: 'oderno' },
          { text: '청약처리결과코드', value: 'resultcode' },
          { text: '청약처리결과메시지', value: 'resultmsg' },
          { text: '청약상태 통보여부', value: 'notice_yn' },
          { text: '오더처리 통보일시', value: 'notice_date' },
          { text: '청약결과 통보결과', value: 'notice_result' }
          
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