<template>
    <div class="ConfirmComponent" @click="open">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElMessageBox } from 'element-plus'

const emit = defineEmits(['onCancel', 'onAcepted'])
const props = defineProps({
    title: {
         type: String,
        default: 'Title'
    },
    message: {
         type: String,
        default: 'This is a message'
    },
    type: {
        type: String,
        default: 'warning'
    },
    cancelButtonText: {
        type: String,
        default: 'Cancel'
    },
    confirmButtonText: {
        type: String,
        default: 'Ok'
    }
})

const open = () => {
  ElMessageBox.confirm(props.message, props.title, {
    confirmButtonText: props.confirmButtonText,
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
  .then(data => emit('onAcepted', data))
  .catch(err => emit('onCancel', err))
}
</script>

<style scopped lang="scss">
.ConfirmComponent {
    display: inline-block;
}
</style>