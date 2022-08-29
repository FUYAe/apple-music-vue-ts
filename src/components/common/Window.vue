<!--
 * @Author: fuya 2956903402@qq.com
 * @Date: 2022-08-27 18:32:15
 * @LastEditors: fuya 2956903402@qq.com
 * @LastEditTime: 2022-08-29 20:41:22
 * @FilePath: \applemusic-vue3-ts\src\views\Window.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by fuya 2956903402@qq.com, All Rights Reserved. 
-->
<template>
  <div @click="getBlur" ref="containerRef" class="container-w">
    <div ref="dragElement" class="drag-bar">
      <!-- 图标 -->
      <div class="w-out" @click="out"></div>
      <div class="w-narrow" @click="narrow"></div>
      <div class="w-ext" @click="ext"></div>
    </div>
    <div class="content-w">
      <slot> 默认内容 </slot>
      <div class="to-out" v-if="isExt" @click="toOutExt"></div>
    </div>
    <!-- box四条边可拖动区域 -->
    <div class="edge edge-top"></div>
    <div class="edge edge-bottom"></div>
    <div class="edge edge-right"></div>
    <div class="edge edge-left"></div>
    <!-- box四角可拖动区域 -->
    <div class="corner corner-lt"></div>
    <div class="corner corner-lb"></div>
    <div class="corner corner-rt"></div>
    <div class="corner corner-rb"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, defineEmits, reactive } from "vue";
