<script setup lang="ts">
import { ref } from 'vue'
import BgSetting from '@/components/control/BgSetting.vue';
import Window from "@/plugin/components/Window.vue";

</script>
    
<template>
    <Teleport to="body">
        <Transition name="fromleft">
            <div v-bind="$attrs" class="control-ban">
                <BgSetting />
            </div>
        </Transition>
    </Teleport>
</template>
    
<style lang="scss" scoped>
.fromleft-enter-active,
.fromleft-leave-active {
    transition: all 0.5s ease;
}

.fromleft-enter-from,
.fromleft-leave-to {
    opacity: 0;
    transform: translateX(400px);
}


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
    