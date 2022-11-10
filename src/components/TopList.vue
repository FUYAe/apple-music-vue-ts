<template>
  <div class="title">{{ props.title }}</div>
  <div class="content-box hot-play" ref="hotplay">
    <PlayCard v-for="(item, index) in data" :imgUrl="item?.al.picUrl" :name="item?.name" :ablumid="item?.al.id"
      @play="onPlay(index, data)" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { getTopLists, getTop, getPlayList, get } from "@/axios/request";
import { onMounted, reactive, ref } from "vue";
const store = useStore();
const props = defineProps<{
  title: string,
  listId: number
}>()
const data = ref([] as Song[])

const onPlay = (index: number, data: any) => {
  store.setPlayalist(data);
  store.playMusicByClick(index);
};
const hotplay = ref({} as HTMLDivElement);


onMounted(async () => {
  data.value = (await getPlayList(props.listId, 0, 10)).data.songs
  console.log('data.value', data.value)
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
.content-box {
  display: flex;
  justify-content: space-between;
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
</style>