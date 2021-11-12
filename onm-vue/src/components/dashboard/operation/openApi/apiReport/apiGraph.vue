<template>
    <v-container>
              <avg-api-time
            v-bind:param=param
            ></avg-api-time>
            <count-call-api
            v-bind:param=param
            ></count-call-api>
            <count-call-store
            v-bind:param=param
            ></count-call-store>
    </v-container>
</template>

<script>
import AvgApiTime from './graph/avgApiTime.vue'
import CountCallApi from './graph/countCallApi.vue'
import CountCallStore from './graph/countCallStore.vue'
export default {
    props: ['param'],
    components:{
        AvgApiTime,
        CountCallApi,
        CountCallStore,
    }
}
</script>

<style>

</style>