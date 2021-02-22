<template>
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
    <v-list dense>
      <v-list-item v-on:click="linkToFirstMenu()">
        <v-list-item-avatar
          class="align-self-center"
          color="white"
        >
          <v-img src="@/assets/images/kt_ci.png" />
        </v-list-item-avatar>
        <v-list-item-title class="display-1">
          {{title}}
        </v-list-item-title>
      </v-list-item>
    </v-list>

<!--
  <v-divider class="mb-2" /> 
    <v-list nav>
      <div />
        <template v-for="(item, i) in computedItems">
          <base-item-group          
            :key="`group-${i}`"
            :item="item"
          >
          </base-item-group>
        </template>
      <div />
    </v-list>
-->

  <v-divider class="mb-2" /> 
  <div>   
    <v-list>
      <v-list-group
        v-for="(item, i) in computedItems"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.children"
          :key="subItem.component"
          :to="subItem.path"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>

  </v-navigation-drawer>




</template>

<script>

import { mapState } from 'vuex'
import EventBus from '../../EventBus'

export default {
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  components: {
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
    ...mapState({ 
      topMenu: 'topMenu',
      subMenu: 'menu',
    }),
  },
  methods: {
    mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          // name: this.$t(item.name),
          name: item.name
        }
      },

    linkToFirstMenu(){
      var topMenuId = this.topMenu[0].menu_id;
      var selectMenu = this.subMenu.filter(obj => { return obj['menu_id'] === topMenuId})
      var path = selectMenu[0].children[0].children[0].path;
      this.$router.push(path);
      EventBus.$emit('top-path-login', selectMenu[0].children); 
    }
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