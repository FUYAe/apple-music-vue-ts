<template>
  <img :src="props.src || defimg" alt="" @error="slnotimg" srcset="">
</template>

<script setup lang="ts">
import defimg from "@/assets/apple_music.png"
const props = defineProps<{
  src?: string
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