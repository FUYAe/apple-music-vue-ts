<script setup lang="ts">
import { useStore, usePersistStore, useConfigStore, useMusicStore } from "@/store";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia"
import { onMounted, onUnmounted, onUpdated, reactive, ref, watch, watchEffect, toRef } from "vue";
const store = useStore();
const musicStore = useMusicStore()
const configStore = useConfigStore()
const persistStore = usePersistStore()
const ulOfLrcRef = ref({} as HTMLUListElement);
const bgBlurRef = ref({} as HTMLDivElement);





// const isCurrentLrc = computed((time: number, index: number) => {
//   let isCurrent =
//     time < store.playing.currentTime &&
//     store.playing.currentTime <
//     (store.lyric[index + 1] ? store.lyric[index + 1][0] : 1000000000);
//   if (isCurrent) {
//     currentLrcIndex.value = index;
//   }
//   return isCurrent;
// })
const onWheel = (e: any) => {
  const bgBlurStyle = window.getComputedStyle(bgBlurRef.value);
  const ulStyle = window.getComputedStyle(ulOfLrcRef.value);
  let bgHight = parseFloat(bgBlurStyle.height);
  let top = parseFloat(ulStyle.top);
  let height = parseFloat(ulStyle.height);

  ulOfLrcRef.value.style.transform = "translateY(" +
    Math.min(bgHight / 2, Math.max(top + e.deltaY, -height + bgHight / 2)) +
    "px)";
};
const onMoveover = (e: MouseEvent) => {
  bgBlurRef.value.addEventListener("mousewheel", onWheel);
};
const onMoveout = (e: MouseEvent) => {
  bgBlurRef.value.removeEventListener("mousewheel", onWheel);
};

let lis: HTMLLIElement[];
let old: number = 0
let interval: any = null
const { lyricInfo } = storeToRefs(musicStore)
const isBetween = (a: number, left: number, right: number) => {
  return a >= left && a < right
}
const getCurrentLrcIndex = (crt: number, times: number[]) => {
  // for (let i = 0; i < times.length; i++) {
  //   if (i + 1 == times.length || isBetween(crt, times[i], times[i + 1])) {
  //     lyricInfo.value.currentIndex = i
  //     return i
  //   }
  // }
  let t = 0
  let index = lyricInfo.value.currentIndex

  if (index + 1 < times.length && isBetween(crt, times[index], times[index + 1])) {
    return index
  } else if (index + 2 < times.length && isBetween(crt, times[index + 1], times[index + 2])) {
    return ++lyricInfo.value.currentIndex
  }
  else {
    for (let i = 0; i < times.length; i++) {
      if (i + 1 == times.length || isBetween(crt, times[i], times[i + 1])) {
        lyricInfo.value.currentIndex = i
        return i
      }
    }
    return index
  }
}


const { currentLrcIndex, playingId } = storeToRefs(musicStore)
onMounted(async () => {
  await musicStore.setLyric()

  bgBlurRef.value.addEventListener("mouseover", onMoveover);
  bgBlurRef.value.addEventListener("mouseout", onMoveout);
  lis = document.querySelectorAll(".lyricli") as any;
  let heights: number[] = []


  watch(currentLrcIndex, (newVal, oldVal) => {
    if (!(bgBlurRef.value instanceof Element)) return;
    const bgBlurStyle = window.getComputedStyle(bgBlurRef.value);
    if (heights.length == 0) {
      for (let i = 0; i < lis.length; i++) {
        heights[i] = parseFloat(getComputedStyle(lis[i]).height)
      }
    }
    let curentHavingSeeingItems = heights.slice(0, currentLrcIndex.value)
    if (curentHavingSeeingItems.length !== 0 && curentHavingSeeingItems) {
      lyricInfo.value.currentHeight = currentLrcIndex.value * 10 + 40 + heights.slice(0, currentLrcIndex.value).reduce(function (prev, curr, idx, arr) {
        return prev + curr;
      });
    }
    let bgHight = parseFloat(bgBlurStyle.height);
    if (!(lis.length === 0 || newVal >= lis.length)) {
      lis = document.querySelectorAll(".lyricli") as unknown as HTMLLIElement[]
      lis[oldVal || 0].classList.remove("is-active")
      lis[newVal].classList.add("is-active")

    }
    ulOfLrcRef.value.style.transform = "translateY(" + (bgHight / 2 - lyricInfo.value.currentHeight) + "px)"

  });

  interval = setInterval(() => {
    if (musicStore.getLyric.length === 0) return
    if (musicStore.getLyric[currentLrcIndex.value] === undefined) return
    let crt = musicStore.playing.currentTime
    currentLrcIndex.value = getCurrentLrcIndex(crt, musicStore.lyricInfo.times)
    old = musicStore.playing.currentTime
  }
  )

})
watch(playingId, () => {
  lis = document.querySelectorAll(".lyricli") as unknown as HTMLLIElement[]
})
onUnmounted(() => {
  clearInterval(interval)
})



