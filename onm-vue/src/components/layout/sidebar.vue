<template>
  <!-- <div id='sidebar'>
    <header>
      <span></span>
        {{ menu }}
      <a></a>
    </header>
    <ul>
      <li v-for="subMenu in newMenus" :key="subMenu.name">
        <router-link v-bind:to="subMenu.path">
          {{ subMenu.name }}
          
        </router-link>
        <sub-menu :menus="subMenu.children"></sub-menu>

      </li>
    </ul>
  </div> -->
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <!-- <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
    <v-list dense>
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          
        >
          <v-img
            src="@/assets/images/kt_ci.png"
          />
        </v-list-item-avatar>
        <v-list-item-title class="display-1">
          {{title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" /> 

    <!-- <v-list expand nav>

      <v-list-item-group
        v-for="subMenu in newMenus" :key="subMenu.name"
      >
        <router-link v-bind:to="subMenu.path">
          {{ subMenu.name }}
          
        </router-link>
        <sub-menu :menus="subMenu.children"></sub-menu>

      </v-list-item-group>

    </v-list> -->

    <v-list nav>

      <div />
        <template v-for="(item, i) in computedItems">
        <base-item-group
          
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
          <!-- <sub-menu :menus="item.children"></sub-menu> -->
        </base-item-group>
        <!-- <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        /> -->
        
      </template>
      
      <div />
    </v-list>

  </v-navigation-drawer>
</template>

<script>

import { mapState } from 'vuex'
import EventBus from '../../EventBus'
// import subMenu from './subMenu.vue'

export default {
  //props:['subMenus'],
  props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },
  components: {
    // 'sub-menu': subMenu
  },
  data () {
    return {
      title: 'GiGAeyes O&M',
      newMenus: [] 
    }
  },
  created(){
      EventBus.$on('top-path-login', (payload)=>{          
        // console.log(payload)
        this.newMenus = payload
      });

      EventBus.$on('top-path-logout', ()=>{          
        console.log('top-path-logout')
        this.newMenus = []
        console.log(this.newMenus)
      });
  },

  computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.newMenus.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          // title: this.$t('avatar'),
        }
      },
    },
  methods: {
    // openSubMenu: function(){
    //   console.log("open sub");
    // }
    mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          // name: this.$t(item.name),
          name: item.name
        }
      },
  }
}
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>