<template>
  <div class="container">
        <div class="row justify-content-center">
            <div class="register-form">
                <form>
                    <h3>{{ title }}</h3>
                    <div class="form-group">
                            <label>ID</label>
                            <input type="text" class="form-control form-control-lg" 
                            v-model="id" placeholder="사번을 입력하세요">
                    </div>
                    <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control form-control-lg"
                            v-model="password" placeholder="비밀번호를 입력하세요"> 
                    </div>
                    <button type="submit" class="btn btn-dark btn-lg btn-block" 
                    v-on:click="onSubmit(id, password)">Sign In</button>
                </form>     
      <!-- <app-capcha></app-capcha> -->
            </div>            
        </div>
        <footer class="footer">
            <span class="copyright"></span>
            <ul class="footer-link list-inline float-right"></ul>
        </footer>
    </div>
</template>

<script>
// import Capcha from '../../utils/capcah'
// import axios from "axios"
// const resourceHost = "http://localhost:3000"

export default {
    components: {
        // "app-capcha":Capcha
    },
    data(){        
        return {
            title: 'Sign In',
            //userData: {
                id: '',
                password: ''
            //}
        }
    },
    methods:{
      onSubmit(id, password) {     
        // return axios
        // .post(`${resourceHost}/login`, { id, password })
        // .then(res => {console.log(res)})
        this.$store
          .dispatch("LOGIN", { id, password })
          //.then( res => { console.log(res.status)})
          .then(() => this.redirect())
          //.catch(({ message }) => (this.msg = message))
      },
      redirect() {
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
        this.$router.go('/signup')

        //this.$router.push({path: "/platform/process", addToHistory: true});
      }
    }
}
</script>


<style lang="scss" scoped>
/* .container { max-width: 900px;}
.register-form { margin-top: 50px; max-width: 320px;}
.logo-wrapper { margin-bottom:  40px;}
.footer { width: 100%; line-height:  40px; margin-top: 50px;} */

.container {
  max-width: 900px;
}
.register-form {
  margin-top: 50px;
  max-width: 320px;
}
.logo-wrapper {
  text-align: center;
  margin-bottom: 40px;
  .tagline {
    line-height: 180%;
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
  line-height: 40px;
  border-top: 1px solid #ddd;
  margin-top: 50px;
  .list-inline-item {
    margin-right: 10px;
  }
  a {
    color: #666;
  }
}
</style>