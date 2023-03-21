<template>
  <button class="au-btn" @click.stop="gotoAuInfo">
    <span>
      <slot></slot>
    </span>&nbsp;
  </button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const props = defineProps<{ artist?: { id: number } }>()
const router = useRouter()
const gotoAuInfo = () => {
  if (props.artist) {

    router.push({ name: "artist", query: { id: props.artist.id } })
  }
}
</script>
<script lang="ts">
export default {
  name: "AuName"
}
</script>
<style lang="scss" scoped>
.au-btn {
  outline: none;
  display: inline;
  color: #2c3e50;

  background-color: none;
  font-size: 12px;
}

.au-btn:hover {
  opacity: 0.9;

  span {

    text-decoration: underline;
    text-decoration-color: #2c3e50aa;
  }
}

.au-btn:active {
  transform: scale(0.9);

}
</style>