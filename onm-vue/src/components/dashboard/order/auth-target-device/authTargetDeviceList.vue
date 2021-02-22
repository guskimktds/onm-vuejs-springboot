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
            title="인증 대상 단말 정보 LIST"
            class="px-5 py-3"
            >
            <v-data-table
                :headers="headers"
                :items="pList"
                :options.sync="options"
                :server-items-length="resPagingInfo.total_cnt"
                class="elevation-1"
                :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
            >          
            <template v-slot:item.mgt_status="{item}">
              <span>{{ switchString(item.mgt_status) }}</span>
            </template>
            </v-data-table>
        </base-material-card>
    </v-container>
</template>

<script>
export default {
    props: ['pList', 'resPagingInfo'],
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        options:{},
        loading: true,
        headers: [
          { text: '오더번호', align: 'start',
            sortable: false, value: 'oderno' },
          { text: '단말ID', value: 'terminal_id' },
          { text: '계약ID', value: 'said'},
          { text: 'MAC ID', value: 'mac_id' },
          { text: '관리상태코드', value: 'mgt_status' },
          { text: '제품코드', value: 'productcode' },
          { text: '모델명', value: 'modelname' },          
          { text: '단말인증결과코드', value: 'termauthcode' },
          { text: '개통오더번호', value: 'open_oderno' },
          { text: '인증일시', value: 'auth_date' },
          { text: '삭제일시', value: 'close_date' },
          { text: '등록일시', value: 'reg_date'} 
        ]
      }
    },
    methods: {
      getDataFromApi () {
        this.loading = true
        this.$emit("pagination", this.options)
      },
      switchString(values){
      if(values==='S'){
        return '양호(D)'
      }else if(values==='D'){
        return '수리중(D)'
          }
        }
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
<style>
</style>