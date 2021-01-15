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
          { text: '오더번호', align: 'start',
            sortable: false, value: 'oderno' },
          { text: '단말ID', value: 'terminal_id' },
          { text: '계약ID', value: 'said'},
          { text: 'MAC ID', value: 'mac_id' },
          { text: '관리상태코드', value: 'oderno' },
          { text: '제품코드', value: 'oderno' },
          { text: '모델명', value: 'oderno' },
          
          { text: '단말인증결과코드', value: 'appointdate' },
          { text: '개통오더번호', value: 'oderdivcd' },
          { text: '인증일시', value: 'oderno' },
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