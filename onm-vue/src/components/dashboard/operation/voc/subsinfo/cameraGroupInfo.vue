<template>
   <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="customheader"
            title="카메라 그룹 정보(12월 개발 예정)"
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
            text: '카메라 그룹 아이디',
            sortable: false, value: 'cam_group_id', class: 'my-header-style'
          },
          { text: '사용자ID', value: 'user_id', class: 'my-header-style'},
          { text: '카메라그룹이름', value: 'cam_group_name', class: 'my-header-style'},
          { text: '기본그룹여부', value: 'default_yn', class: 'my-header-style'},
          { text: '정렬순서', value: 'orderby_no', class: 'my-header-style'},
          { text: '서비스상태코드', value: 'status_code', class: 'my-header-style'},
          { text: '등록일시', value: 'reg_date', class: 'my-header-style'},
          { text: '수정일시', value: 'mod_date', class: 'my-header-style'}
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
    updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
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