<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { getSearchR, getSearchSuggestions } from "@/axios/request";
import { useStore } from "@/store";
import { watch } from "vue";
const store = useStore();
const router = useRouter();
const navigateTo = (path: string) => {
  router.push({
    path,
  });
};
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
    <label for="">Apple Music</label>
    <div class="block">
      <label for="nowtolisten">
        <li @click="navigateTo('/')">
          <input type="radio" name="a" id="nowtolisten" checked />
          <div>
            <img src="@/assets/siderIcon/nowlistening.png" alt="" srcset="" />
          </div>
          <span>现在就听</span>
        </li>
      </label>
      <label for="browse">
        <li @click="navigateTo('/browse')">
          <input type="radio" name="a" id="browse" />
          <div>
            <img src="@/assets/siderIcon/browse.png" alt="" srcset="" />
          </div>
          <span>浏览</span>
        </li>
      </label>
      <label for="radar">
        <li>
          <input type="radio" name="a" id="radar" />
          <div>
            <img src="@/assets/siderIcon/outline-radar.png" alt="" srcset="" />
          </div>
          <span>广播</span>
        </li>
      </label>
    </div>
    <label for="">资料库</label>
    <div class="block">
      <label for="recent">
        <li>
          <input type="radio" name="a" id="recent" />
          <div>
            <img src="@/assets/siderIcon/recent.png" alt="" srcset="" />
          </div>
          <span>最新添加</span>
        </li>
      </label>
      <label for="microphone">
        <li>
          <input type="radio" name="a" id="microphone" />
          <div>
            <img src="@/assets/siderIcon/microphone.png" alt="" srcset="" />
          </div>
          <span>艺人</span>
        </li>
      </label><label for="note">
        <li>
          <input type="radio" name="a" id="note" />
          <div>
            <img src="@/assets/siderIcon/note.png" alt="" srcset="" />
          </div>
          <span>歌曲</span>
        </li>
      </label>
    </div>
    <label for="">播放列表</label>
    <div class="block">
      <label for="smalllist">
        <li>
          <input type="radio" name="a" id="smalllist" />
          <div>
            <img src="@/assets/siderIcon/smalllist.png" alt="" srcset="" />
          </div>
          <span>所有播放列表</span>
        </li>
      </label><label for="viewlist">
        <li @click="navigateTo('/playlist')">
          <input type="radio" name="a" id="viewlist" />
          <div>
            <img src="@/assets/siderIcon/Viewlist.png" alt="" srcset="" />
          </div>
          <span>播放列表</span>
        </li>
      </label>
    </div>
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
}
</style>
