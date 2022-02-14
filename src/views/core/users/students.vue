<template>
  <div id="user-list">
    <!-- app drawer -->
    <user-list-add-new
      v-model="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="fetchUsers"
    ></user-list-add-new>

    <!-- user total card -->
    <v-row class="mb-5">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Cumulative</span>
            </div>

            <v-avatar
              :color="resolveUserTotalIcon('primary').color"
              :class="`v-avatar-light-bg primary--text`"
            >
              <v-icon
                size="25"
                color="primary"
                class="rounded-0"
              >
               {{ resolveUserTotalIcon("Total Users").icon }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Current Student</span>
            </div>

            <v-avatar
              :color="resolveUserTotalIcon('primary').color"
              :class="`v-avatar-light-bg warning--text`"
            >
              <v-icon
                size="25"
                color="warning"
                class="rounded-0"
              >
               {{ resolveUserTotalIcon("Total Users").icon }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>



         <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Graduating</span>
            </div>

            <v-avatar
              :color="resolveUserTotalIcon('primary').color"
              :class="`v-avatar-light-bg success--text`"
            >
              <v-icon
                size="25"
                color="success"
                class="rounded-0"
              >
               {{ resolveUserTotalIcon("Total Users").icon }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>

       <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <v-card>
          <v-card-text class="d-flex align-center justify-space-between pa-4">
            <div>
              <h2 class="font-weight-semibold mb-1">
                123
              </h2>
              <span>Graduated</span>
            </div>

            <v-avatar
              :color="resolveUserTotalIcon('primary').color"
              :class="`v-avatar-light-bg info--text`"
            >
              <v-icon
                size="25"
                color="info"
                class="rounded-0"
              >
               {{ resolveUserTotalIcon("Total Users").icon }}
              </v-icon>
            </v-avatar>
          </v-card-text>
        </v-card>
      </v-col>




    </v-row>

    <!-- list filters -->
    <v-card>
      <v-card-title>
        Students List
      </v-card-title>


      <v-divider class="mt-4"></v-divider>

      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="searchQuery"
          placeholder="Search"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn
            color="primary"
            class="mb-4 me-3"
            @click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive"
          >
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Add New Student</span>
          </v-btn>

          <v-btn
            color="secondary"
            outlined
            class="mb-4"
          >
            <v-icon
              size="17"
              class="me-1"
            >
              {{ icons.mdiExportVariant }}
            </v-icon>
            <span>Export</span>
          </v-btn>
        </div>
      </v-card-text>

      <!-- table -->
        <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">
                    No
                  </th>
                  <th class="text-center text-uppercase">
                    User Image
                  </th>
                  <th class="text-center text-uppercase">
                    User ID
                  </th>
                  <th class="text-center text-uppercase">
                    College Details
                  </th>
                  <th class="text-center text-uppercase">
                   Programme
                  </th>
                  <th class="text-center text-uppercase">
                   Status
                  </th>
                  <th class="text-center text-uppercase">
                   Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in desserts"
                  :key="index"
                >
                  <td>{{ index+1 }}</td>
                  <td class="text-center">
                         <div class="d-flex align-center">
                            <v-avatar
                              color="primary"
                              class="v-avatar-light-bg primary--text"
                              size="32"
                            >
                              <v-img
                                v-if="item.dessert"
                                :src="require(`@/assets/images/avatars/1.png`)"
                              ></v-img>
                              <span
                                v-else
                                class="font-weight-medium"
                              >{{ avatarText(item.dessert) }}</span>
                            </v-avatar>

                            <div class="d-flex flex-column ms-3">
                              <router-link
                                :to="{ name : 'apps-user-view', params : { id : 1 } }"
                                class="text--primary font-weight-semibold text-truncate cursor-pointer text-decoration-none"
                              >
                               Soge temitope
                              </router-link>
                              <small>soge.tope@gmail.com</small>
                              <small>07039566540</small>
                            </div>
                      </div>
                  </td>
                  <td class="text-center">
                    <p>201854863</p>
                  </td>
                  <td class="text-center">
                     <div class="d-flex flex-column ms-3">
                           COHUM
                          <small>Cerative Arts</small>
                    </div>

                  </td>
                  <td class="text-center">
                    <div class="d-flex flex-column ms-3">
                           Fine Arts
                          <small>200 Level</small>
                    </div>
                  </td>
                  <td class="text-center">
                           <v-chip
                              small
                              color="primary"
                              :class="`primary--text`"
                              class="v-chip-light-bg font-weight-semibold text-capitalize"
                            >
                             Undergraduate
                            </v-chip>
                  </td>
                  <td class="text-center">
                           <v-menu
                                  bottom
                                  left
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      icon
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                      <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                                    </v-btn>
                                  </template>

                                  <v-list>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>View</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Edit</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Edit Registration</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Add to Passlist</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Payment Status</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>View Result</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Change passport</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Reset password</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Clear 2FA</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Clear profile update</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Login As</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item
                                      :to="{name:'apps-user-view',params:{id:item.id}}"
                                    >
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiFileDocumentOutline }}
                                        </v-icon>
                                        <span>Send Email</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item link>
                                      <v-list-item-title>
                                        <v-icon
                                          size="20"
                                          class="me-2"
                                        >
                                          {{ icons.mdiDeleteOutline }}
                                        </v-icon>
                                        <span>Pay Miscellaneous</span>
                                      </v-list-item-title>
                                    </v-list-item>
                                  </v-list>
                            </v-menu>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
    </v-card>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiSquareEditOutline,
  mdiDotsVertical,
  mdiPlus,
  mdiFileDocumentOutline,
  mdiDeleteOutline,
  mdiExportVariant,
  mdiAccountOutline,
} from '@mdi/js'
import store from '@/store'
import { onUnmounted, ref } from '@vue/composition-api'

