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
import { computed, onMounted, onUnmounted, onUpdated, ref, Teleport } from "vue";
import { useMusicStore, useStore } from "@/store";
import default_pic from "@/assets/default_player_pic.jpg";
import Image from "@/plugin/components/Image.vue";
import { s_to_hs } from "@/utils";
import Control from "./layout/inner/Control.vue";
const musicStore = useMusicStore();
const store = useStore()
let progressLen = ref(200);
let progress = ref(0);
const currentTime = ref();
const timeDuration = ref();
onMounted(() => {
  setInterval(async () => {
    if (!store.audioRef) return;
    progress.value =
      (store.audioRef.currentTime / store.audioRef.duration) * 100;
    currentTime.value = s_to_hs(store.audioRef.currentTime || 0);
    timeDuration.value = s_to_hs(store.audioRef.duration || 0);
    if (progress.value == 100) {
      musicStore.playMusicInList(musicStore.playing.index + 1);
    }
  }, 300);
});


const progressChanged = (newProgress: number, isPuse = true) => {
  if (!musicStore.playing.musicSrc) return;
  store.audioRef!.currentTime = store.audioRef!.duration * (newProgress / 100);
  if (isPuse) {
    store.audioRef!.pause();
  } else {
    store.audioRef!.play();
    musicStore.playing.isPlaying = true;
  }
};


const openLyric = () => {
  musicStore.lyricControl.isShowLyric = true;
  musicStore.setLyric();
};

onUnmounted(() => {
  musicStore.lyricControl.isShowBodyLyric = false
})

</script>
<template>
  <div class="header-item-player" style="padding-top: 0">
    <div class="pic" @click="openLyric">
      <Image :src="musicStore.playing.imgUrl || default_pic" alt="" srcset="" />
    </div>
    <div class="music-msg">
      <div class="music-name">
        <p>
          <span>{{ musicStore.playing.name }}</span><span>&nbsp;&nbsp;&nbsp;</span>
          <AuName :id="musicStore.playing.auId">{{ musicStore.playing.au }}</AuName>
        </p>
      </div>

      <div class="music-slider">
        <div class="time">
          <span>{{ currentTime }}</span>
          <span>{{ timeDuration }}</span>
        </div>
        <ProgressBar class="range" :width="progressLen + 'px'" :loc="progress" @progress-changed="progressChanged">
        </ProgressBar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-item-player {
  width: 260px;
  height: 42px;
  padding: 0;
  padding-top: 0;
  margin: 4px;
  position: relative;
  // background-color: #dedede;
  border-radius: 3px;
  border: 0.1px solid #dedede;

  >div {
    display: inline-block;
    position: absolute;
    // top: 0;
    height: 100%;
    margin: 0;
  }

  .pic {
    position: absolute;
    left: 0;
    width: 42px;
    z-index: 3;
    // background-clip:
    // border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #dedede;

    img {
      width: 100%;
      height: 100%;
      border-bottom-left-radius: 3px;
      border-top-left-radius: 3px;
      // background-size: cover
      object-fit: contain;
    }
  }

  .music-msg {
    position: absolute;
    left: 42px;
    width: 218px;
    z-index: 10;

    .music-name {
      position: absolute;
      left: 0;
      height: 70%;
      width: 100%;

      span {
        font-size: 12px;
      }
    }

    .music-slider {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30%;
      width: 100%;

      .range {
        position: absolute;
        height: 10px;
        left: 0;
        bottom: 0;
      }

      .time {
        display: none;
        height: 10px;
        width: 200px;

        justify-content: space-between;
        padding: 0 5px;
        position: relative;
        top: -6px;

        span {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.522);
        }
      }
    }
  }

  .music-msg:hover .time {
    display: flex;
  }

  audio {
    display: none;
  }
}
</style>
