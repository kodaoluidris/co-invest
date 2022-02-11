<template>
  <v-card>
    <v-card-title>
      Manage Study Mode
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="" small v-bind="attrs" v-on="on">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
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
                      {{ item.p_o_s }}
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
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-title>
    <v-card-text> </v-card-text>
  </v-card>
</template>

<script>
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

export default {
  props: {
    study_programme_id: '',
  },
  data: () => ({
    dialog: false,




    study_mode: [
      {
        id: 1,
        name: 'Full Time',
        status: 'active',
      },
      {
        id: 2,
        name: 'Full Time',
        status: 'active',
      },
      {
        id: 3,
        name: 'Full Time 2',
        status: 'active',
      },
    ],

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
  }),
}
</script>

<style>
</style>
