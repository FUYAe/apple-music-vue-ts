<!--
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-23 18:05:44
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:43:03
 * @FilePath: \applemusic-vue3-ts\src\components\layout\inner\Player.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "@/store";
import { s_to_hs } from "@/utils";
import PlayerInfo from "@/components/PlayerInfo.vue";
const store = useStore();
let audioRef = ref<HTMLAudioElement | null>(null);


let progress = ref(0);
const currentTime = ref();
const timeDuration = ref();
onMounted(() => {
  store.audioRef = audioRef.value;
  setInterval(async () => {
    if (!audioRef.value) return;
    progress.value =
      (audioRef.value.currentTime / audioRef.value.duration) * 100;
    currentTime.value = s_to_hs(audioRef.value.currentTime || 0);
    timeDuration.value = s_to_hs(audioRef.value.duration || 0);
    if (progress.value == 100) {
      store.playMusicInList(store.playing.index + 1);
    }
  }, 300);
});




const timeUpdate = () => {
  store.playing.currentTime = audioRef.value!.currentTime * 1000;
};
</script>
<template>

  <PlayerInfo v-bind="$attrs"></PlayerInfo>
  <audio @timeupdate="timeUpdate" ref="audioRef" :src="store.playing.musicSrc" controls autoplay></audio>

</template>

<style lang="scss" scoped>
audio {
  display: none;
}
</style>
