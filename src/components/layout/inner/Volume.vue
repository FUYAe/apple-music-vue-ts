<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@/store";
import { VolumeMedium, VolumeOff, VolumeMute } from "@vicons/ionicons5";
import { Icon } from "@vicons/utils";
const store = useStore();
let volumeValue = ref(50);
const isMute = ref(false);
watchEffect(() => {
  if (store.audioRef) {
    store.audioRef.volume = volumeValue.value / 100;
  }
  if (volumeValue.value == 0) {
    isMute.value = true;
  } else {
    isMute.value = false;
  }
});
const setVolume = (volVal: number) => {
  if (volVal < 0 || volVal > 100) return;
  volumeValue.value = volVal;
};
</script>
<template>
  <div class="header-item-volume">
    <Icon @click="setVolume(0)" size="20" class="icon-header volume-down">
      <VolumeMute v-if="isMute"></VolumeMute> <VolumeOff v-else></VolumeOff
    ></Icon>
    <div class="slider">
      <input
        class="input-range2"
        type="range"
        min="0"
        max="100"
        v-model="volumeValue"
      />
    </div>
    <Icon @click="setVolume(100)" size="20" class="icon-header volume-up"
      ><VolumeMedium></VolumeMedium
    ></Icon>
  </div>
</template>

<style lang="scss" scoped>
.header-item-volume {
  width: 200px;
  .icon-header {
    position: relative;
    z-index: 3;
    width: 16px;
    height: 16px;
    opacity: 0.5;
    margin: 5px;
  }

  .icon-header:hover {
    opacity: 0.7;
  }

  .volume-up .volume-down {
    width: 10px;
    height: 10px;
  }
  div {
    display: inline-block;
    width: 70px;
    height: 5px;
    margin: 10px;
  }
  .slider {
    position: relative;

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      position: relative;
      top: -10px;
      background: #ebebeb;
      height: 1px;
      border: 1px solid #dedede;
      outline: none;
      color: #dedede;
      border-radius: 2px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      position: relative;
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-radius: 50%;
      transition: 0.2s;
      border: 1px solid #bababa;
    }

    input[type="range"]:active::-webkit-slider-thumb {
      background: #dedede;
    }
  }
}
</style>
