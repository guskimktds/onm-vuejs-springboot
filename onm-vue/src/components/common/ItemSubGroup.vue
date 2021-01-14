<template>
  <base-item-group
    :item="item"
    text
    sub-group
  />
</template>

<script>
  export default {
    name: 'ItemSubGroup',

    props: {
      item: {
        type: Object,
        default: () => ({
          avatar: undefined,
          group: undefined,
          name: undefined,
          children: [],
        }),
      },
    },
  }
</script>
