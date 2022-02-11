<template>
  <div id="user-list">
    <!-- app drawer -->
    <user-list-add-new1
      v-model="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="fetchUsers"
    ></user-list-add-new1>

    <!-- list filters -->
    <v-card>
      <v-card-title>
        Study Programme
        <v-spacer></v-spacer>
        <v-btn color="primary" class="" @click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
          <v-icon>{{ icons.mdiPlus }}</v-icon>
          <span>Add Study Programme</span>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <!-- table -->
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-uppercase">#</th>
              <th class="text-uppercase">Study Programme</th>
              <th class="text-center text-uppercase">Study Mode</th>
              <th class="text-center text-uppercase">Entry Mode</th>
              <th class="text-center text-uppercase">Level</th>
              <th class="text-center text-uppercase">Award Degree</th>
              <th class="text-center text-uppercase">Status</th>
              <th class="text-center text-uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in programs" :key="item.program">
              <td>{{ item.id }}</td>
              <td>
                {{ item.p_o_s }}
              </td>
              <td class="text-center">
                {{ item.s_m }}
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon size="20" class="me-2" color="primary">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <v-dialog v-model="isDialogVisible" persistent max-width="600px">
                          <template #activator="{ on, attrs }">
                            <v-btn text color="primary" dark v-bind="attrs" v-on="on"> Manage Study Mode </v-btn>
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <div class="row">
                                  <div class="col-md-12">
                                    <v-card>
                                      <v-card-title>
                                        Add Study Mode

                                        <v-spacer></v-spacer>
                                        <!-- second modal study mode -->
                                        <v-dialog v-model="dialog" width="500">
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" class="" small v-bind="attrs" v-on="on">
                                              <v-icon>{{ icons.mdiPlus }}</v-icon>
                                            </v-btn>
                                          </template>
                                          <v-card>
                                            <v-card-text>
                                              Sudy Mode
                                              <div class="ml-5" style="width: 90%">
                                                <p>Study Mode</p>
                                                <v-combobox v-model="study" :items="mode" multiple solo></v-combobox>
                                              </div>
                                            </v-card-text>

                                            <v-divider></v-divider>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="primary" text @click="dialog = false"> Save </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>

                                        <!-- end of second modal -->
                                      </v-card-title>
                                      <v-simple-table>
                                        <template v-slot:default>
                                          <thead>
                                            <tr>
                                              <th class="text-uppercase">#</th>
                                              <th class="text-uppercase">Study Mode</th>
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
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
                                                      <v-list-item-title>
                                                        <v-icon size="20" class="me-2">
                                                          {{ icons.mdiFileDocumentOutline }}
                                                        </v-icon>
                                                        <span>Edit</span>
                                                      </v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
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
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" outlined @click="isDialogVisible = false"> Close </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td class="text-center">
                {{ item.e_m }}
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon size="20" class="me-2" color="primary">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <v-dialog v-model="isDialogVisible" persistent max-width="600px">
                          <template #activator="{ on, attrs }">
                            <v-btn text color="primary" dark v-bind="attrs" v-on="on"> Manage Entry Mode </v-btn>
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <div class="row">
                                  <div class="col-md-12">
                                    <v-card>
                                      <v-card-title>
                                        Add Entry Mode

                                        <v-spacer></v-spacer>

                                        <!-- beginning of entry mode -->
                                         <v-dialog v-model="dialog" width="500">
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" class="" small v-bind="attrs" v-on="on">
                                              <v-icon>{{ icons.mdiPlus }}</v-icon>
                                            </v-btn>
                                          </template>
                                          <v-card>
                                            <v-card-text>
                                              <div class="ml-5" style="width: 90%">
                                                <p>Entry Mode</p>
                                                <v-combobox v-model="entry" :items="modes" multiple solo></v-combobox>
                                              </div>
                                            </v-card-text>

                                            <v-divider></v-divider>
                                            <v-card-actions>
                                              <v-spacer></v-spacer>
                                              <v-btn color="primary" text @click="dialog = false"> Save </v-btn>
                                            </v-card-actions>
                                          </v-card>
                                        </v-dialog>
                                        <!-- end of entry mode -->




                                      </v-card-title>
                                      <v-simple-table>
                                        <template v-slot:default>
                                          <thead>
                                            <tr>
                                              <th class="text-uppercase">#</th>
                                              <th class="text-uppercase">Entry Mode</th>
                                              <th class="text-center text-uppercase">Status</th>
                                              <th class="text-center text-uppercase">Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="item in programs" :key="item.program">
                                              <td>{{ item.id }}</td>
                                              <td>
                                                {{ item.e_m }}
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
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
                                                      <v-list-item-title>
                                                        <v-icon size="20" class="me-2">
                                                          {{ icons.mdiFileDocumentOutline }}
                                                        </v-icon>
                                                        <span>Edit</span>
                                                      </v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
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
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" outlined @click="isDialogVisible = false"> Close </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td class="text-center">
                {{ item.level
                }}<v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" color="primary">
                      <v-icon>{{ icons.mdiDotsVertical }} </v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon size="20" class="me-2" color="primary">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <v-dialog v-model="isDialogVisible" persistent max-width="600px">
                          <template #activator="{ on, attrs }">
                            <v-btn text color="primary" dark v-bind="attrs" v-on="on"> Manage Level </v-btn>
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <div class="row">
                                  <div class="col-md-12">
                                    <v-card>
                                      <v-card-title>
                                        Level

                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" class="">
                                          <v-icon>{{ icons.mdiPlus }}</v-icon>

                                          <span>Add New</span>
                                        </v-btn>
                                      </v-card-title>
                                      <v-simple-table>
                                        <template v-slot:default>
                                          <thead>
                                            <tr>
                                              <th class="text-uppercase">#</th>
                                              <th class="text-uppercase">Level</th>
                                              <th class="text-center text-uppercase">Status</th>
                                              <th class="text-center text-uppercase">Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="item in programs" :key="item.program">
                                              <td>{{ item.id }}</td>
                                              <td>
                                                {{ item.level }}
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
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
                                                      <v-list-item-title>
                                                        <v-icon size="20" class="me-2">
                                                          {{ icons.mdiFileDocumentOutline }}
                                                        </v-icon>
                                                        <span>Edit</span>
                                                      </v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
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
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" outlined @click="isDialogVisible = false"> Close </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'apps-user-view', params: { id: item.id } }">
                      <v-list-item-title>
                        <v-icon size="20" class="me-2">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <span>Edit</span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td class="text-center">
                {{ item.award_degree }}
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon size="20" class="me-2">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <v-dialog v-model="isDialogVisible" persistent max-width="600px">
                          <template #activator="{ on, attrs }">
                            <v-btn text color="primary" dark v-bind="attrs" v-on="on"> Manage Award Degree </v-btn>
                          </template>
                          <v-card>
                            <v-card-text>
                              <v-container>
                                <div class="row">
                                  <div class="col-md-12">
                                    <v-card>
                                      <v-card-title>
                                        Award Degree

                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" class="">
                                          <v-icon>{{ icons.mdiPlus }}</v-icon>

                                          <span>Add New</span>
                                        </v-btn>
                                      </v-card-title>
                                      <v-simple-table>
                                        <template v-slot:default>
                                          <thead>
                                            <tr>
                                              <th class="text-uppercase">#</th>
                                              <th class="text-uppercase">Award Degree</th>
                                              <th class="text-center text-uppercase">Status</th>
                                              <th class="text-center text-uppercase">Actions</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr v-for="item in programs" :key="item.program">
                                              <td>{{ item.id }}</td>
                                              <td>
                                                {{ item.award_degree }}
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
                                                    <v-btn icon v-bind="attrs" v-on="on" color="primary">
                                                      <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
                                                    </v-btn>
                                                  </template>

                                                  <v-list>
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
                                                      <v-list-item-title>
                                                        <v-icon size="20" class="me-2">
                                                          {{ icons.mdiFileDocumentOutline }}
                                                        </v-icon>
                                                        <span>Edit</span>
                                                      </v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item
                                                      :to="{ name: 'apps-user-view', params: { id: item.id } }"
                                                    >
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
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="error" outlined @click="isDialogVisible = false"> Close </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item :to="{ name: 'apps-user-view', params: { id: item.id } }">
                      <v-list-item-title>
                        <v-icon size="20" class="me-2">
                          {{ icons.mdiFileDocumentOutline }}
                        </v-icon>
                        <span>Edit</span>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
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
  mdiFileCheckOutline,
} from '@mdi/js'
import store from '@/store'
import { onUnmounted, ref } from '@vue/composition-api'

// sidebar
import { avatarText } from '@core/utils/filter'
import UserListAddNew1 from '../../apps/user/user-list/StudyProg.vue'

import userStoreModule from '../../apps/user/userStoreModule'

import useUsersList from '../../apps/user/user-list/useUsersList'
import DemoSimpleTableBasic from '../../simple-table/demos/DemoSimpleTableBasic.vue'

import ManageStudyMode from './StudyMode/Index'

export default {
  components: {
    UserListAddNew1,
    DemoSimpleTableBasic,
    ManageStudyMode,
  },
  setup() {

    //add study mode

    const study = ref(['Full Time'])
    const mode = ['Full Time', 'Part Time']

    //add entry mode
    const entry = ref(['UTME'])
    const modes = ['UTME', 'DE']

    //Modal
    const isDialogVisible = ref(false)

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

    //
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
      isDialogVisible,
      study,
      mode,
      entry,
      modes,

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
        mdiFileCheckOutline,
      },
    }
  },

  methods: {},
}
</script>

<style lang="scss">
@import '@core/preset/preset/apps/user.scss';
</style>
