<script setup lang="ts">
import { s_to_hs } from "@/utils";
import { Icon } from "@vicons/utils";
import { IosPlay, IosMore } from "@vicons/ionicons4";
import { defineEmits } from "vue";
const emits = defineEmits(["play"]);
const props = defineProps<{
  index: number;
  name: string;
  long: number;
}>();
const playMusic = () => {
  emits("play");
};
</script>
<template>
  <div class="music-item" :style="{ backgroundColor: index % 2 == 0 ? '#ddd2' : '#ddd4' }">
    <IBtn class="play-btn">
      <span>{{ props.index }}</span>
      <Icon size="20" class="icon" @click="playMusic">
        <IosPlay></IosPlay>
      </Icon>
    </IBtn>
    <span class="song-name">{{ props.name }}</span>
    <span class="dt">{{ s_to_hs(props.long / 1000) }}</span>
    <button>
      <Icon size="20" color="#ff0033" class="icon">
        <IosMore></IosMore>
      </Icon>
    </button>
  </div>
</template>
<script lang="ts">
export default {
  name: "MusicItemBiref",
};
</script>
<style lang="scss" scoped>
.music-item {
  height: 40px;
  width: 100%;
  background-color: #ddd2;
  border-radius: 5px;
  margin: 2px 0;
  padding: 12px;
  display: flex;
  justify-content: space-between;

  >span {
    display: inline-block;
    width: 20%;
    text-align: left;
    vertical-align: top;
    font-size: 13px;
  }

  .song-name {
    width: 40%;
  }

  .play-btn {
    width: 30px;

    .icon {
      display: none;
      color: #ff0033;

    }

    span {
      color: #000;
      font-size: 13px;
    }
  }

  .play-btn:hover {
    .icon {
      display: inline;
    }

    span {
      display: none;
    }
  }
}

.play-btn:active {
  .icon {
    transform: scale(0.9);
  }
}

.music-item:hover {
  background-color: #ddd6;

  .play-btn {


    .icon {
      display: inline-block;

    }

    span {
      display: none;
    }
  }
}
</style>
