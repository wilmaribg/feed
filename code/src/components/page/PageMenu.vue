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
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
export default {
  name: 'MenuComponent'
}  
</script>

<style scoped lang="scss">
  .menu--icon {
    transform: rotate(90deg);
    margin-left: 20px;
    font-size: 25px;
    color: #808080;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
</style>