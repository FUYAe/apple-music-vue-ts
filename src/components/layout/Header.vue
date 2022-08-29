<script setup lang="ts">
import Control from "./inner/Control.vue";
import Player from "./inner/Player.vue";
import Volume from "./inner/Volume.vue";
import More from "./inner/More.vue";
</script>
<template>
  <div class="header">
    <Control class="header-item" />
    <Player class="header-item" />
    <Volume class="header-item" />
    <More class="header-item" />
  </div>
</template>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  border-top-right-radius: 10px;
  border-bottom: 0.2px solid #dedede;
  display: flex;
  justify-content: space-between;

  .header-item {
    display: inline-block;
    padding-top: 11px;
    padding-bottom: 11px;
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
