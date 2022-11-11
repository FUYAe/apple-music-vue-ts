<script setup lang="ts">
import Menu from "./inner/Menu.vue";
import { useStore } from "@/store"
const store = useStore()
</script>
<template>
  <div class="sider">
    <div class="header">
      <div class="w-out" @click="store.showMiniPlayer = true"></div>
      <div class="w-narrow" @click="store.showMiniPlayer = true"></div>
      <div class="w-ext"></div>
    </div>
    <Menu></Menu>
  </div>
</template>
<style lang="scss" scoped>
.sider {
  position: absolute;
  top: 0;
  left: 0px;
  display: inline-block;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 200px;
  height: 100%;
  background-color: #dededed0;

  .header {
    height: 50px;
    position: relative;

    // border-bottom: 0.2px solid #dedede;
    div {
      position: absolute;
      display: inline-block;
      width: 11px;
      height: 11px;
      background-color: #9b9b9b;
      border-radius: 50px;
      top: 18px;
      box-shadow: 0 0 1px 0.3px rgba(0, 0, 0, 0.2);
    }

    // div:hover {
    //     opacity: 0.5;
    // }

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
      // font-size: 12px;
      // font-weight: 600;
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
  }
}
</style>
