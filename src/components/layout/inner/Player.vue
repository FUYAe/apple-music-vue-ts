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
import { computed, onMounted, onUpdated, ref, Teleport } from "vue";
import { useStore } from "@/store";
import default_pic from "@/assets/default_player_pic.jpg";

import { s_to_hs } from "@/utils";
const store = useStore();
let audioRef = ref<HTMLAudioElement>({} as HTMLAudioElement);

let progressLen = ref(200);
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

const progressChanged = (newProgress: number, isPuse = true) => {
  if (!store.playing.musicSrc) return;
  audioRef.value.currentTime = audioRef.value.duration * (newProgress / 100);
  if (isPuse) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
    store.playing.isPlaying = true;
  }
};


const openLyric = () => {
  store.isShowLyric = true;
  store.setLyric();
};
const timeUpdate = () => {
  store.playing.currentTime = audioRef.value.currentTime * 1000;
  // console.log("store.playing.currentTime", store.playing.currentTime);
};
</script>
<template>
  <div class="header-item-player" style="padding-top: 0">
    <div class="pic" @click="openLyric">
      <img :src="store.playing.imgUrl || default_pic" alt="" srcset="" />
    </div>
    <div class="music-msg">
      <div class="music-name">
        <p>
          <span>{{ store.playing.name }}</span
          ><span>&nbsp;&nbsp;&nbsp;</span><span>{{ store.playing.au }}</span>
        </p>
      </div>

      <div class="music-slider">
        <!-- <input type="range" min="0" :max="len" v-model="progress" /> -->
        <div class="time">
          <span>{{ currentTime }}</span>
          <span>{{ timeDuration }}</span>
        </div>
        <ProgressBar
          class="range"
          :width="progressLen + 'px'"
          :loc="progress"
          @progress-changed="progressChanged"
        ></ProgressBar>
      </div>
    </div>

    <audio
      @timeupdate="timeUpdate"
      ref="audioRef"
      :src="store.playing.musicSrc"
      controls
      autoplay
    ></audio>
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

  > div {
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

    .music-name {
      position: absolute;
      left: 0;
      height: 70%;
      width: 100%;
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
