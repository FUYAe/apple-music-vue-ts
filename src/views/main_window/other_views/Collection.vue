<script setup lang="ts">
import { get } from "@/axios/request";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore, usePersistStore, useMusicStore } from "@/store";
import MusicItemBrief from "@/components/common/MusicItemBrief.vue";
import Back from "@/components/common/Back.vue";
import AuthorName from "@/plugin/components/AuthorName.vue";
import { showPrompt, showHoverMenu } from "@/plugin";
const route = useRoute();
const store = useStore();
const musicStore = useMusicStore();
const persistStore = usePersistStore();

const onPlay = (index: number, data: any) => {
  musicStore.setPlayQueue(data)
  musicStore.playMusicByClick(index);
};
const showMore = (e: MouseEvent, song: Song) => {
  showHoverMenu(
    {
      location: {
        x: e.x,
        y: e.y
      },
      menus: [{
        title: "删除", onClick: (e: MouseEvent) => {
          persistStore.collections.splice(persistStore.collections.indexOf(song), 1)
          showPrompt({
            msg: "删除成功"
          })
        }
      }, {
        title: "下一首播放", onClick: (e: MouseEvent) => {

          musicStore.playQueue.splice(musicStore.playing.index + 1, 0, song)

        }
      }]
    }
  )
}


</script>
<template>
  <div class="album">
    <Back></Back>
    <div class="info-bar">
      <img src="../../../assets/apple_music.png" alt="" />
      <div class="info">
        <h2>我的收藏</h2>
        <h3>

        </h3>
        <p>收藏的歌曲</p>
      </div>
    </div>
    <div class="album-list">
      <MusicItemBrief customMore @clickmore="(e) => { showMore(e, item) }" :song="item"
        v-for="(item, index) in persistStore.collections" :name="item.name" :index="index + 1" :long="item.dt"
        @play="onPlay(index, persistStore.collections)"></MusicItemBrief>
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
      padding: 20px 0 0 20px;
      vertical-align: top;
      width: calc(100% - 200px);
      height: 100%;

      .au-name {
        font-size: 16px;
      }

      p {
        margin-top: 10px;
        text-indent: 2em;
        height: 110px;
        font-size: 14px;
        overflow: scroll;


      }

      ::-webkit-scrollbar {
        display: none;
        /* Chrome Safari */
      }

    }
  }

  .album-list {
    margin-top: 40px;
  }
}
</style>
