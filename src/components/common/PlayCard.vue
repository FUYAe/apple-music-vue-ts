<script setup lang="ts">
import { useMusicStore, usePersistStore } from "@/store";
import { defineEmits, onMounted, ref, triggerRef } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { useOnlyChangedOnceRef } from "@/utils";
import { useRouter } from "vue-router";
import Image from "@/plugin/components/Image.vue";
import { showHoverMenu, showPrompt, showFollowMenu } from "@/plugin";
const router = useRouter();
const loadingImg = useOnlyChangedOnceRef(false);
const props = defineProps<{
  imgUrl: string;
  name: string;
  ablumid: number;
  au: {
    id: string,
    name: string
  }[],
  song?: any
}>();
const emits = defineEmits(["play"]);
const musicStore = useMusicStore();
const persistStore = usePersistStore();
const playMusic = () => {
  emits("play");
};

const btm = ref({} as HTMLDivElement);
onMounted(() => {
  useIntersectionObserver(btm, ([{ isIntersecting }], dom) => {
    if (isIntersecting) {
      loadingImg.value = true;
      triggerRef(loadingImg);
    }
  });
  // setInterval(() => {
  //   console.log("loadingImg.value", loadingImg.value);
  // }, 1000);
});
let to = false
const navigatorToAb = () => {
  if (!to) return
  router.push({
    name: "ablum",
    query: {
      id: props.ablumid,
    },
  });
};
const navigatorToAbUp = () => {

};
const navigatorToAbOn = () => {
  to = true
  setTimeout(() => {
    to = false
  }, 300)

};
const showMore = (e: MouseEvent) => {
  showHoverMenu(e.currentTarget as Element,
    {
      location: {
        x: e.x,
        y: e.y
      },
      menus: [{
        title: "收藏歌曲", onClick: (e: MouseEvent) => {
          persistStore.addCollection(props.song).then(res => {
            showPrompt({
              msg: res.msg
            })
          }).catch(err => {
            showPrompt({
              msg: err.msg,
              type: "err"
            })
          })
        }
      }, {
        title: "下一首播放", onClick: (e: MouseEvent) => {

          musicStore.playQueue.splice(musicStore.playing.index + 1, 0, props.song)

        }
      }]
    }
  )
  // showFollowMenu(
  //   e.currentTarget as any,
  //   {
  //     menus: [{
  //       title: "收藏歌曲", onClick: (e: MouseEvent) => {
  //         persistStore.addCollection(props.song).then(res => {
  //           showPrompt({
  //             msg: res.msg
  //           })
  //         }).catch(err => {
  //           showPrompt({
  //             msg: err.msg,
  //             type: "err"
  //           })
  //         })
  //       }
  //     }, {
  //       title: "下一首播放", onClick: (e: MouseEvent) => {

  //         musicStore.playQueue.splice(musicStore.playing.index + 1, 0, props.song)

  //       }
  //     }]
  //   }
  // )
}
</script>
<template>
  <div class="m-card" @mousedown="navigatorToAbOn" @mouseup="navigatorToAbUp" @click="navigatorToAb">
    <div class="img" ref="btm">
      <div class="when-hover">
        <button @click.stop="playMusic()" class="card-play-btn">
          <img draggable="false" src="./assets/play.png" alt="" srcset="" />
        </button>
        <button @click.stop="showMore" class="card-more-btn">
          <img draggable="false" src="./assets/more.png" alt="" srcset="" />
        </button>
      </div>
      <Image draggable="false" :src="loadingImg ? imgUrl : ''" alt="" srcset="" />
    </div>

    <div class="info">
      <p class="info1">{{ name }}</p>
      <p class="info2">
        <AuName class="au" v-for="i in au" :id="i.id">{{ i.name }}</AuName>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PlayCard",
  components: { Image }
};
</script>
<style lang="scss" scoped>
$W: 125px;
$M: 10px;
// $W:180px;

.m-card {
  display: inline-block;
  width: $W;
  height: calc($W + 40px);
  // background-color: aqua;
  margin: $M;
  box-sizing: border-box;

  .img:hover .when-hover {
    display: block;
  }

  .img {
    position: relative;

    width: $W;
    height: $W;
    border-radius: 5px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
    background-color: #dedede;

    // padding-bottom: 100%;
    // box-sizing: content-box;
    .when-hover {
      display: none;
      top: 0;
      left: 0;
      position: absolute;
      border-radius: 5px;
      z-index: 10;
      width: $W;
      height: $W;
      background-color: rgba(0, 0, 0, 0.199);
      // padding: 10px;

      img {
        width: 15px;
        height: 15px;
      }

      div,
      button {
        padding: 4.5px;
        width: 25px;
        height: 25px;
        background-color: #dedede5d;
        position: absolute;
        bottom: 5px;
        border-radius: 50%;
      }

      button:hover {
        background-color: #fa233b;

      }

      button:active {
        transform: scale(0.9);

      }

      .card-play-btn {
        display: block;
        outline: none;
        left: 5px;
      }

      .card-more-btn {
        display: block;
        outline: none;
        right: 5px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 5px;
    }
  }

  .info {
    width: 100%;
    height: 20px;

    .info1 {
      text-align: left;
      font-size: 12px;
      margin: 0;
      padding-left: 2px;
      font-weight: 500;
      color: rgb(2, 2, 2);
    }

    .info2 {
      text-align: left;
      font-size: 12px;
      margin: 0;
      color: rgb(85, 85, 85);
      padding-left: 2px;
      font-weight: 500;

      .au {
        color: rgb(85, 85, 85);
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
}

.m-card:hover .when-hover {
  display: block;
}
</style>
