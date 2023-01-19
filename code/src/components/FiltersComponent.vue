<template>
  <div class="Filter-body p-6">
    <div class="columns">
      <div class="column">
        <span class="is-size-1 has-text-weight-medium">Events Notifications</span>
      </div>
    </div>
    <div class="columns is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-2 is-size-4 has-text-weight-bold">
            RAF
          </div>
          <div class="column is-2 is-size-4 has-text-weight-bold">
            Sound
          </div>
          <div class="column is-4 is-size-4 has-text-weight-bold">
            WhatsApp
          </div>
        </div>
        <div class="columns">
          <div class="column is-size-5 has-text-weight-medium is-white-space-no-wrap">
            <div class="has-text-weight-bold">Select All</div>
          </div>
          <div class="column is-2">
            <el-switch 
              v-model="selectAllNotificationRaf" 
              @change="selectAllHandler('notificationRaf', selectAllNotificationRaf)"  
              size="large"
            />
          </div>
          <div class="column is-2">
            <el-switch 
              disabled
              v-model="selectAllSound" 
              @change="selectAllHandler('sound', selectAllSound)" 
              size="large"
            />
          </div>
          <div class="column is-4">
            <el-switch 
              v-model="selectAllNotificationWpp" 
              @change="selectAllHandler('notificationWpp', selectAllNotificationWpp)"  
              size="large"
            />
          </div>
        </div>
        <template v-for="(filter, key, index) in filterStore.filters.proposal" :key="index">
          <div v-if="!/greater than|until new number/i.test(filter.label)" class="columns">
            <div class="column is-size-5 has-text-weight-medium is-white-space-no-wrap">
              <div>{{ filter.label }}</div>
              <div v-if="isAllowedSelectUSers" @click="filter.dialogVisible = true" class="is-size-6 is-clickable">
                {{ countUsers(filter) }} Users <a>Selected</a>
              </div>
              <el-dialog v-model="filter.dialogVisible" width="75%" destroy-on-close>
                <div class="columns">
                  <div class="column is-size-4 has-text-weight-bold">
                    Listen users on <span class="is-lowercase">{{ filter.label }}</span>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <SelectUsers 
                      :initUsers="filter.users"
                      @change="users => filterStore.filters.proposal[key].users = users"
                    >
                      <template #default="{users,removeUser}">
                        <div class="columns">
                          <div class="column pt-0 has-text-right">
                            <div class="is-size-7">{{ users.length }} Users selected</div>
                          </div>
                        </div>
                        <div class="columns is-multiline">
                          <template v-for="(user, index) in users" :key="index">
                            <div class="column is-narrow">
                              <div class="box">
                                <div class="columns">
                                  <div class="colmun is-narrow mr-3">
                                    <AvatarComponent :photo="user.avatars.original" width="40px" height="40px"/>
                                  </div>
                                  <div class="colmun">
                                    <div>
                                      <span class="has-text-weight-semibold mr-2">{{ fullName(user) }}</span>
                                      <small>[{{ companyName(user) }}]</small>
                                    </div>
                                    <div>{{ user.email }}</div>
                                  </div>
                                  <div class="column is-narrow pt-0">
                                    <i @click="removeUser(index)" class="fa fa-times is-clickable" aria-hidden="true"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </template>
                    </SelectUsers>
                  </div>
                </div>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="applyUsersToAll(filterStore.filters.proposal[key].users)" size="large" text bg>
                      Apply config to all events
                    </el-button>
                    <el-button @click="filter.dialogVisible=false" color="#000" :isDark="true" size="large">
                      OK
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </div>
            <div class="column is-2">
              <el-switch v-model="filter.notificationRaf" @change="evaluateSelectAll('notificationRaf')" size="large"/>
            </div>
            <div class="column is-2">
              <el-switch disabled v-model="filter.sound" @change="evaluateSelectAll('sound')" size="large"/>
            </div>
            <div class="column is-4">
              <el-switch v-model="filter.notificationWpp" @change="evaluateSelectAll('notificationWpp')" size="large"/>
            </div>
          </div>
        </template>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column is-size-4 has-text-weight-bold">
            Notification Conditions
          </div>
        </div>
        <template v-for="(filter, index) in filterStore.filters.proposal" :key="index">
          <div v-if="/greater than|until new number/i.test(filter.label)" class="columns">
            <div class="column is-size-5 has-text-weight-medium is-white-space-no-wrap">
              {{ filter.label }}
            </div>
            <div class="column">
              <el-input-number v-model="filter.value" :min="0" />
            </div>
          </div>
        </template>
        <template v-if="isAllowedSelectUSers">
          <div class="columns mt-6">
            <div class="column is-size-4 has-text-weight-bold">
              Notify To WhatsApp Group
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <el-input v-model="filterStore.filters.wppGroupId" placeholder="Group Id" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="columns">
      <div class="column has-text-right mt-6">
        <el-button @click="reset" color="#000" :isDark="true" size="large">
          RESET SETTINGS
        </el-button>
        <el-button @click="emit('onClose')" color="#000" :isDark="true" size="large">
          CANCEL
        </el-button>
        <el-button @click="save" color="#000" :isDark="true" size="large">OK</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from 'lodash'
