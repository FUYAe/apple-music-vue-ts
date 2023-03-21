<template>
  <Teleport to="#app">
    <Window @out="store.isShowMiniPlayer = false" @ext="store.isShowMiniPlayer = false" :locksize="true" width="268px"
      height="90px" controlbtn>
      <PlayInfo />
      <div v-bind="$attrs" class="mini-control">
        <button class="show-body-lyric" @click="showbodylyric">
          <svg t="1668149792128" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5426" width="20" height="20">
            <path d="M515.0208 533.7088h72.8576v94.6176h-72.8576z" fill="#515151" p-id="5427"></path>
            <path
              d="M781.9264 105.6256H237.6192c-73.0624 0-132.5056 59.4432-132.5056 132.5056v544.3072c0 73.0624 59.4432 132.5056 132.5056 132.5056h544.3072c73.0624 0 132.5056-59.4432 132.5056-132.5056V238.08c-0.0512-73.0624-59.4432-132.4544-132.5056-132.4544zM265.0112 260.7616a30.67904 30.67904 0 0 1 43.4176 1.2288l32.0512 33.9456a30.67904 30.67904 0 0 1-1.2288 43.4176 30.5152 30.5152 0 0 1-21.0944 8.3968 30.6176 30.6176 0 0 1-22.3232-9.6256l-32.0512-33.9456c-11.6224-12.3392-11.1104-31.7952 1.2288-43.4176z m144.384 451.6352l-75.5712 40.96a30.83776 30.83776 0 0 1-32.1024-1.7408 30.70464 30.70464 0 0 1-12.9536-29.44l38.2976-281.7536h-48.8448c-16.9472 0-30.72-13.7728-30.72-30.72s13.7728-30.72 30.72-30.72h84.0192c8.8576 0 17.3056 3.84 23.1424 10.496s8.4992 15.5648 7.3216 24.32l-34.8672 256.6144 22.3232-12.1344c14.9504-8.0896 33.5872-2.56 41.6256 12.3904 8.0384 15.0016 2.5088 33.6384-12.3904 41.728z m74.9056-22.6304c-16.9472 0-30.72-13.7728-30.72-30.72V502.9888c0-16.9472 13.7728-30.72 30.72-30.72h134.2976c16.9472 0 30.72 13.7728 30.72 30.72v156.0576c0 16.9472-13.7728 30.72-30.72 30.72H484.3008z m-36.6592-282.3168c0-16.9472 13.7728-30.72 30.72-30.72h140.544c16.9472 0 30.72 13.7728 30.72 30.72s-13.7728 30.72-30.72 30.72H478.3616c-16.9472 0-30.72-13.7216-30.72-30.72z m314.1632 303.5136c0 40.1408-32.6656 72.8576-72.8576 72.8576h-24.0128c-16.9472 0-30.72-13.7728-30.72-30.72s13.7728-30.72 30.72-30.72h24.0128c6.2976 0 11.4176-5.12 11.4176-11.4176v-380.928c0-11.7248-7.68-21.6576-16.6912-21.6576H458.9568c-16.9472 0-30.72-13.7728-30.72-30.72s13.7728-30.72 30.72-30.72h224.6656c43.1104 0 78.1312 37.2736 78.1312 83.0976v380.928z"
              :fill="musicStore.lyricControl.isShowBodyLyric ? '#6893df' : '#515151'" p-id="5428"></path>
          </svg>
        </button>
        <Control class="fb" />
      </div>
    </Window>
  </Teleport>
</template>

<script setup lang="ts">
import { useMusicStore, useStore } from "@/store";
import PlayInfo from "@/components/PlayerInfo.vue";
import Control from "@/components/layout/inner/Control.vue";
const store = useStore()
const musicStore = useMusicStore()
const showbodylyric = () => {
  let i = musicStore.lyricControl.isShowBodyLyric
  if (!i) {
    musicStore.setLyric()
  }
  musicStore.lyricControl.isShowBodyLyric = !i
}
</script>

<style lang="scss" scoped>
.mini-control {
  text-align: left;
  padding: 2px;

  .show-body-lyric {
    width: 23px;
    height: 23px;
  }

  .show-body-lyric:active {
    opacity: 0.8;
  }

  .fb {
    width: 60%;
    display: inline-block;
  }

  >* {
    margin: 0 4px;
  }
}
</style>