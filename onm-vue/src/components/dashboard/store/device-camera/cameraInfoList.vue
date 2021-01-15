<template>
 <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="camId"
        class="elevation-1"
      >
        <!-- <template v-slot:expanded-item="{ headers }" :style="`background-color: red`">
          <td :colspan="headers.length">
            <List></List>
          </td>
        </template>       -->
      </v-data-table>
    </v-app>
  </div>
    <!-- <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>카메라 ID</th>
                    <th>카메라 IP</th>
                    <th>카메라명</th>
                    <th>mac_id</th>
                    <th>모델명</th>
                    <th>펌웨어 버전 정보</th>
                    <th>제조사</th>
                    <th>서비스 상태코드</th>
                    <th>관리상태코드</th>
                    <th>해상도</th>
                    <th>카메라 수정일자</th>
                    <th>개통일시</th>
                    <th>해지일시</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pList" :key="item.camId">
                    <td>{{item.camId}}</td>
                    <td>{{item.camIp}}</td>
                    <td>{{item.camName}}</td>
                    <td>{{item.macId}}</td>
                    <td>{{item.modelName}}</td>
                    <td>{{item.firmwareVer}}</td>
                    <td>{{item.manufacturer}}</td>
                    <td>{{item.serviceCode}}</td>
                    <td>{{item.manageCode}}</td>
                    <td>{{item.resolution}}</td>
                    <td>{{item.modifiedDate}}</td>
                    <td>{{item.openDate}}</td>
                    <td>{{item.closeDate}}</td>
                </tr>
            </tbody>
        </table>
    </div> -->
</template>
<script>
export default {
    props: ["List"],
  //{ code: 1, totalCnt: 1000, normalCnt: 103, waitCnt: 123, procCnt:43, failCnt:89, networkFailCnt:33},
  data() {
    return {
      headers: [
        {
          text: "카메라 ID",
          align: "start",
          sortable: false,
          value: "cam_id",
        },
        { text: "카메라 IP", value: "cam_ip" },
        { text: "카메라명", value: "cam_name" },
        { text: "mac_id", value: "macId" },
        { text: "모델명", value: "model_name" },
        { text: "펌웨어 버전 정보", value: "firmware" },
        { text: "제조사", value: "vendor" },
        { text: "서비스 상태코드", value: "status_code" },
        { text: "관리상태코드", value: "mgt_status" },
        { text: "해상도", value: "resolution" },
        { text: "카메라 수정일자", value: "mod_date" },
        { text: "개통일시", value: "opendate" },
        { text: "해지일시", value: "close_date" },
      ],
    };
  },
}
</script>
<style>
    
</style>