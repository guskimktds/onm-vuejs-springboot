<template >

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" style="width:720px">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div class="register-form">
                    <form>
                        <v-row>
                          <v-col>WOWZA 서버 index : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.wowzaIndex"></v-col>
                          <v-col>RTSP 포트 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.portRtsp"></v-col>
                        </v-row>
                        <v-row>
                          <v-col>프로토콜 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.protocol"></v-col>
                          <v-col>RTMP 포트 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.portRtmp"></v-col>
                        </v-row>
                        <v-row>
                          <v-col>사설 IP : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.privateIp"></v-col>
                          <v-col>RTMPS 포트 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.portRtmps"></v-col>
                        </v-row>
                        <v-row>
                          <v-col>공인 IP : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.publicIp"></v-col>
                          <v-col>WOWZA URL : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.wowzaStreamerDaemon"></v-col>
                        </v-row>
                        <v-row>
                          <v-col>스트림 주소 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.streamLock"></v-col>
                          <v-col>WOWZA 상태 : </v-col>
                          <v-col><v-select item-text="k" item-value="v" :items="yesorno" outlined v-model="req.wowzaStatus">></v-select></v-col>
                        </v-row>
                        <v-row>
                          <v-col>포트 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.port"></v-col>
                          <v-col>GLS 여부 : </v-col>
                          <v-col><v-select item-text="k" item-value="v" :items="yesorno" outlined v-model="req.isGls">></v-select></v-col>
                        </v-row>
                        <v-row>
                          <v-col>계정 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.adminId"></v-col>
                          <v-col>GLS RTC 포트 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.glsPortRtc"></v-col>
                        </v-row>
                        <v-row>
                          <v-col>패스워드 : </v-col>
                          <v-col><input type="text" class="form-control form-control-lg" v-model="req.adminPwd"></v-col>
                          <v-col></v-col>
                          <v-col></v-col>
                        </v-row>
                        
                        <v-row>
                          <v-col>
                            <button type="submit" class="btn btn-primary btn-lg btn-block" v-on:click="onSubmit(id, ip, selected)">완료</button>
                          </v-col>
                          <v-col>
                            <button type="submit" class="btn btn-dark btn-lg btn-block" v-on:click="$emit('close')">취소</button>
                          </v-col>
                        </v-row>
                    </form>  
                </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
            <p>Copyright : 2020 kt GiGAeyes Cloud ONM</p>
              <button class="modal-default-button" @click="$emit('close')">
                x
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
const resourceHost = "http://localhost:3000"

export default {
    data() {
        return {
            yesorno: [
              {k: 'Y', v: 'Y'},
              {k: 'N', v: 'N'}
            ],

            // parameters
            req: {
              wowzaIndex: '',
              protocol: '',
              privateIp: '',
              publicIp: '',
              streamLock: '',
              port: '',
              adminId: '',
              adminPwd: '',
              portRtsp: '',
              portRtmp: '',
              portRtmps: '',
              wowzaStreamerDaemon: '',
              wowzaStatus: 'N',
              isGls: 'N',
              glsPortRtc: ''
            }
        }   
    },
    methods:{
      onSubmit(req) {     
        alert(req);
        return axios.post(`${resourceHost}/signup`, req)
        // //.then(res => {alert(res)})
        // .then(() => {
        //   // alert('push sign up')
        //   // this.$router.push({name:'AccountView'})
        // })
        .then(this.$router.replace('/platform/streamer'))
        // //.then(() => this.redirect())
        .catch(({ data }) => (this.msg = data))
        // this.$store
        //   .dispatch("LOGIN", { id, password })
        //   //.then( res => { console.log(res.status)})
        //   .then(this.$router.replace('/platform'))
        //   .catch(({ message }) => (this.msg = message))
        //   //alert('push sign up')
        //   //this.$router.push({name:'AccountView'})
      }
    }

}
</script>

<style lang="scss">

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 750px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-footer {
    // margin: 0 20px;
    font-size: 12px;
    text-align: left;
}

v-col {
  text-align: right;
}

</style>