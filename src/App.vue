<script setup lang="ts">
import MainWindow from "@/views/MainWindow.vue";
import Window from "@/components/common/Window.vue"
import LyricWindow from "@/views/LyricWindow.vue";
import { useStore } from "@/store";
const store=useStore()
const closeLyric = () => {
  store.isShowLyric = false;
};
</script>

<template>
  <MainWindow />
  <template v-if="store.isShowLyric">
      <Teleport to="#app">
        <Window @out="closeLyric">
          <LyricWindow></LyricWindow>
        </Window>
      </Teleport>
    </template>
</template>

<style lang="scss"></style>