import { useStore } from "@/store";
const emits = defineEmits(["out"]);
const store = useStore();
const out = () => {
  emits("out");
};
const beforeLocation = reactive({
  left: "0",
  top: "0",
  width: "0",
  height: "0",
});
const isExt = ref(false);
const ext = () => {
  const containStyle = window.getComputedStyle(containerRef.value);
  beforeLocation.height = containStyle.height;
  beforeLocation.width = containStyle.width;
  beforeLocation.top = containStyle.top;
  beforeLocation.left = containStyle.left;
  containerRef.value.style.width = window.innerWidth + "px";
  containerRef.value.style.height = window.innerHeight + 30 + "px";
  containerRef.value.style.left = 0 + "px";
  containerRef.value.style.top = -30 + "px";
  isExt.value = true;
};
const toOutExt = () => {
  const { left, top, width, height } = beforeLocation;
  if (width == "0") return;
  isExt.value = false;
  containerRef.value.style.width = width;
  containerRef.value.style.height = height;
  containerRef.value.style.left = left;
  containerRef.value.style.top = top;
};
const narrow = () => {
  containerRef.value.style.width = 200 + "px";
  containerRef.value.style.height = 400 + "px";
};
const containerRef = ref({} as HTMLDivElement);
const dragElement = ref({} as HTMLDivElement);
const getBlur = () => {
  if (!containerRef.value) return;
  containerRef.value.style.zIndex = String(++store.currentZIndex);
};
onMounted(() => {
  let onMove = false;
  let offsetX: any;
  let offsetY: any;
  let widthleft = 100;
  let heightleft = 1000;

  let oddStyle = window.getComputedStyle(containerRef.value);
  dragElement.value.addEventListener("mousedown", onMouseDown);

  function onMouseDown(e: MouseEvent) {
    onMove = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e: MouseEvent) {
    if (onMove) {
      let boxWidth = parseFloat(oddStyle.width);
      let boxHeight = parseFloat(oddStyle.height);
      containerRef.value.style.left = `${Math.min(
        window.innerWidth - boxWidth + widthleft,
        Math.max(0 - widthleft, e.clientX - offsetX)
      )}px`;
      containerRef.value.style.top = `${Math.min(
        window.innerHeight - boxHeight + heightleft,
        Math.max(0, e.clientY - offsetY)
      )}px`;
    }
  }

  function onMouseUp() {
    onMove = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  // 通过四条边扩大缩小窗口

  function onResize(e: MouseEvent, edgeClass: any, moveAxis: any) {
    /**
     *
     *
     * @param {*} e
     * @param {*} edgeClass 监听的边
     * @param {*} moveAxis 影响的轴（width/height)
     */
    let oddStyle = window.getComputedStyle(containerRef.value);
    let moveDirect = parseFloat(oddStyle[moveAxis]);
    let left = parseFloat(oddStyle.left);
    let top = parseFloat(oddStyle.top);
    let limitX = 0;
    let limitY = 0;
    let movement = moveAxis == "width" ? e.clientX - left : e.clientY - top;
    if (edgeClass == ".edge-right" || edgeClass == ".edge-bottom") {
      // 使用Math.max限定范围
      containerRef.value.style[moveAxis] = `${Math.min(
        edgeClass == ".edge-right"
          ? window.innerWidth - left
          : window.innerHeight - top,
        Math.max(200, movement)
      )}px`;
    }
    if (edgeClass == ".edge-top" || edgeClass == ".edge-left") {
      let movement =
        moveAxis == "width"
          ? left - Math.max(limitX, e.clientX)
          : top - Math.max(limitY, e.clientY);
      containerRef.value.style[moveAxis] = `${Math.max(
        200,
        moveDirect + movement
      )}px`;
      if (moveAxis == "width") {
        containerRef.value.style.left = `${Math.max(limitX, e.clientX)}px`;
      } else if (moveAxis == "height") {
        containerRef.value.style.top = `${Math.max(limitY, e.clientY)}px`;
      }
    }
  }

  //使出口可以改变大小
  function resizeOnEdge(edgeClass: any, moveAxis: any) {
    // 中间函数传参数
    function fn(e: MouseEvent) {
      nextTick(() => {
        onResize(e, edgeClass, moveAxis);
      });
    }

    function clearListener() {
      document.removeEventListener("mousemove", fn);
      document.removeEventListener("mouseup", clearListener);
    }
    const target = document.querySelector(edgeClass);
    target.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", fn);
      document.addEventListener("mouseup", clearListener);
    });
  }

  resizeOnEdge(".edge-right", "width");
  resizeOnEdge(".edge-left", "width");
  resizeOnEdge(".edge-top", "height");
  resizeOnEdge(".edge-bottom", "height");

  // 通过四个角改变窗口大小
  function onResizeCorner(e: MouseEvent, cornerClass: string) {
    let left = parseFloat(oddStyle.left);
    let top = parseFloat(oddStyle.top);
    let width = parseFloat(oddStyle.width);
    let height = parseFloat(oddStyle.height);
    let limitX = 0;
    let limitY = 0;
    let mX = e.clientX - left;
    let mY = e.clientY - top;
    let mXIn = left - Math.max(limitX, e.clientX);
    let mYIn = top - Math.max(limitY, e.clientY);
    if (cornerClass == ".corner-rt") {
      containerRef.value.style.top = `${Math.max(limitY, e.clientY)}px`;
      containerRef.value.style.width = `${Math.max(200, mX)}px`;
      containerRef.value.style.height = `${Math.max(200, height + mYIn)}px`;
      return;
    }
    if (cornerClass == ".corner-lt") {
      containerRef.value.style.top = `${Math.max(limitX, e.clientY)}px`;
      containerRef.value.style.left = `${Math.max(limitX, e.clientX)}px`;
      containerRef.value.style.width = `${Math.max(200, width + mXIn)}px`;
      containerRef.value.style.height = `${Math.max(200, height + mYIn)}px`;

      return;
    }
    if (cornerClass == ".corner-lb") {
      containerRef.value.style.left = `${Math.max(limitX, e.clientX)}px`;
      containerRef.value.style.width = `${Math.max(200, width + mXIn)}px`;
      containerRef.value.style.height = `${Math.max(200, mY)}px`;

      return;
    }

    containerRef.value.style.width = `${Math.min(
      window.innerWidth - left,
      Math.max(200, mX)
    )}px`;
    containerRef.value.style.height = `${Math.min(
      window.innerHeight - top,
      Math.max(200, mY)
    )}px`;
  }

  function resizeOnCorner(cornerClass: any) {
    function fn(e: MouseEvent) {
      onResizeCorner(e, cornerClass);
    }

    function clearListener() {
      document.removeEventListener("mousemove", fn);
      document.removeEventListener("mouseup", clearListener);
    }
    const target = document.querySelector(cornerClass);
    target.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", fn);
      document.addEventListener("mouseup", clearListener);
    });
  }
  resizeOnCorner(".corner-rb");
  resizeOnCorner(".corner-rt");
  resizeOnCorner(".corner-lt");
  resizeOnCorner(".corner-lb");
});
</script>

