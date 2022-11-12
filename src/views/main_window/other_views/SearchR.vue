<!--
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-25 14:09:51
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 21:33:42
 * @FilePath: \applemusic-vue3-ts\src\views\SearchR.vue
 * @Description: 搜索结果页
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import defimg from "@/assets/default_player_pic.jpg"
import { onMounted, onUpdated, reactive } from "vue";
import { useStore } from "@/store";
import { Icon } from "@vicons/utils";
import { IosPlay } from "@vicons/ionicons4";
import { useRouter, useRoute } from "vue-router";
import { getSearchR } from "@/axios/request";
// import Image from "@/components/common/Image.vue";
const store = useStore();
const router = useRouter();
const route = useRoute();
const searchR = reactive({
  playlist: [] as Song[],
});
let newkw = ""
const props = defineProps<{ query: any }>()
onMounted(() => {

  if (!(newkw = route.query.kw as string)) return;
  getSearchR(route.query.kw as string).then((res) => {
    searchR.playlist = res.data.result.songs;
  });
});
onUpdated(() => {
  if (newkw === route.query.kw as string) return
  getSearchR(route.query.kw as string).then((res) => {
    searchR.playlist = res.data.result.songs;
  });
  newkw = route.query.kw as string
})
const playMusic = (index: number) => {

  store.setPlayalist((store.playList = searchR.playlist));
  store.playMusicByClick(index);
};
const navigatorToAb = (id: number) => {
  router.push({
    name: "ablum",
    query: {
      id: id,
    },
  });
};
const slnotimg = (event: Event) => {
  var img = event.srcElement as HTMLImageElement; img!.src = defimg; img.onerror = null;
}
</script>
<template>
  <div class="search-r">
    <div v-for="(item, index) in searchR.playlist" class="music-item" @click="navigatorToAb(item.al.id)">
      <Image class="pic" :src="item.al.picUrl" alt="" srcset="" />
      <Icon class="play-item" @click.stop="playMusic(index)" size="40" color="#ff0033ee">
        <IosPlay></IosPlay>
      </Icon>
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

    >.pic {
      // position: absolute;
      left: 0;
      height: 100%;
      aspect-ratio: 1/1;
      border-radius: 10px;
    }

    >.play-item {
      display: none;
      position: absolute;
      z-index: 10;
      width: 40px;
      aspect-ratio: 1/1;
      top: 50%;
      transform: translateY(-50%);
      left: 28px;
    }

    >.play-item :hover {
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
        color: rgb(59, 59, 59);
        margin: 6px 0;
      }

      h3 {
        font-size: 14px;
      }

      p {
        font-size: 12px;
      }
    }
  }

  .music-item:hover .play-item {
    display: inline-block;
  }

  .music-item:hover .black {
    display: block;
  }
}
</style>
