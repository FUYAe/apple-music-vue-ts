
<script setup lang="ts">
import { onMounted, Teleport, ref } from "vue"
const props = defineProps<{
  location: {
    x: number
    y: number
  },
  menus: {
    title: string
    onClick: (event: MouseEvent) => void
  }[]
}>()

const hoverMenuRef = ref({} as HTMLDivElement)
onMounted(() => {
  hoverMenuRef.value.style.left = props.location.x - 60 + "px"
  hoverMenuRef.value.style.top = props.location.y + 10 + "px"

})
</script>
<template>
  <div ref="hoverMenuRef" class="hover-menu">
    <div class="title"></div>
    <template v-for="item in props.menus">


      <button class="menu-btn" @click="item.onClick">
        {{ item.title }}
      </button>
      <div class="span"></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.hover-menu {
  position: absolute;
  width: 120px;
  display: grid;
  grid-template-rows: auto;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 12px 4px;
  z-index: 10000;
  opacity: 0.8;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);

  .title {
    border-bottom: 0.5px solid #666;
  }

  .span {
    border-bottom: 0.5px solid #666;
  }

  .menu-btn {
    display: block;
    width: 100%;

    text-align: left;
    padding: 3px 6px;
  }

  .menu-btn:active {
    background-color: #1e1e1e;
    opacity: 0.9;
    transform: scale(0.96);
  }

  .menu-btn:hover {
    background-color: #1e1e1e;
    opacity: 0.9;

  }
}
</style>