<template>

    <!-- <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div class="register-form">
                    <form>
  
                        <div class="form-group">
                               
                                <input type="text" class="form-control form-control-lg" 
                                v-model="id" placeholder="사번을 입력하세요">
                        </div>
                        <div class="form-group">
                              
                                <input type="text" class="form-control form-control-lg"
                                v-model="ip" placeholder="접속할 IP를 입력하세요"> 
                        </div>
                        <div class="form-group">

                                <span>권한 : </span>
                                <select v-model="selected">
                                <option v-for="option in options" v-bind:value="option.auth" :key="option.auth">
                                    {{ option.name }}
                                </option>
                                </select>
                                
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg btn-block" 
                        v-on:click="onSubmit(id, ip, selected)">등록</button>
                        
                        <button type="submit" class="btn btn-dark btn-lg btn-block" 
                        v-on:click="$emit('close')">닫기</button>
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
    </div> -->
<v-row justify="center">
  <v-dialog
            max-width="500px"
        >
            <v-card>
            <v-card-title>
                <span class="headline" >계정등록</span>
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
                        v-model="id"
                        label="사번"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                    <v-text-field
                        v-model="ip"
                        label="IP"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                    <v-text-field
                        v-model="auth"
                        label="권한"
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
                @click="$emit('close')"
                >
                취소
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios"
const resourceHost = "http://localhost:3000"

export default {
    data() {
        return {
            selected: 'gigaeyes-user',
            options: [
                { name: '일반사용자', auth: 'gigaeyes-user' },
                { name: '외부사용자', auth: 'guest' },
                { name: '운영자', auth: 'gigaeyes-engineer' },
                { name: '관리자', auth: 'gigaeyes-admin' }
            ],
            id: '',
            ip: '',
            auth: ''

        }   
    },
    methods:{
      save(id, ip, auth) {     
        console.log("onSubmit : "+id+ ", ip : "+ip+", auth : "+ auth);
        //this.$router.push({name:'AccountView'})
        return axios.post(`${resourceHost}/signup`, { id, ip, auth })
        // //.then(res => {alert(res)})
        // .then(() => {
        //   // alert('push sign up')
        //   // this.$router.push({name:'AccountView'})
        // })
        .then(this.$router.replace('/operation/account'))
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
// $module: 'sign-up-modal';
// .#{$module} {
//   // This is modal bg
//   background-color: rgba(0,0,0,.7);
//   top: 0; right: 0; bottom: 0; left: 0;
//   position: fixed;
//   overflow: auto;
//   margin: 0;
//   //This is modal layer
//   &__dialog{
//     left: 30%;
//     top: 175px;
//     height: 400px;
//     width: 400px;
//     position: absolute;
//     background: #fff;
//     margin-bottom: 50px;
//   }

//   &__header {
//     font-size: 28px;
//     font-weight: bold;
//     line-height: 1.29;
//     padding: 16px 16px 0 25px;
//     position: relative;
//   }
//   &__body {
//     padding: 25px;
//     min-height: 412px;
//     max-height: 412px;
//     // overflow-y: scroll;
//   }
// }

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
  width: 400px;
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

</style>