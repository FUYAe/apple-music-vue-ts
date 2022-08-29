<script setup lang="ts">
import { defineProps, onMounted, reactive } from "vue";
// const props = defineProps<{ musics: any[] }>();
import { useStore } from "@/store";
import { Icon } from "@vicons/utils";
import { IosPlay } from "@vicons/ionicons4";
const store = useStore();
onMounted(() => {});
const playMusic = (index: number) => {
  store.playMusicByClick(index);
};
</script>
<template>
  <div class="search-r">
    <div v-for="(item, index) in store.playList" class="music-item">
      <img class="pic" :src="item.al.picUrl" alt="" srcset="" />
      <button class="play-btn">
        <Icon class="play-item" @click="playMusic(index)" size="40"
          ><IosPlay></IosPlay>
        </Icon>
      </button>
      <div class="black"></div>
      <div class="msg">
        <h3>{{ item.name }}</h3>
        <p>{{ item.ar[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-r {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: stretch;
  // align-items: stretch;
  .music-item {
    width: 90%;
    height: 80px;
    padding: 5px;
    margin: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    > button:active .play-item {
      transform: scale(0.9);
    }
    > .pic {
      // position: absolute;
      left: 0;
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 10px;
    }
    > .play-btn {
      display: none;
      height: 40px;
      position: absolute;
      z-index: 10;
      width: 40px;
      aspect-ratio: 1/1;
      top: 50%;
      transform: translateY(-50%);
      left: 28px;
    }
    > .play-btn:hover {
      color: #ff0033;
    }
    .black {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(0, 0, 0, 0.127);
    }
    .msg {
      display: inline-block;
      width: calc(100% - 80px);
      vertical-align: top;
      padding-left: 20px;
      h3,
      p {
        text-align: left;
      }
    }
  }
  .music-item:hover .play-btn {
    display: block;
    color: #ff0033;
  }
  .music-item:hover .black {
    display: block;
  }
}
</style>
