<template>
  <div class="back">
    <button>
      <Icon class="icon" @click="back" size="24"
        ><LeftOutlined></LeftOutlined
      ></Icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@vicons/utils";
import { MdReturnLeft } from "@vicons/ionicons4";
import { LeftOutlined } from "@vicons/antd";
import { useRouter } from "vue-router";
const router = useRouter();
const back = () => {
  router.back();
};
</script>
<script lang="ts">
export default {
  name: "Back",
};
</script>
<style lang="scss" scoped>
.back {
  height: 30px;
  text-align: left;
  padding: 3px 0;
  .icon {
    color: #ddd;
  }
  .icon:hover {
    color: #999;
  }
  button:active {
    .icon {
      transform: scale(0.9);
      opacity: 0.9;
    }
  }
}
</style>
