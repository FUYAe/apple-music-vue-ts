
<script setup lang="ts">
import { onMounted, Teleport, ref } from "vue"

const props = withDefaults(defineProps<{
  msg: string,
  type?: string
}>(), {
  type: "success"
})
const hoverMenuRef = ref({} as HTMLDivElement)

</script>
<template>
  <div class="prompt">
    <div class="msg" :class="props.type">
      {{ props.msg }}
    </div>


  </div>
</template>

<style lang="scss" scoped>
.prompt {
  position: fixed;
  width: 220px;
  height: 40px;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  padding: 8px;

  .msg {
    font-size: 16px;
    text-align: center
  }

  .success {
    color: forestgreen;
  }

  .err {
    color: red;
  }


}
</style>