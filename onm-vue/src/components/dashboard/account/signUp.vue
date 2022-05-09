<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="register-form">
                <div class="logo-wrapper">
                    <div class="tagline">GiGAeyes Cloud 관리자등록</div>
                </div>
                <form action="">
                    <div class="form-group">                        
                        <label for="userid">사번</label>
                        <input type="text" class="form-control" id="userid" v-model="form.userid">
                    </div>
                    <div class="form-group">
                        <label for="password">패스워드</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">

                    </div>                    
                    <div class="form-group">
     
                        <input type="text" class="form-control" id="otp" v-model="form.otp">
                        <label for="otp" class="btn btn-info btn-block">OTP요청</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">계정생성</button>
                    <p class="text-center text-muted">이미 계정이 등록되었다면? <a href="/signin">Sign in</a></p>
                </form>
            </div>            
        </div>
        <footer class="footer">
            <span class="copyright"></span>
            <ul class="footer-link list-inline float-right"></ul>
        </footer>
    </div>
</template>
<script>
export default {
    name: 'SignUpPage',
    data: function () {
        return {
        form: {
            userid: '',
            password: '',
            accessip: '',
            otp:''
        },
        errorMessage: ''
        }
    },
    created() {
      alert('signup vue created')
    },
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