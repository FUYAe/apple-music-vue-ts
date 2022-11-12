<script setup lang="ts">
import { useStore, usePersistStore } from "@/store";
import { onMounted } from "vue";
import { getAllData, initDB } from "./indexedDB";
import { compressImgItem } from "./utils";
import MainWindow from "@/views/main_window/Main.vue";
import LyricWindow from "@/views/window/LyricWindow.vue";
import Control from "@/views/insert/Control.vue";
import MiniPlayer from "@/views/window/MiniPlayer.vue";
import BodyLyric from "@/views/insert/BodyLyric.vue";
const store = useStore()
const persistStore = usePersistStore()
initDB().then((db: IDBDatabase) => {
  store.db = db
  getAllData("backgroundImgs").then(({ res }) => {
    persistStore.bgImgArray = []
    for (let img of res.result) {
      compressImgItem(img).then((img) => {
        persistStore.bgImgArray.unshift(img)
      })
    }
  })
})
const close_controlban_when_itLostBlur = () => {
  document.body?.addEventListener("mousedown", () => {
    store.isShowControl = false
  })
}
const init_bgImg = () => {
  if (persistStore.bgImg) {
    document.body.style.backgroundImage = "url(" + persistStore.bgImg + ")"
  }
}


onMounted(() => {
  init_bgImg()
  close_controlban_when_itLostBlur()
})


</script>

<template>
  <KeepAlive>
    <component v-show="!store.showMiniPlayer" :is="MainWindow"></component>
  </KeepAlive>
  <template v-if="store.isShowLyric">
    <LyricWindow></LyricWindow>
  </template>
  <template v-if="store.showBodyLyric">
    <BodyLyric></BodyLyric>
  </template>
  <template v-if="store.showMiniPlayer">
    <MiniPlayer />
  </template>
  <template v-if="store.isShowControl">
    <Control @click.stop="" @mousedown.stop="" />
  </template>
  <img @click.stop="store.isShowControl = !store.isShowControl" @mousedown.stop="" class="control-btn"
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
