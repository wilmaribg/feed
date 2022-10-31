<template>
    <div 
        :id="id" 
        :class="{ 'is-inline': inline }"
        class="DropdownMenu" 
        v-click-outside="onClickOutside"
    >
        <div  @click="handler" class="DropdownMenu-trigger">
            <slot name="trigger"></slot>
        </div>
        <div class="DropdownMenu-content" :class="{ 
            'DropdownMenu-content--left': position == 'left',
            'DropdownMenu-content--right': position == 'right',
        }">
            <div v-if="status" class="DropdownMenu-contentFade">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const id = uuidv4()
const status = ref(false)
const props = defineProps({
    inline: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: 'right'
    }
})
const onClickOutside = () => {
    status.value = false
}
const handler = () => {
    status.value = !status.value
    const parent = document.getElementById(id)
    const el = parent.lastChild
    const elHeght = el.offsetHeight
    const windowHeight = window.innerHeight
    const { bottom } = el.getBoundingClientRect()
    if ((windowHeight - bottom) < elHeght) {
        el.style.bottom = parent.firstChild.offsetHeight + 'px'
    }
}
</script>

<style scopped lang="scss">
@keyframes animation {
    100% {
        opacity: 1;
    }    
}
.DropdownMenu {
    position: relative;   
    &-trigger {
        display: inline-block;
    }
    &-content {
        position: absolute;
        z-index: 1;
        &--right {
            right: 0;
        }
        &--left {
            left: 0;
        }
    }
    &-contentFade {
        opacity: 0;
        animation-name: animation;
        animation-duration: .0s;
        animation-fill-mode: forwards;
    }
}
</style>