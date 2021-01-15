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
            title="사용자 청약 오더 상세 LIST"
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
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        /*
appointdate: "20171218"
arnoadrbassbst: "서울시 종로구 내수동"
arnoadrdtlsbst: "용비어천가"
bizpnm: "목동매장"
cdate: "20171218201651"
custid: "C394134"
custnm: "홍길동"
guid: "GPNA_201712182003000_TEST0011"
ktt_user_yn: "N"
notice_yn: "Y"
oderno: "20171218200200"
oderseq: "2"
ordertype: "4201"
pprodcd: "B001"
pprodnm: "GiGAeyes smart"
psaid: "099Q1030901"
regdate: 1513595812040
resultcode: "200"
resultmsg: "SUCCESS"
said: "TEST18201802"
salesmanid: "24134414"
salesmannm: "이순신"
srcsystem: "LBNR"
svcofccd: "R02471"
svcofcnm: "가경국사"
telno: "01012341111"
tgtsystem: "GPNA"
updatetype: "5512"
user_id: "0000028234"
        */
        headers: [
          {
            text: '거래고유번호', align: 'start',
            sortable: false, value: 'guid',
          },
          { text: '상품코드', value: 'pprodcd' },
          { text: '상품명', value: 'pprodnm' },
          { text: '오터유형', value: 'ordertype' },
          { text: '오더번호', value: 'oderno'},
          { text: '오더순번', value: 'oderseq'},
          { text: '변경유형코드', value: 'updatetype'},


          { text: '등록일시', value: 'cdate'},
          { text: '오더유형', value: 'bizpnm'},
          { text: '사업자명', value: 'oderno' },
          { text: '상품코드', value: 'oderseq' },
          { text: '파라미터타입코드', value: 'appointdate' },
          { text: '파라미터타입명칭', value: 'use_yn' },
          { text: '파라미터값', value: 'cdate' }
        ]
      }
    }

}
</script>
<style>
    
</style>