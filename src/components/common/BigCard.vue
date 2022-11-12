<script setup lang="ts">
import { getSongsByArId } from "@/axios/request";
import { useStore } from "@/store";

import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const props = defineProps<{
  pic: string;
  name: string;
  arid: number;
}>();
const router = useRouter()
const store = useStore();
const paly1music = () => {
  getSongsByArId(props.arid).then((res) => {
    // console.log("res.data", res.data);
    store.setPlayalist(res.data.songs);
    store.playMusicByClick(Math.floor(Math.random() * res.data.songs.length));
  });
};
const gotoArInfo = () => {
  router.push({ name: "artist", query: { id: props.arid } })
}
</script>
<template>
  <div class="m-card" @click="gotoArInfo">
    <div class="img">
      <div class="when-hover">
        <div class="card-play-btn">
          <img @click.stop="paly1music" src="./assets/play.png" alt="" srcset="" />
        </div>
        <div class="card-more-btn">
          <img src="./assets/more.png" alt="" srcset="" />
        </div>
      </div>
      <img :src="props.pic" alt="" srcset="" />
    </div>

    <div class="info">
      <h2>{{ props.name }}</h2>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "BigCard",
};
</script>
<style lang="scss" scoped>
$W: 160px;
$M: 10px;

.m-card {
  display: inline-block;
  width: $W;
  height: calc($W + 50px);
  margin: $M;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);

  .img:hover .when-hover {
    display: block;
  }

  .img {
    position: relative;
    width: $W;
    height: $W;
    background-color: #dedede6f;

    .when-hover {
      display: none;
      top: 0;
      left: 0;
      position: absolute;

      z-index: 10;
      width: $W;
      height: $W;
      background-color: rgba(0, 0, 0, 0.199);

      img {
        width: 16px;
        height: 16px;
      }

      div {
        padding: 4.5px;
        width: 25px;
        height: 25px;
        background-color: #dedede5d;
        position: absolute;
        bottom: 5px;
        border-radius: 50%;
      }

      div:hover {
        background-color: #fa233b;
      }

      .card-play-btn {
        left: 5px;
      }

      .card-more-btn {
        right: 5px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 5px 5px 0 0;
    }
  }

  .info {
    width: 100%;
    min-height: 50px;
    background-color: #dededeba;
    padding: 5px;

    h2 {
      margin: 0;
      padding-top: 10px;
    }
  }
}

.m-card:hover .when-hover {
  display: block;
}

.m-card:hover {
  background-color: #47464655;
}
</style>
