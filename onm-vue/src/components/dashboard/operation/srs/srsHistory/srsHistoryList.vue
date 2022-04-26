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
      title="SRS 히스토리 LIST"
      class="px-5 py-3"
    >
        <v-data-table
          :headers="headers"
          :items="srsList"
          :options.sync="options"
          :server-items-length="resPagingInfo.total_cnt"
          class="elevation-1"
          :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
          :header-props="{ sortIcon: null }"
        >
          <template v-slot:item.status_code="{item}">
              <span>{{ switchStatus(item.status_code) }}</span>
          </template>

          <template v-slot:item.use_yn="{item}">
              <span>{{ switchUseYn(item.use_yn) }}</span>
          </template>
        </v-data-table>

    </base-material-card>
  </v-container>
</template>

<script>

export default {
    props: ['srsList','resPagingInfo'],
    data() {
      return {
        last: 0,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        totalList: 0,
        loading: true,
        headers: [
          {
            text: '캠상태이력일련번호',
            align: 'left',
            sortable: false,
            value: 'cam_stat_hist_seq',
          },
          { text: '카메라ID', value: 'cam_id' },
          { text: '상태코드', value: 'status_code' },
          { text: '처리캠대수', value: 'cam_cnt' },
          { text: '처리상태', value: 'use_yn' },
          { text: '등록일시', value: 'reg_date' },
          { text: '수정일시', value: 'mod_date' }
        ],
  
      }
    },
    methods: {
      getDataFromApi(){
        this.loading=true;
        this.$emit("pagination", this.options);
      },
      switchStatus(values){
        if(values=='Z'){
          return '끊킴'
        }else if(values=='S'){
          return '정상'
        }else if(values=='F'){
          return '연결실패'
        }
      },
      switchUseYn(values){
        if(values=='Y'){
          return '처리완료'
        }else if(values=='N'){
          return '처리안함'
        }else if(values=='F'){
          return '처리실패'
        }
      }
    },
  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
}
</script>

<style scoped>
</style>>
