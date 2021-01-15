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
            title="계정 정보 LIST"
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
        headers: [
          {
            text: '사번',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { 
            text: '이름', 
            value: 'name',
          },
          { text: '접속지', value: 'ip' },
          { text: '권한', value: 'auth' },
          { text: '생성일자', value: 'createDate' },
          { text: '수정일자', value: 'updateDate' },
          { text: '생성자', value: 'editUser' },
        ]
      }
    }
}
</script>

<style>

</style>