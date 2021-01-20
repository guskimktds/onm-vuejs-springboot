<template>
  <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
        <base-material-card
            color="blue"
            dark
            icon="mdi-keyboard"
            title="마이페이지"
            class="px-5 py-3"
            >

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.id"
            

                label="사번"

              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.name"

                label="이름"

              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="user.ip"
            

                label="접속허용 IP"

              ></v-text-field>
            </v-col>
          </v-row>          
      </base-material-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            user: {
                id: "88888888",
                name: "홍길동",
                ip: "123.123.123.123"
            }
        }
    }
}
</script>

<style>

</style>