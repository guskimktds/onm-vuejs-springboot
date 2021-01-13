<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="List"
        :items-per-page="5"
        item-key="loginKey"
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