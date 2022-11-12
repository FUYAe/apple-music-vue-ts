<!--
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-23 09:10:17
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:52:29
 * @FilePath: \applemusic-vue3-ts\src\views\MainWindow.vue
 * @Description: 主窗口页
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import WindowHeader from "@/components/layout/Header.vue";
import WindowSider from "@/components/layout/Sider.vue";
import { useStore } from "@/store";
const mainContainerRef = ref<HTMLDivElement | null>(null);
const store = useStore();
function onDrag(e: MouseEvent) {
  const container = document.querySelector(".container") as HTMLDivElement;
  let oddStyle = window.getComputedStyle(container);
  let left = parseFloat(oddStyle.left);
  let right = parseFloat(oddStyle.right);
  let top = parseFloat(oddStyle.top);
  let sX = e.movementX;
  let sY = e.movementY;
  if (left <= -300 && sX < 0) {
    sX = 0;
  }
  if (right <= -1200 && sX > 0) {
    sX = 0;
  }
  container.style.left = `${Math.max(-400, left + sX)}px`;
  container.style.top = `${Math.max(300, top + sY)}px`;
}
function onMousedown() {
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", onMouseup);
}
function onMouseup() {
  document.removeEventListener("mousemove", onDrag);
}


const makeitMove = () => {
  const dragElement = document.querySelector(".drag-bar") as HTMLDivElement;
  dragElement.addEventListener("mousedown", onMousedown);
};
const clearListener = () => {
  document.removeEventListener("mouseup", onMouseup);
  document.removeEventListener("mousedown", onMousedown);
  document.removeEventListener("mouseup", onMouseup);
};
onMounted(() => {
  makeitMove();
});
onUnmounted(() => {
  clearListener();
});
const getBlur = () => {
  mainContainerRef.value!.style.zIndex = String(++store.currentZIndex);
};
</script>

<template>
  <div ref="mainContainerRef" @mousedown="getBlur" class="container">
    <div class="drag-bar"></div>
    <WindowSider />
    <div class="content-box">
      <WindowHeader />
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive :include="['NowListening']">
            <component v-if="$route.meta.isCache" :is="Component" />
          </keep-alive>
          <component v-if="!$route.meta.isCache" :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 1000px;
  height: 600px;
  border-radius: 10px;
  border: 0.2px solid #dedede;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .drag-bar {
    position: absolute;
    height: 20px;
    width: 100%;
    top: 0;
    z-index: 2;
    // background-color: bisque;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .content-box {
    position: absolute;
    top: 0;
    left: 200px;
    // z-index: 3;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: inline-block;
    width: 800px;
    height: 100%;
    background-color: rgb(255, 255, 255);

    .main-content {
      width: 720px;
      height: 510px;
      margin: 5px 40px 20px 40px;
      position: relative;
      overflow-y: auto;
    }

    .main-content::-webkit-scrollbar {
      width: 0px;
    }
  }
}

@media (max-height: 600px) {
  .container {
    top: 300px;
    transform: translateY(0%, 0);
  }
}

@media (max-width: 1000px) {
  .container {
    left: 500px;
    transform: translateX(0%, 0);
  }
}
</style>
