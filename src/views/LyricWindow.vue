<script setup lang="ts">
import { useStore, usePersistStore } from "@/store";
import { storeToRefs } from "pinia"
import { onMounted, reactive, ref, watchEffect } from "vue";
import Lyric from "./Lyric.vue";
const store = useStore();
const warpperRef = ref({} as HTMLDivElement);
const bgImgRef = ref({} as HTMLImageElement);



</script>
<template>
  <div class="lyric" :style="{
    backdropFilter: 'blur(6px)',
  }" ref="warpperRef">
    <img ref="bgImgRef" :src="store.playing.imgUrl" alt="" />
    <Lyric />
  </div>
</template>

<style lang="scss" scoped>
.lyric {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  >img {
    width: 100%;
    height: 100%;
    // object-fit: contain;
    backdrop-filter: blur(10px);
    transform: scale(1.1);
    filter:blur(40px);
  }


}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
</style>
