<template>
  <div class="SelectUsers">
    <div class="columns">
      <div class="column">
        <div class="is-relative">
          <el-input v-model="criteria" :placeholder="placeholder" @input="remoteMethod" />
          <div class="is-relative">
            <div class="SelectUsers-options" v-if="options.length">
              <div class="el-select-dropdown" style="min-width: 203px;">
                <div class="el-scrollbar" style="">
                  <div class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
                    <ul class="el-scrollbar__view el-select-dropdown__list">
                      <template v-for="(user, index) in options" :key="index">
                        <li @click="addUser(user)" class="el-select-dropdown__item">
                          <span class="has-text-weight-semibold mr-2">
                            {{ name(user) }}
                          </span>
                          <span>({{ user.email }} - {{company(user)}})</span>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
          <slot name="default" :users="users" :removeUser="removeUser"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from 'lodash'
import { ref, defineProps, inject, watch, defineEmits } from 'vue'
import { ElInput, ElOption } from 'element-plus'
import { UserSearch } from '../queries/index.js'

const props = defineProps({
  initUsers: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Search'
  }
})

const emit = defineEmits(['change'])

const notification = inject('notification')

const users = ref(props.initUsers)
const options = ref([])
const criteria = ref(null)

const timeout = time => new Promise(resolve => setTimeout(resolve,  time))

const name = data => {
  return get(data, 'firstName', '') + ' ' + get(data, 'lastName', '')
}

const company = data => {
  return get(data, 'company.name', get(data, 'company', ''))
}

const removeUser = index => users.value.splice(index, 1)

const addUser = user => {
  users.value.push(user)
  options.value = []
  criteria.value = null
}

const remoteMethod = async (criteria) => {
  try {
    options.value = await UserSearch(criteria)
  } catch (err) {
    notification.error(err)
    console.log(err)
  }
}

watch(users, () => emit('change', JSON.parse(JSON.stringify(users.value))), { deep: true })
</script>

<style scoped lang="scss">
.SelectUsers {
  &-options {
    background: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color-light);
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
  }
}
</style>