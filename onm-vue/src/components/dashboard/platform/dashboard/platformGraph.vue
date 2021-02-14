<template>
    <v-container fluid>        
        <div class="row">
            <div class="col-4">
                <user-transition v-bind:param=param></user-transition>
            </div>
            <div class="col-4">
                <cam-transition v-bind:param=param></cam-transition>
            </div>
            <div class="col-4">
                <iot-transition v-bind:param=param></iot-transition>
            </div>
        </div>
    </v-container>    
</template>

<script>
import UserTransition from './graph/userTransition'
import CamTransition from './graph/camTransition'
import IotTransition from './graph/iotTransition'

export default {
  props: ['param'],
  components:{
      UserTransition,
      CamTransition,
      IotTransition
  }
}
</script>

<style scoped>

</style>