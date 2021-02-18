<template>
  <!-- <div class="container">
        <div class="row justify-content-center">
            <div class="register-form">
                <form>
                    
                    <div class="form-group">
                            
                            <input type="text" class="form-control form-control-lg" 
                            v-model="id" placeholder="사번을 입력하세요">
                    </div>
                    <div class="form-group">
                            
                            <input type="password" class="form-control form-control-lg"
                            v-model="password" placeholder="비밀번호를 입력하세요"> 
                    </div>
                    <button type="submit" class="btn btn-dark btn-lg btn-block" 
                    v-on:click="onSubmit(id, password)">Sign In</button>
                </form>     
            </div>            
        </div>
        <footer class="footer">
            <span class="copyright"></span>
            <ul class="footer-link list-inline float-right"></ul>
        </footer>
    </div> -->
    <v-container
      id="user-profile"
      fluid
      tag="section"
    >
      <v-card>
        <v-form justify="center">
          <v-container class="py-0">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="id" 
                  placeholder="사번을 입력하세요"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password" 
                  placeholder="비밀번호를 입력하세요"
                >                
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn                 
                  @click="onSubmit(id, password)"                  
                >
                  Login
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        
      </v-card>
    </v-container>
</template>

<script>
// import Capcha from '../../utils/capcah'
// import axios from "axios"
// const resourceHost = "http://localhost:3000"

// const AppWidth = window.innerWidth
// const AppHeight = window.innerHeight

export default {
    components: {
        // "app-capcha":Capcha
    },
    data(){        
      return {
        id: '',
        password: '',
        msg: {}
      }
    },
    methods:{
      onSubmit(id, password) {     
        //alert("onSubmit"+id+password);
        //this.$router.push({name:'AccountView'})
        // return axios.post(`${resourceHost}/login`, { id, password })
        // //.then(res => {alert(res)})
        // // .then(() => {
        // //   // alert('push sign up')
        // //   // this.$router.push({name:'AccountView'})
        // // })
        // .then(this.$router.replace('/account'))
        // //.then(() => this.redirect())
        // .catch(({ data }) => (this.msg = data))
        this.$store
          .dispatch("LOGIN", { id, password })
          //.then( res => { console.log(res.status)})
          .then(this.$router.replace('/platform'))
          .catch(({ message }) => (this.msg = message))
          //alert('push sign up')
          this.$router.push({name:'AccountView'})
      },
      // redirect() {
        // this.$router.replace('/account')
        // const { search } = window.location
  
        // const tokens = search.replace(/^\?/, "").split("&")
        // console.log(tokens)
        // const { returnPath } = tokens.reduce((qs, tkn) => {
        //   const pair = tkn.split("=")
        //   qs[pair[0]] = decodeURIComponent(pair[1])
        //   return qs
        // }, {})
        // console.log("redirect")

        // 리다이렉트 처리
        //alert('returnPath : '+returnPath)
        //this.$router.push('/signup')

        //this.$router.push({path: "/platform/process", addToHistory: true});
      // }
    }
}
</script>


<style lang="scss" scoped>
/* .container { max-width: 900px;}
.register-form { margin-top: 50px; max-width: 320px;}
.logo-wrapper { margin-bottom:  40px;}
.footer { width: 100%; line-height:  40px; margin-top: 50px;} */

.container {
  max-width: 100vw;
  max-height: 100vh;
}
.register-form {
  margin-top: 250px;
  max-width: 320px;
  max-height: 100vh;
  margin-bottom: 250px;
}
.logo-wrapper {
  text-align: center;
  margin-bottom: 1px;
  .tagline {
    line-height: 10%;
    color: #666;
  }
 .logo {
    max-width: 150px;
    margin: 0 auto;
  }
}
.register-form {
  .form-group label {
    font-weight: bold;
    color: #555;
  }
  .accept-terms {
    margin: 20px 0 40px 0;
  }
}
.footer {
  width: 100%;
  font-size: 13px;
  color: #666;
  line-height: 140px;
  border-top: 1px solid #ddd;
  margin-top: 150px;
  .list-inline-item {
    margin-right: 10px;
  }
  a {
    color: #666;
  }
}
</style>