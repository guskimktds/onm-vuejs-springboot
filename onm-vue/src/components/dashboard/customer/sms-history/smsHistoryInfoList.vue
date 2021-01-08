<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="seqID"
        class="elevation-1"
        :style="`background-color: #d6f5e5`"
      >
        <!-- <template v-slot:expanded-item="{ headers }" :style="`background-color: red`">
          <td :colspan="headers.length">
            <List></List>
          </td>
        </template>       -->
      </v-data-table>
    </v-app>
  </div>
 
</template>
<script>
export default {
  props: ["List"],
  data() {
    return {
      headers: [
        {
          text: "시퀀스 ID",
          align: "start",
          sortable: false,
          value: "seqID",
        },
        { text: "발송 전화번호", value: "phoneNum" },
        { text: "OTP 번호", value: "otpNum" },
        { text: "발송 메세지 내용", value: "message" },
        { text: "발송 결과 코드", value: "sendCode" },
        { text: "발송 요청 시간", value: "sendTime" },
        { text: "수정일", value: "modifiedDate" },
        { text: "SMS 발송서버명", value: "sendServerInfo" },
      ],
    };
  },
};
</script>
<style>
</style>