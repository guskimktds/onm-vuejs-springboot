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
      title="카메라 Tampering LIST"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="pList"
        :options.sync="options"
        :server-items-length="resPagingInfo.total_cnt"
        class="elevation-1"
        @click:row="handleClick"
        :footer-props="{itemsPerPageOptions:[5,10,15,20]}"
        :header-props="{ sortIcon: null }"
      > 
       <template v-slot:top>
            
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >

                <v-card>
                  <v-card-title>
                    <span class="headline">Tampering_Off 설정</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.cam_id"
                            label="카메라 ID"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                        
                          <v-text-field
                            v-model="editedItem.user_id"
                            label="사용자 ID"
                            readonly
                          ></v-text-field>
                        </v-col>


                         <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.subscribe_start_idx"
                            label="start_idx"
                          ></v-text-field>
                        </v-col>
                         <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <v-text-field
                            v-model="editedItem.subscribe_end_idx"
                            label="end_idx"
                          ></v-text-field>
                         </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      저장
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      취소
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            
          </template>

       <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
           mdi-send
            </v-icon>
       </template>                
      </v-data-table>
  </base-material-card>

  </v-container>
</template>

<script>
import axios from "axios"
export default {
    props: ['pList', 'resPagingInfo'],
    data() {
      return {
        last:0,
        dialog: false,
        editedIndex: -1,
        options: {},
        loading: true,
        headers: [
          {
            text: '카메라 ID',
            sortable: false, value: 'cam_id',
          },
          { text: '사용자 ID', value: 'user_id' },
          { text: '카메라 그룹 아이디', value: 'cam_group_id' },
          { text: '카메라 이름', value: 'cam_name' },
          { text: '등록일자', value: 'reg_date' },
          { text: '템퍼링 알람여부', value: 'tamper_yn' },
          { text: '설정', value: 'actions', sortable: false}
        ],
        editedItem: {
          cam_id : '',
          user_id : '',
          subscribe_start_idx: '',
          subscribe_end_idx: ''
        },
      }
    },

methods: {
    handleClick: function(value){
      this.$emit("child", value);
    },
    getDataFromApi() {
      this.loading = true;
      this.$emit("pagination", this.options);
    },
    editItem (item) { 
        this.editedIndex = this.pList.indexOf(item)
        console.log('update Item Index : ',this.editedIndex)
        // this.editedItem = Object.assign({}, item)
        this.editedItem.cam_id = this.pList[this.editedIndex].cam_id;
        this.editedItem.user_id = this.pList[this.editedIndex].user_id;
        // 수정
  
        console.log('update Item value : ',this.editedItem)

        this.dialog = true
      },
          save () {
        if (this.editedIndex > -1) {
          var params = this.editedItem;
                          var url =`${process.env.VUE_APP_BACKEND_SERVER_URL}/${process.env.VUE_APP_API_VERSION}/ONM_15142/set_cam_tamper`

                          axios.post(url, params, this.$store.state.headers)
                            .then((response) => {
                              console.log(response)
                              var resCode = response.data.res_code;
                               
                              if(resCode == 200){
                                //현재 목록에서 선택한 item 을 변경해준다.
                                this.$emit('reset')
                              }else{
                                alert("Error");
                              }
                            })
                            .catch((ex) => {
                              console.log('변경 실패',ex)
                            })
                      }else{
                        alert('서버와 통신이 안되었거나 비밀번호가 맞지 않습니다.');
                      }
        this.close()
        } ,
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
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
  updated() {
      if(this.last!==this.resPagingInfo.total_cnt){
        this.options.page=1
      }
      if(this.resPagingInfo.total_cnt!==undefined){
      this.last=this.resPagingInfo.total_cnt
      }
  },
    
}
</script>
<style>
    
</style>