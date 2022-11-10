<template>
  <img :src="props.src" alt="" @error="slnotimg" srcset="">
</template>

<script setup lang="ts">
import defimg from "@/assets/default_player_pic.jpg"
const props = defineProps<{
  src: string
  alter?: string
}>()
const slnotimg = (event: Event) => {
  var img = event.srcElement as HTMLImageElement; img!.src = props.alter || defimg; img.onerror = null;
}
</script>
<script lang="ts">
export default {
  name: "Image",
};</script>
<style scoped>

</style>