<script setup>
  import { MoreFilled } from '@element-plus/icons-vue'  
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon class="menu--icon">
        <MoreFilled />
      </el-icon>
    </span>
    <template #dropdown>
      <slot name="actions"></slot>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LiveEventsFeedItemMenu'
}  
</script>

<style scoped lang="scss">
  .menu--icon {
    transform: rotate(90deg);
    margin-left: 20px;
    font-size: 1rem;
    color: #808080;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
</style>