<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <!-- <v-card
  
      title="청약 오더 정보"
    
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-0"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >          
      </v-data-table>
  </v-card> -->

  <base-material-card  
      color="#71A2A4"
      title="청약 오더 정보"
      class="px-2 py-1 customgrey"
    >
      <!-- <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-0"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      >          
      </v-data-table> -->
     
      <v-data-table
        :headers="headers"
        :items="uoiList"
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

// import EventBus from '../../../../../EventBus';

export default {
    props: ['uoiList', 'resPagingInfo'],
    data() {
      return {
        pageoptions: this.$store.state.pageoptions,
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'left', class: 'my-header-style',
            sortable: false, value: 'guid',
          },
          { text: '계약ID', value: 'said' , align: 'left' , class: 'my-header-style'},
          { text: '상품코드', value: 'pprodcd' , align: 'left' , class: 'my-header-style'},
          { text: '기가아이즈 모상품명', value: 'pprodnm' , align: 'left', class: 'my-header-style'},
          { text: '사업자명', value: 'bizpnm' , align: 'left', class: 'my-header-style'},
          { text: '오더번호', value: 'oderno' , align: 'left', class: 'my-header-style'},
          { text: '오더순번', value: 'oderseq' , align: 'left', class: 'my-header-style'},
          { text: '처리희망일자', value: 'appointdate' , align: 'left', class: 'my-header-style'},
          { text: '처리여부', value: 'use_yn' , align: 'left', class: 'my-header-style'},
          { text: '등록일시', value: 'cdate' , align: 'left', class: 'my-header-style' },
          { text: 'OSS 통보', value: 'notice_yn' , align: 'left', class: 'my-header-style' },
          { text: 'KTT 고객', value: 'ktt_user_yn' , align: 'left', class: 'my-header-style' },
          { text: '변경유형모듬', value:'accumupdatetype', align: 'left', class: 'my-header-style'}
        ]
      }
    },

methods: {
    getDataFromApi() {
      this.loading = true;
      //this.$emit("pagination", this.options);
    },
    
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi();
      },
      deep: true,
    },
  },
    
}
</script>
<style scoped>

/* .v-data-table .v-data-table-header tr th {
  font-size: 24px !important;
} */

/* v-data-table table thead tr th {
  font-weight: 300;
  font-size: 24px !important;
} */


/* .v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    user-select: none;
    font-weight: bold;
    font-size: 1.75rem;
} */
 
.my-header-style {
  color: #000000 !important;
  font-size: 14px !important;
  font-weight: 600;
  /* background-color: #A8F6D9; */
  background-color: #98C4C6;
}
</style>