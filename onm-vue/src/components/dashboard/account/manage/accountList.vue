<template>
  <div>
        <table class="contents">
            <thead>
                <tr>
                    <th>사번</th><th>이름</th><th>IP</th><th>권한</th><th>생성일자</th><th>수정일자</th><th>생성자</th><th>수정/삭제</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(account,index) in accountList" :key="index">
                    <td>{{account.id}}</td>
                    <td>{{account.name}}</td>
                    <td>{{account.ip}}</td>
                    <td>{{account.auth}}</td>
                    <td>{{account.createDate}}</td>
                    <td>{{account.updateDate}}</td>
                    <td>{{account.editUser}}</td>
                    <td>
                        <button>수정</button>
                        <button>X</button>
                    </td>
                </tr>
            </tbody>
        </table>      
  </div>

  <!-- <div id="app">
  <v-app id="inspire">
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      ></v-data-table>
    </v-card>
  </v-app>
</div> -->

</template>


<script>
export default {
    props: ['accountList'],
    // data(){
    //     return{
    //         title: '계정 조회',
    //         accountList: [
    //             { id: '91240282', name: '홍길동', ip: '192.168.101.123', auth: '관리자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '김유신', ip: '192.168.101.123', auth: '일반사용자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '이순신', ip: '192.168.101.123', auth: '일반사용자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '강감찬', ip: '192.168.101.123', auth: '운영자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '이대호', ip: '192.168.101.123', auth: '운영자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '박병호', ip: '192.168.101.123', auth: '관리자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'},
    //             { id: '91240282', name: '류현진', ip: '192.168.101.123', auth: '관리자', createDate: '2020-11-19 21:26:09', updateDate: '2020-11-19 21:26:09', editUser: '82095555'}
    //         ]
    //     }
    // },

}
</script>

<style>

</style>