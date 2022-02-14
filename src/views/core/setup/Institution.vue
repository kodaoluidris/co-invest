<template>
  <div id="user-list">
    <!-- app drawer -->
    <user-list-add-new
      v-model="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="fetchUsers"
    ></user-list-add-new>


    <v-row>
    <!-- basic -->
    <v-col cols="12">
      <p class="text-2xl mb-10">Institution</p>
    </v-col>

    <v-card style="width: 100%">
      <v-card-title>
        Institution
        <v-spacer></v-spacer>
        <v-btn color="primary" class="" @click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
          <v-icon>{{ icons.mdiPlus }}</v-icon>
          <span>Add</span>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>
      <div class="row" style="padding: 2%">
        <div class="col-3">School Image</div>

        <div class="col-9">
          <v-form>
            <v-text-field
              v-model="firstname"
              :prepend-inner-icon="icons.mdiAccountOutline"
              label="Short Name"
              outlined
              dense
              placeholder="TASUED"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :prepend-inner-icon="icons.mdiEmailOutline"
              label="Full Name"
              outlined
              dense
              placeholder="OGUN MOEST"
            ></v-text-field>

            <v-text-field
              v-model="mobile"
              :prepend-inner-icon="icons.mdiCellphone"
              label="CONTACT PHONE"
              outlined
              dense
              type="number"
              placeholder="08168684269"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :prepend-inner-icon="icons.mdiEmailOutline"
              label="Email"
              type="email"
              outlined
              dense
              placeholder="info@tasued.edu.ng"
            ></v-text-field>

            <v-text-field
              v-model="jjj"
              :prepend-inner-icon="icons.mdiLockOutline"
              label="URL"
              outlined
              dense
              placeholder="www.tasued.edu.ng"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :prepend-inner-icon="icons.mdiLockOutline"
              label="ADDRESS"
              outlined
              dense
              placeholder="P.M.B 2118 Ijebu-Ode, Ogun State, Nigeria"
            >
            </v-text-field>
          </v-form>
        </div>
      </div>
    </v-card>

    <div class="row mt-3">
      <div class="col-md-6">
        <v-card>
          <v-card-title>
            Office
            <v-spacer></v-spacer>
            <v-btn color="primary" class="" @click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
              <v-icon>{{ icons.mdiPlus }}</v-icon>
              <span>Add</span>
            </v-btn>
          </v-card-title>
          <v-divider class="mt-4"></v-divider>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">#</th>
                  <th class="text-uppercase">Office Name</th>
                  <th class="text-center text-uppercase">Status</th>
                  <th class="text-center text-uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in programs" :key="item.program">
                  <td>{{ item.id }}</td>
                  <td>
                    {{ item.s_m }}
                  </td>
                  <td class="text-center">
                    <v-chip
                      small
                      color="primary"
                      :class="`primary--text`"
                      class="v-chip-light-bg font-weight-semibold text-capitalize"
                    >
                      active
                    </v-chip>
                  </td>

                  <td class="text-center">
                    <v-menu bottom left>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item :to="{ name: 'apps-user-view', params: { id: item.id } }">
                          <v-list-item-title>
                            <v-icon size="20" class="me-2">
                              {{ icons.mdiFileDocumentOutline }}
                            </v-icon>
                            <span>Edit</span>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item :to="{ name: 'apps-user-view', params: { id: item.id } }">
                          <v-list-item-title>
                            <v-icon size="20" class="me-2">
                              {{ icons.mdiFileDocumentOutline }}
                            </v-icon>
                            <span>Delete</span>
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


    </div>
  </v-row>

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


    //institution module
    const programs = [
      {
        id: '1',
        p_o_s: 'Undergraduate',
        s_m: 'Full Time, Part Time',
        // s_m: [
        //   {
        //   id: 1,
        //   name: 'Full Time',
        //   status: 'active'
        //   },
        //   {
        //   id: 2,
        //   name: 'Full Time',
        //   status: 'active'
        //   },
        //   {
        //   id: 3,
        //   name: 'Full Time 2',
        //   status: 'active'
        //   },
        // ],
        e_m: 'UTME, DE',
        level: '100, 200, 300, 400, 500',
        award_degree: 'BSc, BA.Ed',
        p_o_s_status: 'active',
      },
      {
        id: '2',
        p_o_s: 'Postgraduate',
        s_m: 'Full Time, Part Time',
        // s_m: [
        //   {
        //   id: 1,
        //   name: 'Full Time',
        //   status: 'active'
        //   },
        //   {
        //   id: 2,
        //   name: 'Full Time',
        //   status: 'active'
        //   },
        //   {
        //   id: 3,
        //   name: 'Full Time 2',
        //   status: 'active'
        //   },
        // ],
        e_m: 'UTME, DE',
        level: '100, 200, 300, 400, 500',
        award_degree: 'BSc, BA.Ed',
        p_o_s_status: 'active',
      },
    ]


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
      programs,
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
