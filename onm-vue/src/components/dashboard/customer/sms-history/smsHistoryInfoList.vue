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
            title="SMS 발송 이력 LIST"
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
  props: ["pList"],
  data() {
    return {
      headers: [
        {
          text: "시퀀스 ID",
          align: "start",
          sortable: false,
          value: "sms_history_id",
        },
        { text: "발송 전화번호", value: "tel_number" },
        { text: "OTP 번호", value: "otp" },
        { text: "발송 메세지 내용", value: "message" },
        { text: "발송 결과 코드", value: "res_code" },
        { text: "발송 요청 시간", value: "reg_date" },
        { text: "수정일", value: "mod_date" },
        { text: "SMS 발송서버명", value: "host_name" },
      ],
    };
  },
};
</script>
<style>
</style>