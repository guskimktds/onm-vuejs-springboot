<template>
  <div>
    <v-container
      id="user-profile"
      fluid
      tag="section"
    >
      <div class="text-center">
        <v-progress-circular
        :rotate="360"
        :size="300"
        :width="15"
        :value="value"
        color="teal"
        >
        {{title}}
        </v-progress-circular>
      </div>
    </v-container>
    <v-container
    v-bind="goHome(this.$store.state.authGroupId)"></v-container>
  </div>
</template>

<script>
import EventBus from '../../EventBus';

export default {
  data(){        
        return {
            title: '로그인 시도중입니다...',
            timeout: {},
            value: 0,
        }
    },
  updated(){
    this.goHome();
  },

  mounted(){
    this.goHome();
  },

  methods: {

    goHome(auth){
    auth=this.$store.state.authGroupId

    this.timeout=setTimeout(()=>{
    if (this.value>100) {

      if(auth==''||auth==undefined){
        this.$router.push({name:'SignIn'})
      }else if(auth=='G100'||auth=='G200'){
        this.$router.push({name:'PlatformDashboard'})
      }else if(auth=='G300'){
        this.$router.push({name:'CamregStat'})
      }

    this.changeTap('M100')
       }
       this.value+=50
    },1000);
    },

    changeTap(id){
      var selectMenu = this.$store.state.menu.filter(obj => { return obj['menu_id'] === id})
      EventBus.$emit('top-path-login', selectMenu[0].children);
    },

    openFirstSideMenu(){
      try{
        var uid = this.$refs.vList.$children[0]._uid;
        this.$refs.vList.listClick(uid);
      }catch(e){
        console.log("");
      }
      
    }

  },

}
</script>

<style scoped>
.container {
  margin-top: 250px;
  max-width: 320px;
  max-height: 100vh;
  margin-bottom: 250px;
}

.v-progress-circular {
  margin: 1rem;
}
</style>