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
        title="매장정보 조회 LIST"
        class="px-5 py-3"
      >
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="contractId"
        class="elevation-1" @click:row="clicked"
      >
      </v-data-table>
    </base-material-card>

    <br>

<table class="type02" style="visibility:hidden;" id="tbTest">
  <tr>
    <th scope="row">계약ID</th>
    <td><input type="text" value=" " id="contactID"></td>
    <td></td>
    <th scope="row">매장ID</th>
    <td><input type="text" value=" " id="userID"></td>
  </tr>
  <tr>
    <th scope="row">매장명</th>
    <td><input type="text" value=" " id="userName"></td>
    <td></td>
    <th scope="row">로컬GW아이디</th>
    <td><input type="text" value=" " id="localGwId"></td>
  </tr>
  <tr>
     <th scope="row">전화번호</th>
    <td><input type="text" value=" " id="telNo"></td>
    <td></td>
    <th scope="row">상태코드</th>
    <td><input type="text" value=" " id="statusCode"></td>
  </tr>
    <tr>
     <th scope="row">상품코드</th>
    <td><input type="text" value=" " id="prodCode"></td>
    <td></td>
    <th scope="row">해상도</th>
    <td>내용이 들어갑니다.</td>
  </tr>
    <tr>
     <th scope="row">서브ID 개수</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">영상저장기간</th>
    <td>내용이 들어갑니다.</td>
  </tr>
    <tr>
     <th scope="row">iot_target_seq</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">iot_member_seq</th>
    <td>내용이 들어갑니다.</td>
  </tr>
    <tr>
     <th scope="row">주문번호</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">희망 처리 일시</th>
    <td>내용이 들어갑니다.</td>
  </tr>
    <tr>
     <th scope="row">등록일시</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">수정일시</th>
    <td>내용이 들어갑니다.</td>
  </tr>
    <tr>
     <th scope="row"> </th>
    <td> </td>
    <td></td>
    <th scope="row"> </th>
    <td> </td>
  </tr>
    <tr>
     <th scope="row">전체 카메라 대수</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">정상 카메라 대수</th>
    <td>내용이 들어갑니다.</td>
  </tr>
  <tr>
     <th scope="row">IP 카메라 대수</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row">POS 카메라 대수</th>
    <td>내용이 들어갑니다.</td>
  </tr>
  <tr>
     <th scope="row">IoT GW 대수</th>
    <td>내용이 들어갑니다.</td>
    <td></td>
    <th scope="row"> </th>
    <td> </td>
  </tr>
</table>

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="kttClick"
       style="visibility:hidden;"
       id="kttBtn"
   >
       사용자-KTT 정보
  </v-btn>
  <table class="type02" style="visibility:hidden;" id="tbTest2">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">서비스번호</th>
    <th scope="row">시스템ID</th>
    <th scope="row">단말설치여부</th>
    <th scope="row">상태코드</th>
    <th scope="row">등록일시</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>
</v-col>

  </v-container>  
</template>

<script>
export default {
    props: ['List'],
    //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
    data() {
    return {
      headers: [
        {
          text: "계약ID",
          align: "start",
          sortable: false,
          value: "said",
        },
        { text: "매장ID", value: "user_id" },
        { text: "매장명", value: "user_name" },
        { text: "매장 전화번호", value: "tel_no" },
        { text: "상태코드", value: "status_code" },
        { text: "로컬융합GW아이디", value: "local_gw_id" },
        { text: "상품코드", value: "prod_code" },
        { text: "등록일시", value: "reg_date" },
      ],
    };
  },

  methods: {
    clicked(value){
      document.getElementById('contactID').value=value.said;
      document.getElementById('userID').value=value.user_id;
      document.getElementById('userName').value=value.user_name;
      document.getElementById('localGwId').value=value.local_gw_id;
      document.getElementById('telNo').value=value.tel_no;
      document.getElementById('tbTest').style.visibility="visible";
      document.getElementById('kttBtn').style.visibility="visible";
    },
    kttClick(){
      document.getElementById('tbTest2').style.visibility="visible";
    }
  },
}
</script>
<style>
table.type02 {
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  line-height: 1.5;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin : 20px 10px;
}
table.type02 th {
  width: 150px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  background: #eee;
}
table.type02 td {
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>