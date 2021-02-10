<template>
    <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
          color="orange"
          dark
          icon="mdi-keyboard"
          title="개통/해지 추이(대시보드)"
          class="px-5 py-3"
        >
        <platform-graph></platform-graph>
        </base-material-card>
    </v-container>
</template>

<script>
import PlatformGraph from '../dashboard/platformGraph'

export default{
  components:{
    PlatformGraph
  }
}
</script>