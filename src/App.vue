<script setup lang="ts">
import { onMounted } from "vue";
import { getAllData, initDB } from "./indexedDB";
import { compressImgItem } from "./utils";
import MainWindow from "@/views/main_window/Main.vue";
import LyricWindow from "@/views/window/LyricWindow.vue";
import Control from "@/views/insert/Control.vue";
import MiniPlayer from "@/views/window/MiniPlayer.vue";
import BodyLyric from "@/views/insert/BodyLyric.vue";
import { addKeyEvent } from "@/utils/keyControl"
import { useStore, usePersistStore, useConfigStore, useMusicStore } from "@/store";
const store = useStore()
const persistStore = usePersistStore()
const configStore = useConfigStore()
const musicStore = useMusicStore()

initDB().then((db: IDBDatabase) => {
  store.db = db
  getAllData("backgroundImgs").then(({ res }) => {
    configStore.bgImgThumbnails = []
    for (let img of res.result) {
      compressImgItem(img).then((img) => {
        configStore.bgImgThumbnails.unshift(img)
      })
    }
  })
})
const close_controlban_when_itLostBlur = () => {
  document.body?.addEventListener("mousedown", () => {
    store.isShowControlPanel = false
  })
}
const init_bgImg = () => {
  if (configStore.getBgImage) {
    document.styleSheets[0].insertRule(" body{background:url(" + configStore.getBgImage + ") no-repeat center center fixed  !important;}")
  }
}
const addKeyListener = () => {
  addKeyEvent("Space", (e) => {

    if (musicStore.playing.isPlaying) {
      store.audioRef && store.audioRef.pause();
    } else {
      store.audioRef && store.audioRef.play().then();
    }
    musicStore.playing.isPlaying = !musicStore.playing.isPlaying;
  })
  addKeyEvent("ArrowUp", (e) => {

    if (configStore.getVolume >= 100) return
    if (store.audioRef) {
      configStore.increaseVolume()
    }

  })
  addKeyEvent("ArrowDown", (e) => {
    if (configStore.getVolume <= 0) return
    if (store.audioRef) {
      configStore.decreaseVolume()
    }
  })
  addKeyEvent("ArrowRight", (e) => {
    if (!musicStore.playing.musicSrc || !musicStore.playing.isPlaying || !store.audioRef) return;
    let f = store.audioRef!.currentTime + 2
    if (f > store.audioRef!.duration) {
      f = store.audioRef!.duration
    }
    store.audioRef!.currentTime = f

  })
  addKeyEvent("ArrowLeft", (e) => {
    if (!musicStore.playing.musicSrc || !musicStore.playing.isPlaying || !store.audioRef) return;
    let f = store.audioRef!.currentTime - 2
    if (f > store.audioRef!.duration) {
      f = store.audioRef!.duration
    }
    store.audioRef!.currentTime = f


  })


}

onMounted(() => {
  init_bgImg()
  close_controlban_when_itLostBlur()
  addKeyListener()
})


</script>

<template>
  <KeepAlive>
    <component v-show="!store.isShowMiniPlayer" :is="MainWindow"></component>
  </KeepAlive>
  <template v-if="musicStore.lyricControl.isShowLyric">
    <LyricWindow></LyricWindow>
  </template>
  <template v-if="musicStore.lyricControl.isShowBodyLyric">
    <BodyLyric></BodyLyric>
  </template>
  <template v-if="store.isShowMiniPlayer">
    <MiniPlayer />
  </template>
  <template v-if="store.isShowControlPanel">
    <Control @click.stop="" @mousedown.stop="" />
  </template>
  <img @click.stop="store.isShowControlPanel = !store.isShowControlPanel" @mousedown.stop="" class="control-btn"
    src="./assets/control.png" alt="">
</template>

<style lang="scss">
.control-btn {
  z-index: 1000;
  width: 20px;
  height: 20px;
  opacity: 0.8;
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
