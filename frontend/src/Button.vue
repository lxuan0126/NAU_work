<template>
  <button @click="click">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: String
  },
  methods: {
    click() {
      this.$emit('click');
    }
  }
};
</script>
