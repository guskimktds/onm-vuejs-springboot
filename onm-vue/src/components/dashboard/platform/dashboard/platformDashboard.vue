<template>

    <v-container fluid>
            
        <base-material-card
            color="orange"
            dark
            icon="mdi-keyboard"
            title="플랫폼현황 대시보드"
            class="px-5 py-3">
            <v-card>
                <platform-graph></platform-graph>
                <platform-result></platform-result>
                <platform-table></platform-table>
            </v-card>
        </base-material-card> 

    </v-container>
</template>

<script>

import PlatformGraph from './platformGraph';
import PlatformResult from './platformResult';
import PlatformTable from './platformTable';

export default {

    components: {
        PlatformGraph,
        PlatformResult,
        PlatformTable,

    },

}
</script>

<style scoped>

</style>