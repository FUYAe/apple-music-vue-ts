<script setup lang="ts">
import { useMusicStore } from "@/store";
import { onMounted, ref, watchEffect, WatchStopHandle } from "vue";
const props = defineProps<{
  width?: string;
  height?: string;
  loc?: number;
  slider?: {
    backgroudColor?: string;
    margin?: string;
    height?: string;
    width?: string;
    border?: string;
    borderRadius?: string;
  };
  bar?: {
    backgroudColor?: string;
    margin?: string;
    height?: string;
    width?: string;
    border?: string;
    borderRadius?: string;
  };
}>();
const emit = defineEmits(["progressChanged"]);
const musicStore = useMusicStore();
let length = ref(props.width || "200px");
let sliderloc = ref(props.loc || 0);
const slider = ref({} as HTMLDivElement);
const wapper = ref({} as HTMLDivElement);
const sliderleft = ref({} as HTMLDivElement);
let wacthstop = {} as WatchStopHandle;

const setProgress = (e: MouseEvent) => {
  let start = wapper.value.getBoundingClientRect().left;
  let newLeft = Math.min(
    parseFloat(length.value as string) - 6,
    Math.max(0, e.clientX - start)
  );
  slider.value.style.marginLeft = `${newLeft}px`;
  sliderleft.value.style.width = `${newLeft}px`;
  sliderloc.value = (newLeft / parseFloat(length.value as string)) * 100;
};
const onMousedown = (e: MouseEvent) => {
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("mouseup", onMouseup);
};
const onMousemove = (e: MouseEvent) => {
  // wacthstop && wacthstop();
  setProgress(e);
  if (!musicStore.playing.musicSrc) return;
  emit("progressChanged", sliderloc.value);
};
const onMouseup = () => {
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("mouseup", onMouseup);
  emit("progressChanged", sliderloc.value, false);
};
const addWatch = () => {
  wacthstop = watchEffect(() => {
    sliderloc.value = props.loc as number;
    slider.value.style.marginLeft = (props.loc || sliderloc.value) + "%";
    sliderleft.value.style.width = (props.loc || sliderloc.value) + "%";
  });
};
onMounted(() => {
  wapper.value.style.width = length.value;
  slider.value.addEventListener("mousedown", onMousedown);
  addWatch();
});
const clickOnBar = (e: MouseEvent) => {
  // slider.value
  const event = new Event("mousedown");
  slider.value.dispatchEvent(event);
  setProgress(e);
  if (!musicStore.playing.musicSrc) return;
  emit("progressChanged", sliderloc.value, false);
};
</script>
<template>
  <div class="wapper" ref="wapper">
    <div class="bar" @mousedown="clickOnBar" :style="props.bar || {}">
      <div class="slider" ref="slider" :style="props.slider || {}"></div>
      <div class="slider-left" ref="sliderleft"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "ProgressBar",
};
</script>
<style lang="scss" scoped>
div {
  box-sizing: border-box;
}

.wapper {
  width: 200px;
  height: 10px;
  //   background-color: antiquewhite;
  position: absolute;

  .bar {
    width: calc(100% - 8px);
    height: 2px;
    margin: 0 4px;
    background-color: rgba(43, 30, 30, 0.299);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    .slider {
      opacity: 0;
      position: absolute;
      z-index: 10;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgb(255, 255, 255);
      border: 0.1px solid rgba(0, 0, 0, 0.134);
      top: 50%;
      transform: translate(-50%, -50%);
      // transition: all 0.1s;
      // display: none;
    }

    .slider-left {
      position: absolute;
      background-color: rgba(60, 61, 63, 0.401);
      left: 0;
      height: 100%;
    }
  }
}

.wapper:hover .slider {
  opacity: 1;
}</style>
