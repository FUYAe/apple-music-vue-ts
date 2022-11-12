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
  <div @mousedown="getBlur" ref="containerRef" class="container-w">
    <div ref="dragElement" class="drag-bar">
      <!-- 图标 -->
      <div class="w-out" @mousedown.stop="" @click="out"><svg t="1668154156579" class="icon" viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14016" width="8" height="8">
          <path
            d="M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z"
            p-id="14017" fill="#333"></path>
        </svg></div>
      <div class="w-narrow" @mousedown.stop="" @click="narrow"><svg t="1668154811434" class="icon"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16430" width="8" height="8">
          <path
            d="M891.733333 554.666667H132.266667a4.266667 4.266667 0 0 1-4.266667-4.266667v-76.8a4.266667 4.266667 0 0 1 4.266667-4.266667h759.466666a4.266667 4.266667 0 0 1 4.266667 4.266667v76.8a4.266667 4.266667 0 0 1-4.266667 4.266667z"
            p-id="16431" fill="#333"></path>
        </svg></div>
      <div class="w-ext" @mousedown.stop="" @click="ext"></div>
    </div>
    <div class="content-w" ref="contentRef">
      <slot> 默认内容 </slot>
      <div class="to-out" v-if="isExt" @click="toOutExt"><svg t="1668146077196" class="icon" viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4297" width="12" height="12">
          <path
            d="M832 0a192 192 0 0 1 192 192v640a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192v-112.576l56.256 56.256c20.544 20.544 45.12 35.2 71.744 44.608V832a64 64 0 0 0 64 64h640c35.392 0 64-28.608 64-64V192a64 64 0 0 0-64-64H192C156.672 128 128 156.672 128 192v11.648c-26.56 9.408-51.136 24-71.744 44.544L0 304.448V192a192 192 0 0 1 192-192h640zM216.512 324.8A64.042667 64.042667 0 0 1 256 383.936V448h192a64 64 0 0 1 64 64c0 35.392-28.608 64-64 64h-192v63.936c0 25.856-15.616 49.28-39.488 59.136a64.213333 64.213333 0 0 1-69.76-13.888l-128-128A63.829333 63.829333 0 0 1 0 511.936c0-16.384 6.272-32.768 18.752-45.248l128-128a64.106667 64.106667 0 0 1 69.76-13.888z"
            p-id="4298" fill="#ffffff"></path>
        </svg></div>
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
const emits = defineEmits(["out", "narrow", "ext"]);
const store = useStore();
const out = () => {
  console.log('emits("out")', emits("out"))
};
const contentRef = ref({} as HTMLDivElement)
const beforeLocation = reactive({
  left: "0",
  top: "0",
  width: "0",
  height: "0",
});
const props = defineProps<{
  width?: string, height?: string, controlbtn?: boolean,
  locksize?: boolean
}>()
const isExt = ref(false);
const ext = () => {
  emits("ext");
  if (props.controlbtn) return
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
  emits("narrow")
  if (props.controlbtn) return
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
  if (props.height && props.width) {
    containerRef.value.style.width = props.width
    containerRef.value.style.height = parseInt(props.height) + 30 + "px"
  }
  getBlur()
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
  console.log('props.locksize', props.locksize)
  if (!props.locksize) {
    resizeOnEdge(".edge-right", "width");
    resizeOnEdge(".edge-left", "width");
    resizeOnEdge(".edge-top", "height");
    resizeOnEdge(".edge-bottom", "height");
    resizeOnCorner(".corner-rb");
    resizeOnCorner(".corner-rt");
    resizeOnCorner(".corner-lt");
    resizeOnCorner(".corner-lb");
  }
});
</script>
<script  lang="ts">
export default {
  name: "Window"
}
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

  .icon {
    display: none;
    vertical-align: top;
    margin: 2px 1.5px;
  }

  >div:hover {
    .icon {
      display: block;
    }
  }

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
    padding: 2px;
    background-color: #d8dadb8e;
  }

  .to-out:hover {
    background-color: #d8dadb;
  }
}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
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
  height: 6px;
  bottom: -2px;
}

.edge-top {
  width: 100%;
  height: 6px;
  top: -2px;
}

.edge-top:hover,
.edge-bottom:hover {
  cursor: row-resize;
}

.edge-left {
  height: 100%;
  width: 6px;
  left: -2px;
  top: 0;
}

.edge-right {
  height: 100%;
  width: 6px;
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


.w-narrow {
  left: 37px;
  background-color: #febc2e;
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
