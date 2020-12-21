<style src="@/css/body.css"></style>

<template>
  <div>
    <p>{{ title }}</p>
    <grid :data="gridData" :columns="gridColumns"></grid>
  </div>

</template>

<script>
import Grid from '@/components/common/GridComponent'

export default {
  
  components: {
    Grid
  },

  data () {
    return {
      title: '개통/해지 추이',

      gridData : [ 
        { name: 'American alligator', location: 'Southeast United States' },
        { name: 'Chinese alligator', location: 'Eastern China' },
        { name: 'Spectacled caiman', location: 'Central & South America' },
        { name: 'Broad-snouted caiman', location: 'South America' },
        { name: 'Jacaré caiman', location: 'South America' },
        { name: 'Black caiman', location: 'South America' },
      ],

      gridColumns: ['name', 'location'],
   
    }
  }
}
</script>
