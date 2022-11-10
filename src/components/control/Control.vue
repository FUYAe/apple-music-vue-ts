<script setup lang="ts">
import { ref } from 'vue'
import BgSetting from './BgSetting.vue';


</script>
    
<template>
    <div class="control-ban">

        <BgSetting />

    </div>
</template>
    
<style lang="scss" scoped>
.control-ban {
    position: fixed;
    width: 400px;
    height: 98vh;
    overflow-y: scroll;
    z-index: 10000;
    top: 0;
    right: 0;
    padding: 10px;

    div {
        text-align: center;
    }

    div {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
}

::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>
    