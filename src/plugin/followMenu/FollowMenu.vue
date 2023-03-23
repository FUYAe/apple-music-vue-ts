

<script setup lang="ts">
import { onMounted, Teleport, ref } from "vue"
const props = defineProps<{
  menus: {
    title: string
    onClick: (event: MouseEvent) => void
  }[]
}>()

const folowMenuRef = ref({} as HTMLDivElement)
onMounted(() => {

})
</script>
<template>
  <div ref="folowMenuRef" class="follow-menu">
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
.follow-menu {
  position: absolute;
  // float: left;
  width: 120px;
  right: 0;
  display: grid;
  grid-template-rows: auto;
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 12px 4px;
  z-index: 100000;
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