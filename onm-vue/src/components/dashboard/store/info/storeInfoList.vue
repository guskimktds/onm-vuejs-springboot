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

<table class="type02" style="display:none;" id="tbTest">
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
       style="display:none;"
       id="kttBtn"
   >
       사용자-KTT 정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest2">
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

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="telClick"
       style="display:none;"
       id="telBtn"
   >
      사용자 전화번호
  </v-btn>
</v-col>
  
  <table class="type02" style="display:none;" id="tbTest3">
    <tr>
    <th scope="row">매장ID</th>
    <th scope="row">사용자이름</th>
    <th scope="row">전화번호</th>
    <th scope="row">권한</th>
    <th scope="row">전화번호ID</th>
    <th scope="row">알림설정권한</th>
    <th scope="row">상태코드</th>
    <th scope="row">mgt상태코드</th>
    <th scope="row">승인여부</th>
    <th scope="row">승일인날짜</th>
    <th scope="row">등록일시</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>
  
<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="prodClick"
       style="display:none;"
       id="prodBtn"
   >
      상품 요약 정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest4">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">상품코드</th>
    <th scope="row">상품이름</th>
    <th scope="row">상품유형</th>
    <th scope="row">갯수</th>
    <th scope="row">등록일시</th>
    <th scope="row">수정일시</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="vaClick"
       style="display:none;"
       id="vaBtn"
   >
      사용자 VA 상품정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest5">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">상품번호</th>
    <th scope="row">VA명</th>
    <th scope="row">갯수</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="sensorAppClick"
       style="display:none;"
       id="sensorAppBtn"
   >
      센서 신청 현황
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest6">
  <tr>
    <th scope="row">센서제품ID</th>
    <th scope="row">제품명</th>
    <th scope="row">갯수</th>
    <th scope="row">상태코드</th>
    <th scope="row">센서태그코드</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="cameraClick"
       style="display:none;"
       id="cameraBtn"
   >
      카메라 정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest7">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">카메라ID</th>
    <th scope="row">카메라IP</th>
    <th scope="row">MAC ID</th>
    <th scope="row">카메라명</th>
    <th scope="row">펌웨어</th>
    <th scope="row">상태코드</th>
    <th scope="row">개통일시</th>
    <th scope="row">등록일시</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

<v-col cols="auto">
   <v-btn color="primary"
       v-on:click="iotClick"
       style="display:none;"
       id="iotBtn"
   >
      IoT GW 정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest8">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">GWID</th>
    <th scope="row">GWID(시스템)</th>
    <th scope="row">GW명</th>
    <th scope="row">GW 모델코드</th>
    <th scope="row">mac_id</th>
    <th scope="row">상태코드</th>
    <th scope="row">등록일</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

  <v-col cols="auto">
   <v-btn color="primary"
       v-on:click="sensorClick"
       style="display:none;"
       id="sensorBtn"
   >
     센서 정보
  </v-btn>
</v-col>

  <table class="type02" style="display:none;" id="tbTest9">
  <tr>
    <th scope="row">매장ID</th>
    <th scope="row">센서ID</th>
    <th scope="row">단말 GW ID</th>
    <th scope="row">센서명</th>
    <th scope="row">센서태그코드</th>
    <th scope="row">mac_id</th>
    <th scope="row">상태코드</th>
    <th scope="row">등록일</th>
  </tr>
  <tr>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    <td> </td>
  </tr>
  </table>

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

      document.getElementById('tbTest').style.display="";

      document.getElementById('kttBtn').style.display="";
      document.getElementById('telBtn').style.display="";
      document.getElementById('prodBtn').style.display="";
      document.getElementById('vaBtn').style.display="";
      document.getElementById('sensorAppBtn').style.display="";
      document.getElementById('cameraBtn').style.display="";
      document.getElementById('iotBtn').style.display="";
      document.getElementById('sensorBtn').style.display="";
    },
    kttClick(){
      document.getElementById('tbTest2').style.display="";
    },
    telClick(){
      document.getElementById('tbTest3').style.display="";
    },
    prodClick(){
      document.getElementById('tbTest4').style.display="";
    },
    vaClick(){
      document.getElementById('tbTest5').style.display="";
    },
    sensorAppClick(){
      document.getElementById('tbTest6').style.display="";
    },
    cameraClick(){
       document.getElementById('tbTest7').style.display="";
    },
    iotClick(){
       document.getElementById('tbTest8').style.display="";
    },
    sensorClick(){
       document.getElementById('tbTest9').style.display="";
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