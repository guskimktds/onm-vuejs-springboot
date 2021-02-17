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
      title="사용자 청약 오더 정보 LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
      >          
      </v-data-table>
  </base-material-card>

  </v-container>
</template>

<script>

// import EventBus from '../../../../../EventBus';

export default {
    props: ['pList', 'resPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '계약ID', value: 'said'},
          { text: '상품코드', value: 'pprodcd'},
          { text: '기가아이즈 모상품명', value: 'pprodnm'},
          { text: '사업자명', value: 'bizpnm'},
          { text: '오더번호', value: 'oderno' },
          { text: '오더순번', value: 'oderseq' },
          { text: '처리희망일자', value: 'appointdate' },
          { text: '사용여부', value: 'use_yn' },
          { text: '생성일시', value: 'cdate' }
        ]
      }
    },

methods: {
    handleClick: function(value){
      this.$emit("child", value.guid);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
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

  mounted() {
    this.getDataFromApi();
  },
    
}
</script>
<style>
    
</style>