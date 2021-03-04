<template>
  <div>
    {{this.$store.state.authGroupId}}
  </div>
</template>

<script>
import EventBus from '../../EventBus';

export default {

  updated(){

    var auth=this.$store.state.authGroupId

    if(auth==''||auth==undefined){
      this.$router.push({name:'SignOut'})
    }else if(auth=='G100'||auth=='G200'){
      this.$router.push({name:'PlatformDashboard'})
    }else if(auth=='G300'){
      this.$router.push({name:'CamregStat'})
    }

    this.changeTap('M100')

  },

  methods: {

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

<style scope>

</style>