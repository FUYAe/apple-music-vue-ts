<template>
  <div class="toplist">
    <div class="title">{{ props.title }}</div>
    <div class="content-box hot-play" ref="hotplay">
      <div v-if="!data.length" class="skeleton" style="background-color: rgb(130, 36, 36);"></div>
      <PlayCard v-for="(item, index) in data" :imgUrl="item?.al.picUrl" :name="item?.name" :ablumid="item?.al.id"
        @play="onPlay(index, data)" :au="item.ar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { getTopLists, getTop, getPlayList, get } from "@/axios/request";
import { onMounted, reactive, ref } from "vue";
const store = useStore();
const props = defineProps<{
  title: string,
  listId?: number,
  srcdata?: Song[]
}>()
const data = ref([] as Song[])

const onPlay = (index: number, data: any) => {
  store.setPlayalist(data);
  store.playMusicByClick(index);
};
const hotplay = ref({} as HTMLDivElement);


onMounted(async () => {
  data.value = props.listId ? (await getPlayList(props.listId, 0, 10)).data.songs : props.srcdata
  hotplay.value.addEventListener("mousedown", onMousedown);
});


const onMousedown = (e: MouseEvent) => {
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("mouseup", onMouseup);
};
let top = ref(0);
const onMousemove = (e: MouseEvent) => {
  // let top = hotplay.value.scrollTop;
  hotplay.value.scrollTo(
    (top.value = Math.min(
      hotplay.value.scrollWidth,
      Math.max(0, top.value - e.movementX)
    )),
    0
  );
};
const onMouseup = () => {
  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("mouseup", onMouseup);
};

</script>

<style lang="scss" scoped>
.toplist {
  margin-top: 16px;
}

.content-box {
  display: flex;
  justify-content: left
}

.title {
  text-align: left;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bolder;
}

.hot-play {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

}

::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.skeleton {
  height: 165px;

  border-radius: 20px;
}
</style>