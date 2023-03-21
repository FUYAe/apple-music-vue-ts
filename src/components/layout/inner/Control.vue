<script setup lang="ts">
import { ref } from "vue";
import { useStore, useMusicStore } from "@/store";

import { Icon } from "@vicons/utils";
import { IosPlay, IosShuffle, IosSync, IosPause } from "@vicons/ionicons4";
import { BackwardFilled, ForwardFilled } from "@vicons/antd";
const store = useStore();
const musicStore = useMusicStore()
const playOrStop = () => {
  if (musicStore.playing.isPlaying) {
    store.audioRef && store.audioRef.pause();
  } else {
    store.audioRef && store.audioRef.play().then();
  }
  musicStore.playing.isPlaying = !musicStore.playing.isPlaying;
};
const playNextMusic = () => {
  musicStore.playMusicInList(musicStore.playing.index + 1);
};
const playPreMusic = () => {
  musicStore.playMusicInList(musicStore.playing.index - 1);
};
const setSwitchModel = (switchModel: 0 | 1 | 2) => {
  if (switchModel == musicStore.playControl.switchModel) {
    musicStore.playControl.switchModel = 0;
    return;
  }
  musicStore.playControl.switchModel = switchModel;
};
</script>
<template>
  <div class="header-item-control">
    <Icon class="icon-header" :class="{ 'is-active': musicStore.playControl.switchModel == 2 }" size="20"
      @click="setSwitchModel(2)">
      <IosShuffle></IosShuffle>
    </Icon>
    <Icon class="icon-header" size="20" @click="playPreMusic">
      <BackwardFilled></BackwardFilled>
    </Icon>
    <Icon class="icon-header" size="20" @click="playOrStop">
      <IosPlay v-if="!musicStore.playing.isPlaying"></IosPlay>
      <IosPause v-else></IosPause>
    </Icon>
    <Icon class="icon-header" size="20" @click="playNextMusic">
      <ForwardFilled></ForwardFilled>
    </Icon>
    <Icon class="icon-header" :class="{ 'is-active': musicStore.playControl.switchModel == 1 }" size="20"
      @click="setSwitchModel(1)">
      <IosSync></IosSync>
    </Icon>
  </div>
</template>

<style lang="scss" scoped>
.header-item-control {
  .icon-header {
    position: relative;
    z-index: 3;
    opacity: 0.5;
    margin: 5px;
  }

  .icon-header:hover {
    opacity: 0.7;
  }

  .is-active {
    color: #ff0033;
    opacity: 1;
  }
}
</style>
