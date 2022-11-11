<template>
  <div class="bodylrc">
    <Lyric />
  </div>
</template>

<script setup lang="ts">
import Lyric from './Lyric.vue';
</script>

<style lang="scss" scoped>
.bodylrc {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
</style>