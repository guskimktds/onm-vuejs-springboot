<template>
  <v-list-item
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.path"
    :active-class="`primary ${!isDark ? 'black' : 'white'}--text`"
  >
    <v-list-item-icon
      v-if="text"
      class="v-list-item__icon--text"
      v-text="''"
    />

    <v-list-item-icon v-else-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>

    <v-list-item-content v-if="item.name || item.subtitle">
      <v-list-item-title v-text="item.name" />

      <v-list-item-subtitle v-text="item.subtitle" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import Themeable from 'vuetify/lib/mixins/themeable'

  export default {
    name: 'Item',

    mixins: [Themeable],

    props: {
      item: {
        type: Object,
        default: () => ({
          href: undefined,
          icon: undefined,
          subtitle: undefined,
          title: undefined,
          to: undefined,
        }),
      },
      text: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      computedText () {
        if (!this.item || !this.item.name) return ''

        let text = ''

        this.item.name.split(' ').forEach(val => {
          text += val.substring(0, 1)
        })

        return text
      },
      href () {
        return this.item.href || (!this.item.path ? '#' : undefined)
      },
    },
  }
</script>
