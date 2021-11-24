<template>
    <v-container>
        <div class="row ">
            <div class="col-10 "  >
            <avg-api-time
            v-bind:param=param
            ></avg-api-time>
            </div>
        </div>
            <div class="row">
        <div class="col-5">
            <count-call-api
            v-bind:param=param
            ></count-call-api>
        </div>
        <div class="col-5">
            <count-call-store
            v-bind:param=param
            ></count-call-store>
        </div>
        </div>
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
.small{
    height: 30px;
}
</style>