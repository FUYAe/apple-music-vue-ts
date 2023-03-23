<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { getSearchR, getSearchSuggestions } from "@/axios/request";
import { useStore } from "@/store";
import { watch } from "vue";
import img_nowlistening from "@/assets/siderIcon/nowlistening.png"
import img_browse from "@/assets/siderIcon/browse.png"
import img_radar from "@/assets/siderIcon/outline-radar.png"
import img_recent from "@/assets/siderIcon/recent.png"
import img_microphone from "@/assets/siderIcon/microphone.png"
import img_note from "@/assets/siderIcon/note.png"
import img_smalllist from "@/assets/siderIcon/smalllist.png"
import img_viewlist from "@/assets/siderIcon/Viewlist.png"
const store = useStore();
const router = useRouter();
const navigateTo = (path: string) => {
  router.push({
    path,
  });
};
const menus = reactive([
  {
    title: "Apple Music",
    list: [
      { id: "nowtolisten", img: img_nowlistening, text: "现在就听", path: "/", disable: false, ckecked: true },
      { id: "browse", img: img_browse, text: "浏览", path: "/", disable: true, ckecked: false },
      { id: "radar", img: img_radar, text: "广播", path: "/", disable: true, ckecked: false },
    ]
  },
  {
    title: "资料库",
    list: [
      { id: "recent", img: img_recent, text: "最近添加", path: "/", disable: true, ckecked: false },
      { id: "microphone", img: img_microphone, text: "艺人", path: "/", disable: true, ckecked: false },
      { id: "note", img: img_note, text: "收藏", path: "/collection", disable: false, ckecked: false },
    ]
  },
  {
    title: "播放列表",
    list: [
      { id: "smalllist", img: img_smalllist, text: "所有播放列表", path: "/", disable: true, ckecked: false },
      { id: "viewlist", img: img_viewlist, text: "播放列表", path: "/playqueue", disable: false, ckecked: false },
    ]
  }

]
)
const searchText = ref("");
const searchMusic = () => {
  if (!searchText.value) return;
  router.push({ name: "search", query: { kw: searchText.value } });
};
const suggestions = reactive({
  data: [] as any[],
});
watch(searchText, () => {
  if (!searchText.value) {
    suggestions.data = [];
    return;
  }
  onSearch();
});
const onSearch = () => {
  getSearchSuggestions(searchText.value).then((res) => {
    suggestions.data = res.data.result.songs;
  });
};
const suggestionsClick = (text: string) => {
  searchText.value = text;
  searchMusic();
  searchText.value = "";
};

let timeOutFlag: NodeJS.Timeout;
const onSearchInputBlur = () => {
  timeOutFlag = setTimeout(() => {
    searchText.value = "";
  }, 3000);
};
const onSearchInputFocus = () => {
  clearTimeout(timeOutFlag);
};
</script>
<template>
  <div class="menu">
    <div class="search">
      <input placeholder="搜索" type="text" v-model="searchText" @keydown.enter="searchMusic" @blur="onSearchInputBlur"
        @focus="onSearchInputFocus" />
      <div v-if="suggestions.data && suggestions.data.length != 0 && searchText" class="suggestions">
        <ul>
          <li v-for="item in suggestions.data" @click="suggestionsClick(item.name)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <template v-for="menu in menus ">
      <label for="">{{ menu.title }}</label>
      <div class="block">
        <label :for="item.id" v-for="item in menu.list">
          <li @click="item.disable || navigateTo(item.path)">
            <input type="radio" name="a" :id="item.id" :checked="item.ckecked" :disabled="item.disable" />
            <div>
              <img :src="item.img" alt="" srcset="" />
            </div>
            <span :class="{ 'is-disable': item.disable }">{{ item.text }}</span>
          </li>
        </label>

      </div>

    </template>

  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: 550px;

  .search {
    width: 100%;
    // height: 30px;
    padding: 10px;
    position: relative;

    input {
      width: 100%;
      height: 27px;
      padding-left: 10px;
      border-radius: 7px;
      outline: none;
      border: 0.1px solid #80808032;
      background-color: #d8d8d8;
      // box-sizing: content-box;
      color: #000;
    }

    input::placeholder {
      text-align: left;
      opacity: 0.5;
    }

    input:focus {
      border: 3px solid #de6f72;
      transition: 0.2s all;
    }

    .suggestions {
      position: absolute;
      z-index: 10;
      top: 40px;
      width: 90%;

      background-color: rgba(0, 0, 0, 0.429);
      color: #fff;
      border-radius: 10px;

      ul {
        padding: 0;
      }

      li {
        text-decoration: none;
        display: block;
        width: 100%;
        font-size: 12px;
        font-weight: 450;
        text-align: left;
        color: #ffffff;
        box-sizing: content-box;
        padding: 4px 0 4px 20px;
      }


    }
  }

  >label {
    margin: 12px;
    display: block;
    color: #9b9b9b;
    font-weight: bolder;
    width: 100%;
    font-size: 12px;
    text-align: left;
    box-sizing: content-box;
    transform: scale(0.8);
    transform-origin: left;
  }

  .block {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 0;

    input {
      display: none;
    }

    input:checked~span {
      color: #fff;
    }

    li {
      text-decoration: none;
      display: block;
      font-size: 12px;
      font-weight: 450;
      text-align: left;
      color: #686868;
      box-sizing: content-box;
      padding: 4px 0 4px 20px;
      margin-left: 10px;
      margin-right: 10px;

      div {
        overflow: hidden;
        text-indent: -40px;
        display: inline-block;
        width: 13px;
        height: 13px;
        position: relative;
        top: 3px;
        margin-right: 2px;

        img {
          position: relative;
          width: 90%;
          height: 90%;
          filter: drop-shadow(40px 0px #ff0033);
        }
      }
    }

    li:hover {
      border-radius: 5px;
      background-color: #3636361a;
    }
  }

  .is-disable {

    color: #aaa !important;
  }
}
</style>
