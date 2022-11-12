<script setup lang="ts">
import { useStore, usePersistStore } from "@/store";
import { getTopLists, getTop, getPlayList, get } from "@/axios/request";
import { onMounted, reactive, ref } from "vue";
import TopList from "@/components/TopList.vue";
const store = useStore();
const persistStore = usePersistStore()

function accessMusic() {
  getTopLists().then((res) => {
    data.topLists = res.data.list.slice(0, 4);
  });
}

const data = reactive({
  topLists: [] as any[],
});

onMounted(async () => {
  accessMusic();
  const res = await getTop("artists", 0, 4);
  store.bigCard = res.data.artists;

});


</script>
<template>
  <div class="container-listening">
    <div class="title">现在就听</div>
    <div class="content-box now-listening">
      <BigCard v-for="item in store.bigCard" :pic="item.img1v1Url" :name="item.name" :arid="item.id"></BigCard>
    </div>
    <TopList title="最近播放" :srcdata="persistStore.recents" v-if="persistStore.recents.length"></TopList>
    <template v-for="(list, outIndex) in data.topLists">
      <TopList :title="list.name" :listId="list.id" />
    </template>

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
