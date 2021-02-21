<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="blue"
            dark
            icon="mdi-keyboard"
            title="마이페이지"
            class="px-5 py-3"
            >

          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="userInfo.onm_user_id"
            

                label="사번"

              ></v-text-field>
            </v-col>
          <!-- </v-row>
          <v-row> -->
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="userInfo.auth_group_name"

                label="권한그룹명"

              ></v-text-field>
            </v-col>
          <!-- </v-row>
          <v-row> -->
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="userInfo.accept_ip"
            

                label="접속허용 IP"

              ></v-text-field>
            </v-col>
          <!-- </v-row>  
          <v-row> -->
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="userInfo.reg_date"
            

                label="등록일시"

              ></v-text-field>
            </v-col>
          <!-- </v-row> 
          <v-row> -->
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="userInfo.mod_date"
            

                label="수정일시"

              ></v-text-field>
            </v-col>
          <!-- </v-row> 
          <v-row> -->
            <v-col
              cols="12"
              md="3"
            >
              <v-text-field
                v-model="userInfo.reg_user"
            

                label="등록자"

              ></v-text-field>
            </v-col>
          </v-row>                  
      </base-material-card>

      <v-card>
        <v-form justify="center">
          <v-container class="py-0">
            <v-row><v-col></v-col></v-row>
            <v-row>
              <v-col id="information">
                <p>
                  <b>안내</b><br>
                  비밀번호를 변경을 원하실 경우 운영자에게 연락하시길 바랍니다.
                </p>
                <p>연락처 : 000-000-0000 / 이메일 : 0000000000@ktfriend.com</p>
                <img src="@/img/exclamationMark.png" id="warn-icon"/>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>


    </v-container>
</template>

<script>

import axios from "axios"

export default {
  data(){
    return {
      title: '계정 조회',
      userInfo: []
    }
  },
  created: function() {
  var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15001/get_account`

    // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
  var params = {
    page_no: 1,
    view_cnt: 5,
    onm_user_id: this.$store.state.onmUserId
  }

  axios
    .post(url, params, this.$store.state.headers)
    .then((response) => {
      console.log(response)
      var resCode = response.data.res_code;
      var resMsg = response.data.res_msg;
      if(resCode == 200){
        this.userInfo = response.data.data.list[0];
      }else{
        this.userInfo = [];
        alert(resCode + " / " + resMsg);
      }
    })
    .catch((ex) => {
      console.log('조회 실패',ex)
    })
  },
}
</script>

<style scoped>

#warn-icon {
  width: 50px;
  height: 50px;
  transform: rotate(180deg); 
  transform-origin: left top;
  position: relative; top:-50px; left:-20px;
}
</style>