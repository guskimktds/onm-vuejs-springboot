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
        title="VA설정 현황 LIST"
        class="px-5 py-3"
      >

      <v-data-table
          :headers="headers"
          :items="pList"
          item-key="id"
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
        headers: [
          { text: 'VA IP', value: 'ip' },
          { text: 'VA 상태', value: 'stat_kt' },
          { text: '최대용량', value: 'mx_va' },
          { text: '요청 카메라', value: 'no_va' },
          { text: '분석 카메라', value: 'proc_va' },
          { text: '중지 카메라', value: 'va_paused' },
          { text: '3rd VA 상태', value: 'stat_3rd' },
          { text: '3rd 최대용량', value: 'mx_3rd' },
          { text: '3rd 요청 카메라', value: 'no_3rd' },
          { text: '3rd 분석 카메라', value: 'proc_3rd' },
          { text: '요약영상 처리', value: 'va_summary' },
          { text: '가중치', value: 'load_va' },
          { text: '객체분석 VA 수', value: 'va_oc' },
        ]
      }
    },
}
</script>

<style>
    
</style>