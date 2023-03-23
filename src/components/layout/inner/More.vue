<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  watch,
  reactive,
  getCurrentInstance,
} from "vue";
import { useStore } from "@/store";
import ProgressBar from "../common/ProgressBar.vue";
import { getSongUrlById } from "@/axios/request";
const op = {
  menus: [{
    title: "收藏歌曲", onClick: (e: MouseEvent) => {

    }
  }, {
    title: "下一首播放", onClick: (e: MouseEvent) => {


    }
  }]
}
</script>
<template>
  <div class="header-item-more" v-followMenu="op">
    <img class="icon-header" src="@/assets/icon/radar.png" alt="" srcset="" />
    <img class="icon-header" src="@/assets/icon/lyric.png" alt="" srcset="" />
    <img class="icon-header" src="@/assets/icon/menu.png" alt="" srcset="" />
  </div>
</template>

<style lang="scss" scoped>
.header-item-more {
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
}
</style>
