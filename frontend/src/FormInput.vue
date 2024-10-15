<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input :type="type" :name="name" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    name: String,
    label: String,
    modelValue: String,
  }
};
</script>
