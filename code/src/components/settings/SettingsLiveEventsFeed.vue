<template>
  <el-link @click="dialogVisible = true">
    {{ props.linkText }}
  </el-link>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, defineProps } from 'vue'

  const props = defineProps({
    linkText: String
  })

  const dialogVisible = ref(false)
</script>