// 歌词样式
const { lrcStyle } = storeToRefs(configStore)
const controlFontSize = (isExt: boolean) => {
  const fontSize = parseInt(lrcStyle.value.fontSize)
  if (isExt) {
    if (fontSize >= 40) return;
    lrcStyle.value.fontSize = fontSize + 1 + "px"
  } else {
    if (fontSize <= 12) return;
    lrcStyle.value.fontSize = fontSize - 1 + "px"
  }
};

const showColorSelector = ref(false)
const showActiveColorSelector = ref(false)
const setFontColor = () => {
  // lrcStyle.value.color = lrcStyle.value.color !== "rgba(204, 204, 204, 0.897)"
  //   ? "rgba(204, 204, 204, 0.897)"
  //   : "rgba(20, 20, 20, 0.897)";
  showColorSelector.value = !showColorSelector.value

};
const setActiveFontColor = () => {
  // lrcStyle.value.color = lrcStyle.value.color !== "rgba(204, 204, 204, 0.897)"
  //   ? "rgba(204, 204, 204, 0.897)"
  //   : "rgba(20, 20, 20, 0.897)";
  showActiveColorSelector.value = !showActiveColorSelector.value

};
const fontColorChange = (e: Event) => {
  // lrcStyle.value.color = (e?.target as HTMLInputElement).value
  showColorSelector.value = false
}
const fontColorInput = (e: Event) => {
  lrcStyle.value.color = (e?.target as HTMLInputElement).value
  // showColorSelector.value = false}
}
const fontActiveColorChange = (e: Event) => {
  showActiveColorSelector
    .value = false

}
const fontActiveColorInput = (e: Event) => {
  document.styleSheets[10].deleteRule(8)
  document.styleSheets[10].insertRule(`.bg ul .is-active{transition: all 0.5s;color: ${(e?.target as HTMLInputElement).value}!important;font-weight: bolder;transform: scale(1.3)}`, 8)


}
</script>
<template>
  <div class="bg" ref="bgBlurRef">
    <div class="control">
      <button @click="controlFontSize(false)">
        <svg t="1668145494406" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3044" width="12" height="12">
          <path
            d="M639.93728 846.704l-272-704-0.112 0.032A47.888 47.888 0 0 0 323.16928 112a47.92 47.92 0 0 0-44.672 30.736l-0.096-0.032-272 704 0.112 0.048A47.216 47.216 0 0 0 3.16928 864a47.92 47.92 0 1 0 92.672 17.264l0.112 0.032L158.27328 720h329.808l62.32 161.296 0.096-0.032A47.92 47.92 0 0 0 643.16928 864c0-6.112-1.248-11.888-3.328-17.264l0.096-0.032zM195.36128 624L323.16928 293.184 450.97728 624H195.36128zM979.16928 464H691.16928a48 48 0 1 0 0 96h288a48 48 0 1 0 0-96z"
            fill="#fff" p-id="3045"></path>
        </svg>
      </button>
      <button @click="controlFontSize(true)"><svg t="1668145470635" class="icon" viewBox="0 0 1027 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2837" width="12" height="12">
          <path
            d="M639.93728 846.704l-272-704-0.096 0.032A47.904 47.904 0 0 0 323.16928 112a47.92 47.92 0 0 0-44.672 30.736l-0.112-0.032-272 704 0.112 0.048C4.41728 852.112 3.16928 857.904 3.16928 864a47.92 47.92 0 1 0 92.672 17.264l0.112 0.032L158.25728 720h329.808l62.32 161.296 0.112-0.032A47.92 47.92 0 0 0 643.16928 864c0-6.112-1.248-11.888-3.328-17.264l0.096-0.032zM195.36128 624L323.16928 293.184 450.97728 624H195.36128zM979.16928 464h-96v-96a48 48 0 1 0-96 0v96h-96a48 48 0 1 0 0 96h96v96a48 48 0 1 0 96 0v-96h96a48 48 0 1 0 0-96z"
            p-id="2838" fill="#ffffff"></path>
        </svg></button>
      <button @click="setFontColor"><svg t="1668145695142" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="3494" width="12" height="12">
          <path
            d="M960 859.428571H64c-5.028571 0-9.142857 4.114286-9.142857 9.142858v91.428571c0 5.028571 4.114286 9.142857 9.142857 9.142857h896c5.028571 0 9.142857-4.114286 9.142857-9.142857v-91.428571c0-5.028571-4.114286-9.142857-9.142857-9.142858z m-743.2-91.428571h97.142857c4.8 0 9.142857-3.085714 10.628572-7.771429l61.371428-189.714285h250.514286l60.8 189.714285c1.485714 4.571429 5.714286 7.771429 10.628571 7.771429h101.828572c1.257143 0 2.514286-0.228571 3.657143-0.571429a11.085714 11.085714 0 0 0 6.857142-14.171428L582.4 62.4a11.314286 11.314286 0 0 0-10.514286-7.542857H454.971429c-4.8 0-9.028571 2.971429-10.514286 7.542857L206.285714 753.257143c-0.457143 1.142857-0.571429 2.4-0.571428 3.657143-0.114286 6.057143 4.914286 11.085714 11.085714 11.085714z m292.457143-589.828571h4.685714l95.771429 301.485714H412.457143l96.8-301.485714z"
            p-id="3495" fill="#ffffff"></path>
        </svg></button>
      <input v-show="showColorSelector" @input="fontColorInput" @change="fontColorChange" type="color" name=""
        :value="lrcStyle.color" id="">
      <button @click="setActiveFontColor">

        <svg t="1668145695142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="3494" width="12" height="12">
          <path
            d="M960 859.428571H64c-5.028571 0-9.142857 4.114286-9.142857 9.142858v91.428571c0 5.028571 4.114286 9.142857 9.142857 9.142857h896c5.028571 0 9.142857-4.114286 9.142857-9.142857v-91.428571c0-5.028571-4.114286-9.142857-9.142857-9.142858z m-743.2-91.428571h97.142857c4.8 0 9.142857-3.085714 10.628572-7.771429l61.371428-189.714285h250.514286l60.8 189.714285c1.485714 4.571429 5.714286 7.771429 10.628571 7.771429h101.828572c1.257143 0 2.514286-0.228571 3.657143-0.571429a11.085714 11.085714 0 0 0 6.857142-14.171428L582.4 62.4a11.314286 11.314286 0 0 0-10.514286-7.542857H454.971429c-4.8 0-9.028571 2.971429-10.514286 7.542857L206.285714 753.257143c-0.457143 1.142857-0.571429 2.4-0.571428 3.657143-0.114286 6.057143 4.914286 11.085714 11.085714 11.085714z m292.457143-589.828571h4.685714l95.771429 301.485714H412.457143l96.8-301.485714z"
            p-id="3495" fill="#ffffff"></path>
        </svg></button>
      <input v-show="showActiveColorSelector" @input="fontActiveColorInput" @change="fontActiveColorChange" type="color"
        name="" :value="lrcStyle.color" id="">
    </div>
    <ul ref="ulOfLrcRef" class="lyricall">
      <li :style="lrcStyle">
        {{ musicStore.playing.name + " " + musicStore.playing.au }}
      </li>
      <li class="lyricli" v-for="(item, index) in musicStore.getLyric" :style="lrcStyle" :key="String(item[0]) + index">
        {{ item[1] }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.bg {

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
      width: 23px;
      height: 23px;
      aspect-ratio: 1/1;
      background-color: rgb(77, 77, 77);
      border-radius: 50%;
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
    transition: all 1s;



    li {
      color: rgba(204, 204, 204, 0.897);
      font-size: 14px;
      margin: 10px 0;
      word-spacing: 2px;
      font-family: youyuan;
      text-align: center;
    }

    li:first-child {
      font-size: 18px;
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


::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}
</style>
