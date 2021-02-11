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
            title="[매장]관리자 접속 이력 LIST"
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
            text: '관리자ID',
            align: 'start',
            sortable: false,
            value: 'admin_id',
          },
          { text: '매장ID', value: 'user_id' },
          { text: '전화번호', value: 'tel_no' },
          { text: '관리자 구분', value: 'admin_type' },
          { text: '로그인 키', value: 'login_key' },
          { text: '로그인', value: 'login_date' },
          { text: '로그아웃', value: 'logout_date' }
        ]
      }
    }
}
</script>

<style>
</style>>
