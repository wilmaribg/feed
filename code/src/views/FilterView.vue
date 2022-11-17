<template>
  <PageComponent class="Filter" padding>
    <template #body="{bodyHeight}">
      <div class="Filter-body box p-6" :style="{'max-height': `${bodyHeight}px`}">
        <div class="columns">
          <div class="column">
            <span class="is-size-1 has-text-weight-medium">Events Notifications</span>
          </div>
          <div class="column is-narrow">
            <el-button @click="$router.push('/feed')" color="#000" :isDark="true" :icon="Close"/>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column">
            <div class="columns">
              <div class="column"></div>
              <div class="column is-2 is-size-4 has-text-weight-bold">
                Raf
              </div>
              <div class="column is-2 is-size-4 has-text-weight-bold">
                Sound
              </div>
              <div class="column is-4 is-size-4 has-text-weight-bold">
                Whatsapp
              </div>
            </div>
            <template v-for="(filter, key, index) in filterStore.filters.proposal" :key="index">
              <div v-if="!/greater than|until new number/i.test(filter.label)" class="columns">
                <div class="column is-size-5 has-text-weight-medium is-white-space-no-wrap">
                  <div>{{ filter.label }}</div>
                  <div @click="filter.dialogVisible = true" class="is-size-6 is-clickable">
                    {{ countUsers(filter) }}  Users <a>select</a>
                  </div>
                  <el-dialog v-model="filter.dialogVisible" width="75%">
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
                        <el-button @click="filter.dialogVisible=false" color="#000" :isDark="true" size="large">
                          OK
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="column is-2">
                  <el-switch v-model="filter.notificationRaf" size="large"/>
                </div>
                <div class="column is-2">
                  <el-switch v-model="filter.sound" size="large"/>
                </div>
                <div class="column is-4">
                  <el-switch v-model="filter.notificationWpp" size="large"/>
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
          </div>
        </div>
        <div class="columns">
          <div class="column has-text-right mt-6">
            <el-button @click="reset" color="#000" :isDark="true" size="large">
              RESET SETTINGS
            </el-button>
            <el-button @click="$router.push('/feed')" color="#000" :isDark="true" size="large">
              CANCEL
            </el-button>
            <el-button @click="save" color="#000" :isDark="true" size="large">OK</el-button>
          </div>
        </div>
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import { get } from 'lodash'
import { ref, onMounted, inject } from 'vue'
import { ElSwitch, ElButton, ElInputNumber, ElDialog } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { config } from '../provides/sdk.js'
import SelectUsers from '../components/SelectUsers.vue'
import AvatarComponent from '../components/AvatarComponent.vue'
import { useFilterStore } from '../store/filter.js'
import { EventsFilters, EventsFiltersSave } from '../queries/index.js'

const filterStore = useFilterStore()
const notification = inject('notification')

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
    const user = config.session().id
    const filter = JSON.parse(JSON.stringify(filterStore.filters))
    const res = await EventsFiltersSave(user, filter)
    notification.success(res)
  } catch (err) {
    notification.error(err)
  }
}
const save = async () => {
  try {
    const user = config.session().id
    const filter = JSON.parse(JSON.stringify(filterStore.filters))
    const res = await EventsFiltersSave(user, filter)
    notification.success(res)
  } catch (err) {
    notification.error(err)
    console.log(err)
  }
}
onMounted(async () => {
  try {
    const user = config.session().id
    filterStore.setFilters(await EventsFilters(user))
  } catch (err) {
    notification.error(err)
  }
})
</script>

<style scoped lang="scss">
.Filter {
  &-body {
    width: 100%;
    height: fit-content;
  }
}
</style>  