<style lang="scss" scoped>
.container-w {
  height: 800px;
  width: 600px;
  position: fixed;
  overflow: hidden;
  border-radius: 10px;
}

.drag-bar {
  height: 30px;
  width: 100%;
  background-color: #d8dadb;
}

.content-w {
  height: calc(100% - 30px);
  width: 100%;
  background-color: #f1f3f4;
  position: absolute;
  top: 30px;
  left: 0;
  //   overflow-y: auto;
  .to-out {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 10px;
    top: 10px;
    background-color: #d8dadb8e;
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
h1 {
  margin: 0;
}
/* 四条边可拖动区域 */

.edge {
  //   display: inline-block;
  position: absolute;
  z-index: 10;
}

.edge-bottom {
  width: 100%;
  height: 4px;
  bottom: -2px;
}

.edge-top {
  width: 100%;
  height: 4px;
  top: -2px;
}

.edge-top:hover,
.edge-bottom:hover {
  cursor: row-resize;
}

.edge-left {
  height: 100%;
  width: 4px;
  left: -2px;
  top: 0;
}

.edge-right {
  height: 100%;
  width: 4px;
  right: -2px;
  top: 0;
}

.edge-left:hover,
.edge-right:hover {
  cursor: col-resize;
}
/* 四边角 */

.corner {
  display: inline-block;
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 11;
}

.corner:hover {
  cursor: move;
}

.corner-lt {
  top: -2px;
  left: -2px;
}

.corner-lb {
  bottom: -2px;
  left: -2px;
}

.corner-rt {
  top: -2px;
  right: -2px;
}

.corner-rb {
  bottom: -2px;
  right: -2px;
}

* {
  user-select: none;
}

.w-out,
.w-narrow,
.w-ext {
  position: absolute;
  display: inline-block;
  width: 11px;
  height: 11px;
  background-color: #9b9b9b;
  border-radius: 50px;
  top: 10px;
  box-shadow: 0 0 1px 0.3px rgba(0, 0, 0, 0.2);
}

.w-out {
  left: 18px;
  background-color: #ff5f57;
}

.w-out:hover:before {
  content: "";
  background-color: rgba(32, 28, 28, 0.782);
  position: absolute;
  top: 4.3px;
  left: 1.6px;
  width: 8px;
  height: 1.15px;
  transform: rotate(45deg);
}

.w-out:hover:after {
  content: "";
  background-color: rgba(32, 28, 28, 0.782);
  position: absolute;
  top: 4.7px;
  left: 1.6px;
  width: 8px;
  height: 1.15px;
  transform: rotate(-45deg);
}

.w-narrow {
  left: 37px;
  background-color: #febc2e;
}

.w-narrow:hover::before {
  content: "";
  background-color: rgba(32, 28, 28, 0.782);
  position: absolute;
  top: 5px;
  left: 1.4px;
  width: 8px;
  border-radius: 1px;
  height: 1.5px;
}

.w-ext {
  left: 56px;
  background-color: #29c940;
}

.w-ext:hover::before {
  content: "";
  background-color: #004e00;
  position: absolute;
  display: block;
  top: 2px;
  left: 1.8px;
  width: 7px;
  height: 7px;
  border-radius: 1px;
}

.w-ext:hover::after {
  content: "";
  background-color: #29c940;
  position: absolute;
  display: block;
  top: 4.5px;
  left: 0.8px;
  width: 10px;
  height: 2px;
  transform: rotate(-45deg);
}
</style>
