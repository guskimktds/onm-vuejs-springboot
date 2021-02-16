<template>
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
</template>

<script>
export default {
    data(){        
        return {
            title: '로그아웃(Sign Out) 되셨습니다.^^',
            interval: {},
            value: 0,
        }
    },
    created() {

        this.interval = setInterval(() => {
            if (this.value === 100) {
                // return (this.value = 0)
                this.$router.push('/signin')
            }
            this.value += 20
        }, 500)
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