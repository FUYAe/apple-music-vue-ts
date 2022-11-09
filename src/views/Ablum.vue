<script setup lang="ts">
import { get } from "@/axios/request";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import MusicItemBrief from "@/components/common/MusicItemBrief.vue";
import Back from "@/components/common/Back.vue";
const route = useRoute();
const store = useStore();
const data = reactive({
  albumInfo: {} as any,
  songs: [] as any[],
  artist: {} as any,
});
onMounted(() => {
  let id = route.query.id;
  get("/album?id=" + id).then((res) => {
    data.songs = res.data.songs;
    data.albumInfo = res.data.album;
    data.artist = res.data.album.artist;
  });
});
const onPlay = (index: number, data: any) => {
  store.playList = data;
  store.playMusicByClick(index);
};
</script>
<template>
  <div class="album" v-show="data.albumInfo.picUrl">
    <Back></Back>
    <div class="info-bar">
      <img :src="data.albumInfo.picUrl" alt="" />
      <div class="info">
        <h2>{{ data.albumInfo.name }}</h2>
        <h3>{{ data.artist.name }}</h3>
      </div>
    </div>
    <div class="album-list">
      <MusicItemBrief
        v-for="(item, index) in data.songs"
        :name="item.name"
        :index="index + 1"
        :long="item.dt"
        @play="onPlay(index, data.songs)"
      ></MusicItemBrief>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.album {
  .info-bar {
    text-align: left;
    img {
      height: 200px;
      //   width: 10px;
      aspect-ratio: 1/1;
    }
    .info {
      display: inline-block;
      padding: 20px;
      vertical-align: top;
      width: calc(100% - 200px);
      height: 100%;
    }
  }
  .album-list {
    margin-top: 40px;
  }
}
</style>
