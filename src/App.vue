<script setup lang="ts">
import MainWindow from "@/views/MainWindow.vue";
import Window from "@/components/common/Window.vue"
import LyricWindow from "@/views/LyricWindow.vue";
import Control from "./components/control/Control.vue";
import { useStore, usePersistStore } from "@/store";
import { onMounted, watchEffect, watch } from "vue";
import { getAllData, initDB } from "./indexedDB";
import { compressImgItem } from "./utils";
import { Body } from "@vicons/ionicons5";
import MiniPlayer from "./components/MiniPlayer.vue";
import BodyLyric from "./views/BodyLyric.vue";
import { storeToRefs } from "pinia";
const store = useStore()
const persistStore = usePersistStore()
const closeLyric = () => {
  store.isShowLyric = false;
};
const showMiniPlayer = false
initDB().then((db: IDBDatabase) => {
  store.db = db
  getAllData("backgroundImgs").then(({ res }) => {
    persistStore.bgImgArray = []
    for (let img of res.result) {
      compressImgItem(img).then((img) => {
        persistStore.bgImgArray.unshift(img)
      })
    }
  }

  )

})
onMounted(() => {
  if (persistStore.bgImg) {
    document.body.style.backgroundImage = "url(" + persistStore.bgImg + ")"
  }
  document.body?.addEventListener("mousedown", () => {
    store.isShowControl = false
  })
})


</script>

<template>
  <KeepAlive>
    <MainWindow v-show="!store.showMiniPlayer" />
  </KeepAlive>

  <template v-if="store.isShowLyric">
    <Teleport to="#app">
      <Window @out="closeLyric">
        <LyricWindow></LyricWindow>
      </Window>
    </Teleport>
  </template>
  <template v-if="store.showBodyLyric">
    <Teleport to="body">
      <BodyLyric></BodyLyric>
    </Teleport>
  </template>
  <template v-if="store.showMiniPlayer">
    <Teleport to="#app">
      <Window @out="store.showMiniPlayer = false" @ext="store.showMiniPlayer = false" :locksize="true" width="268px"
        height="90px" controlbtn>
        <MiniPlayer />
      </Window>
    </Teleport>
  </template>
  <template v-if="store.isShowControl">

    <Teleport to="body">
      <Transition name="fromleft">
        <Control @click.stop="" @mousedown.stop="" />
      </Transition>
    </Teleport>
  </template>
  <img @click.stop="store.isShowControl = !store.isShowControl" @mousedown.stop="" class="control"
    src="./assets/control.png" alt="">
</template>

<style lang="scss">
.fromleft-enter-active,
.fromleft-leave-active {
  transition: all 0.5s ease;
}

.fromleft-enter-from,
.fromleft-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.control {
  z-index: 1000;
  width: 20px;
  height: 20px;
  opacity: 0.8;
  position: fixed;
  right: 10px;
  bottom: 10px;
  /* box-shadow: 1px 1px #eeeeee; */

}
</style>