// sidebar
import { avatarText } from '@core/utils/filter'
import UserListAddNew from '../../apps/user/user-list/UserListAddNew.vue'
import userStoreModule from '../../apps/user/userStoreModule'

import useUsersList from '../../apps/user/user-list/useUsersList'



export default {
  components: {
    UserListAddNew,
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const {
      userListTable,
      tableColumns,
      searchQuery,
      roleFilter,
      planFilter,
      statusFilter,
      totalUserListTable,
      loading,
      options,
      userTotalLocal,
      selectedRows,

      fetchUsers,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      resolveUserTotalIcon,
    } = useUsersList()

    const isAddNewUserSidebarActive = ref(false)

    const roleOptions = [
      { title: 'Admin', value: 'admin' },
      { title: 'Author', value: 'author' },
      { title: 'Editor', value: 'editor' },
      { title: 'Maintainer', value: 'maintainer' },
      { title: 'Subscriber', value: 'subscriber' },
    ]

    const planOptions = [
      { title: 'Basic', value: 'basic' },
      { title: 'Company', value: 'company' },
      { title: 'Enterprise', value: 'enterprise' },
      { title: 'Standard', value: 'standard' },
    ]

    const statusOptions = [
      { title: 'Pending', value: 'pending' },
      { title: 'Active', value: 'active' },
      { title: 'Inactive', value: 'inactive' },
    ]

     const desserts = [
      {
        dessert: 'Frozen Yogurt',
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
      },
      {
        dessert: 'Ice cream sandwich',
        calories: 237,
        fat: 6,
        carbs: 24,
        protein: 4,
      },
      {
        dessert: 'Eclair',
        calories: 262,
        fat: 6,
        carbs: 24,
        protein: 4,
      },
      {
        dessert: 'Cupcake',
        calories: 305,
        fat: 6,
        carbs: 24,
        protein: 4,
      },
      {
        dessert: 'Gingerbread',
        calories: 356,
        fat: 6,
        carbs: 24,
        protein: 4,
      },
    ]

    return {
      userListTable,
      tableColumns,
      searchQuery,
      roleFilter,
      planFilter,
      statusFilter,
      totalUserListTable,
      roleOptions,
      planOptions,
      statusOptions,
      loading,
      options,
      userTotalLocal,
      isAddNewUserSidebarActive,
      selectedRows,
      desserts,
      avatarText,
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      resolveUserTotalIcon,
      fetchUsers,

      // icons
      icons: {
        mdiSquareEditOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
        mdiDeleteOutline,
        mdiPlus,
        mdiExportVariant,
        mdiAccountOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
