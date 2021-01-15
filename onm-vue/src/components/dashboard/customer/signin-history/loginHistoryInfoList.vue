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
            title="로그인 History"
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
          text: "로그인 키",
          align: "start",
          sortable: false,
          value: "login_key",
        },
        { text: "로그인 ID", value: "login_id" },
        { text: "로그인 타입", value: "login_type" },
        { text: "만료일시", value: "expire_date" },
        { text: "로그인일시", value: "login_date" },
        { text: "로그아웃일시", value: "logoutDate" },
        { text: "OS타입", value: "os_type" },
      ],
    };
  },
};
</script>
<style>
</style>