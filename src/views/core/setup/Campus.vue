<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <p class="text-2xl ">Campus</p>
    </v-col>



    <div class="row">


      <div class="col-md-12">
        <v-card>
          <v-card-title>
            Schools
            <v-spacer></v-spacer>
            <v-btn color="primary" class="" @click.stop="isAddNewUserSidebarActive = !isAddNewUserSidebarActive">
              <v-icon>{{ icons.mdiPlus }}</v-icon>
              <span>Add Campus</span>
            </v-btn>
          </v-card-title>
          <v-divider class=""></v-divider>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">#</th>
                  <th class="text-uppercase"> Campus Name</th>
                  <th class="text-uppercase">Contact Info</th>
                  <th class="text-uppercase">Email</th>
                  <th class="text-uppercase">Campus Url</th>
                  <th class="text-uppercase">Campus Address</th>
                  <th class="text-uppercase">Action</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="item in programs" :key="item.program">
                  <td>{{ item.id }}</td>
                  <td>
                    {{ item.p_o_s }}
                  </td>
                  <td>
                    {{ item.c_info }}
                  </td>
                  <td>
                    {{ item.email }}
                  </td>
                  <td>
                    {{ item.url }}
                  </td>
                  <td class="">
                    <v-chip
                      small
                      color="primary"
                      :class="`primary--text`"
                      class="v-chip-light-bg font-weight-semibold text-capitalize"
                    >
                      active
                    </v-chip>
                  </td>

                  <td class="">
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
                            <span>Manage Campus</span>
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
</template>
<script>
import {
  mdiAccountOutline,
  mdiLockOutline,
  mdiAccessPoint,
  mdiFormSelect,
  mdiEmailOutline,
  mdiCellphone,
  mdiFileDocumentOutline,
  mdiDotsVertical,
} from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const shortname = ref('')
    const email = ref('')
    const mobile = ref()
    const password = ref()

    const programs = [
      {
        id: '1',
        p_o_s: 'Ijagun',
        c_info: '08000222002',
        email: 'tasued@gmail.com',
        url: 'www.tasued.edu.ng',
        level: '100, 200, 300, 400, 500',
        award_degree: 'BSc, BA.Ed',
        p_o_s_status: 'active',
      },
      {
        id: '2',
        p_o_s: 'Ososa',
        c_info: '08000222002',
        email: 'ososa@gmail.com',
        url: 'www.tasued.edu.ng',
        level: '600, 700, 800, 900',
        award_degree: 'Msc, Ph.D PGD, PGDE',
        p_o_s_status: 'active',
      },
      {
        id: '3',
        p_o_s: 'ososa',
        c_info: '08000222002',
        email: 'ososa@gmail.com',
        url: 'www.tasued.edu.ng',
        level: '100',
        award_degree: 'Msc, Ph.D PGD, PGDE',
        p_o_s_status: 'active',
      },
    ]

    return {
      shortname,
      email,
      mobile,
      password,
      mdiAccessPoint,
      mdiFormSelect,
      programs,

      // icons
      icons: {
        mdiAccountOutline,
        mdiEmailOutline,
        mdiCellphone,
        mdiLockOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
      },
    }
  },
}
</script>
