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
      title="로컬 국사 정보 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="pList"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
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
            text: '국사코드',
            align: 'start',
            sortable: false,
            value: 'local_gw_id',
          },
          { text: '서버명', value: 'server_name' },
          { text: '서버URL', value: 'server_url' },
          { text: '웹소켓URL', value: 'ws_url' },
          { text: '국사판단 패턴', value: 'pattern' },
          { text: 'EC서버 URL', value: 'ec_url' },
          { text: 'LDMS URL', value: 'ldms_url' },
          { text: 'STM 최대 수용 카메라 수', value: 'max_cam_cnt' },
          { text: 'VA서버 최대 분석 채널 수', value: 'max_va_cnt' },
          { text: 'INT 배포버전 코드', value: 'version_code' },
          { text: 'MQ URL', value: 'mq_url' },
          { text: '변경', value: 'actions', sortable: false }
        ],
        
      }
    },


}
</script>

<style scoped>
</style>>
