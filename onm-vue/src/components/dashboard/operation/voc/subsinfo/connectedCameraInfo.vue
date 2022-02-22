<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"  
            title="연결된 캠, 모델, 제조사 조회, 캠상태"
            class="px-2 py-1 customgrey"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                hide-default-header
                hide-default-footer
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-0"
            >   
              <template v-slot:header="{ props: { headers } }">
                <thead>
                  <tr>
                    <th v-for="h in headers" :class="h.class" v-bind:key="h">
                      <span>{{h.text}}</span>
                    </th>
                  </tr>
                </thead>
              </template>  

            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>

export default {
    props: ['pList','resPagingInfo'],
    data() {
      return {
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '매장 ID',
            sortable: false, value: 'user_id', class: 'my-header-style'
          },
          { text: '카메라 ID', value: 'cam_id', class: 'my-header-style'},
          { text: '카메라 IP', value: 'cam_ip', class: 'my-header-style'},
          { text: 'MAC ID', value: 'mac_id', class: 'my-header-style'},
          { text: '카메라명', value: 'cam_name', class: 'my-header-style'},
          { text: '모델명', value: 'model_name', class: 'my-header-style'},
          { text: '펌웨어', value: 'firmware', class: 'my-header-style'},
          { text: '제조사', value: 'vendor', class: 'my-header-style'},
          { text: '서비스 상태코드', value: 'status_code', class: 'my-header-style'},
          { text: '관리상태코드', value: 'mgt_status', class: 'my-header-style'},
          { text: '해상도', value: 'resolution', class: 'my-header-style'},
          { text: '수정일자', value: 'mod_date', class: 'my-header-style'},
          { text: '개통일시', value: 'open_date', class: 'my-header-style'},
          { text: '등록일시', value: 'reg_date', class: 'my-header-style'},
          { text: '해지일시', value: 'close_date', class: 'my-header-style'},
          { text: '영상저장방식', value: 'save_method', class: 'my-header-style'},
          { text: '캠그룹명', value: 'group', class: 'my-header-style'},
          { text: 'Onvif port', value: 'onvif', class: 'my-header-style'},
          { text: 'Ever Status', value: 'ever_status', class: 'my-header-style'},
          { text: '단말차단여부', value: 'block', class: 'my-header-style'},
          { text: 'Protocol Type', value: 'protocol_type', class: 'my-header-style'},
          { text: '관리자 강제변경', value: 'm_protocol_type', class: 'my-header-style'},
          { text: '진행상태코드', value: 'process_code', class: 'my-header-style'},

        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true     
        this.$emit("pagination", this.options)
      },

    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
        },
        deep: true,
      },
    },
    mounted () {
      this.getDataFromApi()
    }

}
</script>
<style scoped>

.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  background-color: #98C4C6;
}
    
</style>