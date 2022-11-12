<template>
  <Teleport to="body">
    <div class="bodylrc">
      <Lyric />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Window from "@/plugin/components/Window.vue";
import Lyric from '../../components/Lyric.vue';
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