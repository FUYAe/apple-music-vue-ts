<script setup lang="ts">
import { useStore } from "@/store";
import { onMounted, reactive, ref, watchEffect } from "vue";
const store = useStore();
const ulOfLrcRef = ref({} as HTMLUListElement);
const warpperRef = ref({} as HTMLDivElement);
const bgBlurRef = ref({} as HTMLDivElement);
const bgImgRef = ref({} as HTMLImageElement);
const currentLrcIndex = ref(0);
const lrcStyle = reactive({
  fontSize: "14px",
  color: "rgba(204, 204, 204, 0.897)",
});
const isCurrentLrc = (time: number, index: number) => {
  let isCurrent =
    time < store.playing.currentTime &&
    store.playing.currentTime <
    (store.lyric[index + 1] ? store.lyric[index + 1][0] : 1000000000);
  if (isCurrent) {
    currentLrcIndex.value = index;
  }
  return isCurrent;
};

const onWheel = (e: any) => {
  const bgBlurStyle = window.getComputedStyle(bgBlurRef.value);
  const ulStyle = window.getComputedStyle(ulOfLrcRef.value);
  let bgHight = parseFloat(bgBlurStyle.height);
  let top = parseFloat(ulStyle.top);
  let height = parseFloat(ulStyle.height);

  ulOfLrcRef.value.style.top =
    Math.min(bgHight / 2, Math.max(top + e.deltaY, -height + bgHight / 2)) +
    "px";
};
const onMoveover = (e: MouseEvent) => {
  bgBlurRef.value.addEventListener("mousewheel", onWheel);
};
const onMoveout = (e: MouseEvent) => {
  bgBlurRef.value.removeEventListener("mousewheel", onWheel);
};
onMounted(() => {
  bgBlurRef.value.addEventListener("mouseover", onMoveover);
  bgBlurRef.value.addEventListener("mouseout", onMoveout);
  watchEffect(() => {
    if (!(bgBlurRef.value instanceof Element)) return;
    const bgBlurStyle = window.getComputedStyle(bgBlurRef.value);
    const lis = document.querySelectorAll(".lyricli");
    let flag = 0;
    for (let i = 0; i < currentLrcIndex.value; i++) {
      const liStyle = window.getComputedStyle(lis[i]);
      flag += parseFloat(liStyle.height) + 10;
    }
    let bgHight = parseFloat(bgBlurStyle.height);
    ulOfLrcRef.value.style.top = bgHight / 2 - flag + "px";
  });
});

const controlFontSize = (isExt: boolean) => {
  const fontSize = parseInt(lrcStyle.fontSize)
  if (isExt) {
    if (fontSize >= 40) return;
    lrcStyle.fontSize = fontSize + 1 + "px"
  } else {
    if (fontSize <= 12) return;
    lrcStyle.fontSize = fontSize - 1 + "px"
  }
};

const setFontColor = () => {
  lrcStyle.color = lrcStyle.color !== "rgba(204, 204, 204, 0.897)"
    ? "rgba(204, 204, 204, 0.897)"
    : "rgba(20, 20, 20, 0.897)";

};
</script>
<template>
  <div class="lyric" :style="{
    backdropFilter: 'blur(6px);',
  }" ref="warpperRef">
    <img ref="bgImgRef" :src="store.playing.imgUrl" alt="" />
    <div class="bg" ref="bgBlurRef">
      <div class="control">
        <button @click="controlFontSize(false)">字体调小</button>
        <button @click="controlFontSize(true)">字体调大</button>
        <button @click="setFontColor">字体颜色</button>
      </div>
      <ul ref="ulOfLrcRef">
        <li :style="lrcStyle">
          {{ store.playing.name + " " + store.playing.au }}
        </li>
        <li class="lyricli" v-for="(item, index) in store.lyric" :class="{ 'is-active': isCurrentLrc(item[0], index) }"
          :style="lrcStyle" :key="item[0]">
          {{ item[1] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lyric {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

  >img {
    width: 100%;
    height: 100%;
    // object-fit: contain;
    transform: scale(1.1);
  }

  .bg {
    backdrop-filter: blur(80px);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    .control {
      position: absolute;
      top: 10px;
      z-index: 20;
      height: 20px;
      width: calc(100% - 30px);
      top: 0;
      right: 0;
      text-align: left;

      button {
        display: none;
        margin: 0 5px;
        background-color: rgb(77, 77, 77);
        border-radius: 3px;
        padding: 4px;
      }

      button:active {
        transform: scale(0.9);
      }
    }

    .control:hover button {
      display: inline-block;
    }

    ul {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0;
      transition: all 1s;

      li {
        color: rgba(204, 204, 204, 0.897);
        font-size: 14px;
        margin: 10px 0;
        word-spacing: 2px;
        font-family: youyuan;
      }

      .is-active {
        transition: all 0.5s;
        color: rgb(209, 255, 145) !important;
        font-weight: bolder;
        transform: scale(1.3);
        // -webkit-text-stroke: 0.05px rgb(255, 255, 255);
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
</style>
