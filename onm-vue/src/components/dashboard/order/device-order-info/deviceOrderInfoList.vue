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
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-1"
                @click:row="handleClick"
            >
            <template v-slot:item.notice_yn="{item}">
              <span>{{ switchString(item.notice_yn) }}</span>
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
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        loading:true,
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '처리희망일자', value: 'appointdate' },
          { text: '오더분류번호', value: 'oderdivcd' },
          { text: '오더번호', value: 'oderno' },
          { text: '오더순번', value: 'oderseq' },
          { text: '계약ID', value: 'said'},
          { text: '오더유형', value: 'ordertype' },       
          { text: '등록일시', value: 'reg_date' },
          { text: '청약처리통보여부', value: 'notice_yn' },
        ]
      }
    },
   methods: {
    handleClick:function(value){
        this.$emit("child", value.guid);
      },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    switchString(values){
      if(values==='T'){
        return '청약취소'
      }else if(values==='Y'){
        return '통보완료'
      }else if(values==='N'){
        return '미통보'
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

  mounted() {
    this.getDataFromApi();
  },
    
}
</script>
<style>
</style>