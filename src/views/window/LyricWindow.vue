<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
import Lyric from "../../components/Lyric.vue";

const store = useStore();
const closeLyric = () => {
  store.isShowLyric = false;
};
</script>
<template>
  <Teleport to="#app">
    <Window @out="closeLyric">
      <div v-bind="$attrs" class="lyric" :style="{
        backdropFilter: 'blur(6px)',
      }">
        <img :src="store.playing.imgUrl" alt="" />
        <Lyric />
      </div>
    </Window>
  </Teleport>

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
    filter: blur(40px);
  }


}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
</style>
