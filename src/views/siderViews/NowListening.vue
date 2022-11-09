<script setup lang="ts">
import { useStore } from "@/store";
import { getTopLists, getTop, getPlayList, get } from "@/axios/request";
import { onMounted, reactive, ref } from "vue";

const store = useStore();
function accessMusic() {
  getPlayList(19723756, 0, 10).then((res) => {
    data.hots = res.data.songs;
  });
  getTopLists().then((res) => {
    data.topLists = res.data.list.slice(1, 4);
    data.topLists.forEach((item) => {
      getMusicList(item.id);
    });
  });
}

const data = reactive({
  list: [] as any[],
  hots: [] as any[],
  recents: [] as any[],
  topLists: [] as any[],
  topListsSongs: [] as any[],
});
let top = ref(0);
const hotplay = ref({} as HTMLDivElement);
onMounted(async () => {
  accessMusic();
  const res = await getTop("artists", 0, 4);
  store.bigCard = res.data.artists;
  hotplay.value.addEventListener("mousedown", onMousedown);
});
const onMousedown = (e: MouseEvent) => {
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("mouseup", onMouseup);
};
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

const onPlay = (index: number, data: any) => {

  store.playList = data;
  store.playMusicByClick(index);
};
const getMusicList = (id: number) => {
  getPlayList(id, 0, 5).then((res) => {
    data.topListsSongs.push(res.data.songs);
  });
};
</script>
<template>
  <div class="container-listening">
    <div class="title">现在就听</div>
    <div class="content-box now-listening">
      <BigCard v-for="item in store.bigCard" :pic="item.img1v1Url" :name="item.name" :arid="item.id"></BigCard>
    </div>

    <div class="title">热歌榜</div>
    <div class="content-box hot-play" ref="hotplay">
      <PlayCard v-for="(item, index) in data.hots" :imgUrl="item.al.picUrl" :name="item.name" :ablumid="item.al.id"
        @play="onPlay(index, data.hots)" />
    </div>
    <template v-for="(list, outIndex) in data.topLists">
      <div class="title">{{ list.name }}</div>
      <div class="content-box hot-play" :ref="'list' + outIndex">
        <PlayCard v-for="(item, index) in data.topListsSongs[outIndex]" :imgUrl="item.al.picUrl" :name="item.name"
          :ablumid="item.al.id" @play="onPlay(index, data.topListsSongs[outIndex])" />
      </div>
    </template>

    <!-- <div class="title">电台专属推荐</div>
    <div class="content-box radio-recommend">
      <BigCard v-for="item in "></BigCard>
    </div>

    <div class="title">最新发布</div>
    <div class="content-box recent-publish">
      <PlayCard v-for="item in index + 4"></PlayCard>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.container-listening {
  width: 100%;
  min-height: calc(100% - 50px);
  box-sizing: border-box;
  position: relative;

  .title {
    text-align: left;
    padding-left: 10px;
    font-size: 18px;
    font-weight: bolder;
  }

  .content-box {
    display: flex;
    justify-content: space-between;
  }

  .now-listening {
    width: 100%;
    overflow: hidden;
    text-align: left;
  }

  .hot-play {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    >div {
      // // flex: 1 0 auto;
      // width: 0;
    }
  }

  ::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }
}
</style>
