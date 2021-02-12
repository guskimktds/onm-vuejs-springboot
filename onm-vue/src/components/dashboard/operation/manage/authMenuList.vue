<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="orange"
            dense
            dark
            icon="mdi-keyboard"
            title="권한 메뉴 LIST"
            class="px-5 py-3"
            >
            <!-- <v-data-table
                :headers="headers"
                :items="authMenuList"
                class="elevation-1"
            > </v-data-table> -->
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      권한그룹ID
                    </th>
                    <th class="text-left">
                      권한그룹명
                    </th>
                    <th class="text-left">
                      메뉴ID
                    </th>
                    <th class="text-left">
                      메뉴명
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="authGroup in authGroupList"
                    :key="authGroup.auth_group_id"
                  >
                    <td>{{ authGroup.auth_group_id }}</td>
                    <td>{{ authGroup.auth_group_name }}</td>
                    <td colspan="2">

                      <v-simple-table>
                      <template v-slot:default>
                        <!-- <thead>
                          <tr>
                            <th class="text-left">
                              권한그룹ID
                            </th>
                            <th class="text-left">
                              권한그룹명
                            </th>
                            <th class="text-left">
                              메뉴ID
                            </th>
                            <th class="text-left">
                              메뉴명
                            </th>
                          </tr>
                        </thead> -->
                        <tbody>
                          <tr
                            v-for="auth in authGroup.auth_group_list"
                            :key="auth.menu_id"
                          >
                            <td>{{ auth.menu_id }}</td>
                            <td>{{ auth.menu_name }}</td>

                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    </td>
                    

                  </tr>
                </tbody>
              </template>
            </v-simple-table>
        </base-material-card>
    </v-container>
</template>


<script>
// import dateInfo from '../../../utils/common'
// import axios from "axios"
export default {
    props: ['authGroupList'],
    // data() {
    //   return {
    //     dialog: false,
    //     dialogDelete: false,
    //     editedIndex: -1,
    //     headers: [
    //       {
    //         text: '권한그룹ID',
    //         align: 'start',
    //         sortable: false,
    //         value: 'auth_group_id',
    //       },
    //       { 
    //         text: '권한그룹명', 
    //         value: 'auth_group_name',
    //       },
    //       { text: '접속IP', value: 'access_ip' },
    //       { text: '권한그룹ID', value: 'auth_group_id' },
    //       { text: '권한그룹명', value: 'auth_group_name' },
    //       { text: '생성일', value: 'reg_date' },
    //       { text: '수정일', value: 'mod_date' },
    //       { text: '생성자', value: 'rgistrant' },
    //       { text: '수정자', value: 'modifier' },
    //     ],
        
    //   }
    // },

    // computed: {
    //   formTitle () {
    //     return this.editedIndex === -1 ? '등록' : '계정수정'
    //   },
    // },
    // methods: {
    //   editItem (item) {
    //     this.editedIndex = this.pList.indexOf(item)
    //     console.log('update Item Index : ',this.editedIndex)
    //     this.editedItem = Object.assign({}, item)
    //     // 수정
    //     this.editedItem.cmd_type = 'U' 
    //     this.editedItem.mod_date = dateInfo().current
    //     this.editedItem.modifier = this.$store.state.onm_user_id
    //     // this.editedItem.reg_date = getDate     

    //     console.log('update Item value : ',this.editedItem)

    //     this.dialog = true
    //   },

    //   deleteItem (item) {
    //     // console.log('deleteItem method call : ',item)
    //     this.editedIndex = this.pList.indexOf(item)
    //     console.log('Delte Item Index : ',this.editedIndex)
    //     this.editedItem = Object.assign({}, item)
    //     // 삭제
    //     this.editedItem.cmd_type = 'D'
    //     this.editedItem.mod_date = dateInfo().current
    //     this.editedItem.modifier = this.$store.state.onm_user_id

    //     this.dialogDelete = true
    //   },

    //   deleteItemConfirm () {

    //     if (this.editedIndex > -1) {

    //       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

    //       // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    //       var params = this.editedItem
    //       var deleteIndex = this.editedIndex
    //       console.log(params)

    //       axios.post(url, params, this.$store.state.headers)
    //         .then((response) => {
    //           console.log(response)
    //           var resCode = response.data.res_code;
    //           var resMsg = response.data.res_msg;
    //           if(resCode == 200){
    //             //현재 목록에서 선택한 Item을 삭제한다.
    //             this.pList.splice(deleteIndex, 1)
    //           }else{
    //             alert(resCode + " / " + resMsg);
    //           }
    //         })
    //         .catch((ex) => {
    //           console.log('변경 실패',ex)
    //         })
        
    //     }
    //     this.closeDelete() //다이얼로그를 닫는다.
    //   },

    //   close () {
    //     this.dialog = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   closeDelete () {
    //     this.dialogDelete = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   save () {
    //     console.log('save method call : ',this.editedIndex)
    //     if (this.editedIndex > -1) {
    //       var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15002/set_account`

    //       // 초기 렌더링 시 요청 파라미터 : page_no, view_cnt
    //       var params = this.editedItem
    //       var updateIndex = this.editedIndex
    //       console.log(updateIndex)
    //       console.log(params)

    //       axios.post(url, params, this.$store.state.headers)
    //         .then((response) => {
    //           console.log(response)
    //           var resCode = response.data.res_code;
    //           var resMsg = response.data.res_msg;
    //           if(resCode == 200){
    //             //현재 목록에서 선택한 item 을 변경해준다.
    //             this.pList.splice(updateIndex, 1, params)
    //           }else{
    //             alert(resCode + " / " + resMsg);
    //           }
    //         })
    //         .catch((ex) => {
    //           console.log('변경 실패',ex)
    //         })
    //     } 
    //     this.close()
    //   }

    // }
}
</script>

<style>

</style>