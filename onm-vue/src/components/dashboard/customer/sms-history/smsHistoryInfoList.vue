<template>
  <v-container id="regular-tables" fluid tag="section">
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
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
      >
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  props: ["pList", "resPagingInfo"],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      options: {},
      totalList: 0,
      loading: true,
      headers: [
        {
          text: "시퀀스 ID",
          align: "start",
          sortable: false,
          value: "sms_history_id",
        },
        { text: "발송 전화번호", value: "tel_number" },
        { text: "OTP 번호", value: "otp" },
        { text: "발송 메세지 내용", value: "msg" },
        { text: "발송 결과 코드", value: "res_code" },
        { text: "발송 요청 시간", value: "reg_date" },
        { text: "수정일", value: "mod_date" },
        { text: "SMS 발송서버명", value: "host_name" },
      ],
    };
  },
  methods: {
    handleClick: function (value) {
      console.log(value);
      this.$emit("child", value.sms_history_id);
    },

    getDataFromApi() {
      // console.log(this.resPagingInfo)
      this.loading = true;
      // this.fakeApiCall().then(data => {
      //   this.desserts = data.items
      // this.totalList = this.resPagingInfo.total_page_cnt
      //   this.loading = false
      // })

      const { page, itemsPerPage } = this.options;
      console.log(page, itemsPerPage);
      this.$emit("pagination", this.options);
    },
    fakeApiCall() {
      return new Promise((resolve) => {
        const { page, itemsPerPage } = this.options;

        // let items = this.getDesserts()
        let items = this.props.pList;
        console.log(items);
        const total = items.length;

        // if (sortBy.length === 1 && sortDesc.length === 1) {
        //   items = items.sort((a, b) => {
        //     const sortA = a[sortBy[0]]
        //     const sortB = b[sortBy[0]]

        //     if (sortDesc[0]) {
        //       if (sortA < sortB) return 1
        //       if (sortA > sortB) return -1
        //       return 0
        //     } else {
        //       if (sortA < sortB) return -1
        //       if (sortA > sortB) return 1
        //       return 0
        //     }
        //   })
        // }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          resolve({
            items,
            total,
          });
        }, 1000);
      });
    },
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
};
</script>
<style>
</style>