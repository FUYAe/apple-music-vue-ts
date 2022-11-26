<template>
  <button class="i-btn" :style="{ width, height, borderRadius: radius }">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  width?: string
  height?: string
  radius?: string
}>(), { width: "20px", height: "20px", radius: "4px" })
</script>
<script lang="ts">
export default {
  name: "IBtn"
}</script>

<style lang="scss" scoped>
.i-btn {
  outline: none;
}

.i-btn:hover {
  opacity: 0.9;
}

.i-btn:active {
  transform: scale(0.9);

}
</style>