import { ref, onMounted, inject, defineEmits, watch, watchEffect } from 'vue'
import { ElSwitch, ElButton, ElInputNumber, ElDialog, ElInput } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import router from '../router/index.js'
import { config } from '../provides/sdk.js'
import SelectUsers from './SelectUsers.vue'
import AvatarComponent from './AvatarComponent.vue'
import { useFilterStore } from '../store/filter.js'
import { EventsFilters, EventsFiltersSave } from '../queries/index.js'

const filterStore = useFilterStore()
const notification = inject('notification')
const isAllowedSelectUSers = ref(false)

const selectAllSound = ref(false)
const selectAllNotificationRaf = ref(false)
const selectAllNotificationWpp = ref(false)

const emit = defineEmits(['onClose'])

const countUsers = data => {
  return get(data, 'users.length', 0)
}

const fullName = data => {
  return get(data, 'firstName', '') + ' ' + get(data, 'lastName', '')
}

const companyName = data => {
  return get(data, 'company.name', get(data, 'company', ''))
} 

const reset = async () => {
  try {
    filterStore.reset()
    selectAllSound.value = false
    selectAllNotificationRaf.value = false
    selectAllNotificationWpp.value = false
  } catch (err) {
    notification.error(err)
  }
}

const save = async () => {
  try {
    const user = config.session().id
    const userInfo = { phone: config.session().mobile || config.session().phone }
    const filter = JSON.parse(JSON.stringify(filterStore.filters))
    const res = await EventsFiltersSave(user, userInfo, filter)
    notification.success(res)
    emit('onClose')
  } catch (err) {
    notification.error(err)
    console.log(err)
  }
}

const applyUsersToAll = users => {
  const keys = Object.keys(filterStore.filters.proposal)
  for (var i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]
    const obj = new Object(filterStore.filters.proposal[key])
    if (!Object.prototype.hasOwnProperty.call(obj, 'users')) continue
    filterStore.filters.proposal[key].users = users
  }
  notification.success('Apply config to all events')
}

const evaluateSelectAll = prop => {
  let status = true
  const keys = Object.keys(filterStore.filters.proposal)
  for (var i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]
    const obj = new Object(filterStore.filters.proposal[key])
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue
    if (filterStore.filters.proposal[key][prop] == false) status = false
  }
  if (prop == 'sound') selectAllSound.value = status
  if (prop == 'notificationRaf') selectAllNotificationRaf.value = status
  if (prop == 'notificationWpp') selectAllNotificationWpp.value = status
}

const selectAllHandler = (prop, value) => {
  const keys = Object.keys(filterStore.filters.proposal)
  for (var i = keys.length - 1; i >= 0; i--) {
    const key = keys[i]
    const obj = new Object(filterStore.filters.proposal[key])
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue
    filterStore.filters.proposal[key][prop] = value
  } 
} 

onMounted(async () => {
  try {
    const roles = config.roles()
    const user = config.session().id
    isAllowedSelectUSers.value = Boolean(get(roles, 'admin', get(roles, 'raf')))
    filterStore.setFilters(await EventsFilters(user))
    evaluateSelectAll('sound')
    evaluateSelectAll('notificationRaf')
    evaluateSelectAll('notificationWpp')
  } catch (err) {
    notification.error(err)
  }
})
</script>

<style scoped lang="scss">
.Filter {
  &-body {
    width: 100%;
    overflow: auto;
    height: fit-content;
  }
}
</style>  