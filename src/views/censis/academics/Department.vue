<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <p class="text-2xl mb-6">Department</p>
      <v-card>
        <v-row>
          <v-col cols="12" sm="7">
            <v-card-title>Department</v-card-title>
          </v-col>

          

          <v-col cols="12" sm="2" ml-3>
            
              <v-btn color="primary" class="">
                <v-icon>{{ icons.mdiPlus }}</v-icon>
                <span>Add Department</span>
              </v-btn>
          
          </v-col>

          <v-col cols="12" sm="3">
           
              <v-btn color="secondary" outlined class="mb-4">
                <v-icon size="17" class="me-1">
                  {{ icons.mdiExportVariant }}
                </v-icon>
                <span>Print</span>
              </v-btn>
          
          </v-col>
        </v-row>

        <v-row class="px-2 ma-0">
          <!-- college filter -->
          <v-col cols="12" sm="3">
            <v-select
              v-model="roleFilter"
              placeholder="College"
              :items="roleOptions"
              item-text="title"
              item-value="value"
              outlined
              clearable
              dense
              hide-details
            ></v-select>
          </v-col>

          <!-- department filter -->

          <v-col cols="12" sm="3"> </v-col>

          <v-col cols="12" sm="3"> </v-col>

          <v-col cols="12" sm="3" class="pr-3">
            <v-text-field
              v-model="search"
              :append-icon="icons.mdiMagnify"
              label="Search"
              single-line
              hide-details
              dense
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
          <v-data-table :headers="headers" :search="search" :items="userList" sort-by="calories">
            <!-- action -->
            <template #[`item.actions`]="{ item }">
              <v-icon small class="me-2" @click="editItem(item)">
                {{ icons.mdiPencilOutline }}
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                {{ icons.mdiDeleteOutline }}
              </v-icon>
            </template>

            <!-- name -->
            <template #[`item.full_name`]="{ item }">
              <div class="d-flex align-center">
                <v-avatar
                  :color="item.avatar ? '' : 'primary'"
                  :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
                  size="32"
                >
                  <v-img v-if="item.avatar" :src="require(`@/assets/images/avatars/${item.avatar}`)"></v-img>
                  <span v-else>{{ item.full_name.slice(0, 2).toUpperCase() }}</span>
                </v-avatar>
                <div class="d-flex flex-column ms-3">
                  <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.full_name }}</span>
                  <small>{{ item.post }}</small>
                </div>
              </div>
            </template>

            <!-- salary -->
            <template #[`item.salary`]="{ item }">
              {{ `${item.salary}` }}
            </template>

            <!-- status -->
            <template #[`item.status`]="{ item }">
              <v-chip
                small
                :color="statusColor[status[item.status]]"
                :class="`${statusColor[status[item.status]]}--text`"
                class="v-chip-light-bg"
              >
                {{ status[item.status] }}
              </v-chip>
            </template>
          </v-data-table>

          <!-- dialog -->
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Edit Item</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.dept_name" label="dept_name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.dept_code" label="dept_code" type="number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.dept_email" label="dept_email"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.hod_name" label="hod_name"></v-text-field>
                    </v-col> -->

                    <v-col cols="12" sm="6" md="4">
                      <v-select v-model="editedItem.status" :items="selectOptions" label="Standard"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="close"> Cancel </v-btn>
                <v-btn color="success" @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- dialog -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title> Are you sure you want to delete this item? </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" outlined @click="closeDelete"> Cancel </v-btn>
                <v-btn color="success" @click="deleteItemConfirm"> OK </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiPencilOutline, mdiDeleteOutline, mdiPlus,  } from '@mdi/js'
import DemoDatatableRowEditingViaDialog from '../../tables/datatable/demos/DemoDatatableRowEditingViaDialog.vue'
import data from '../../tables/datatable/dept_datatable'

export default {
  components: {
    DemoDatatableRowEditingViaDialog,
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    icons: {
      mdiDeleteOutline,
      mdiPencilOutline,
      mdiExportVariant,
    },

    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Dept. Name', value: 'dept_name' },
      { text: 'Dept. Code', value: 'dept_code' },
      { text: 'Dept. Email', value: 'dept_email' },
      // { text: 'HOD Name', value: 'hod_name' },
      { text: 'STATUS', value: 'status' },
      { text: 'ACTIONS', value: 'actions' },
    ],
    status: {
      1: 'Current',
      2: 'Professional',
      3: 'Rejected',
      4: 'Resigned',
      5: 'Applied',
    },
    selectOptions: [
      { text: 'Current', value: 1 },
      { text: 'Professional', value: 2 },
      { text: 'Rejected', value: 3 },
      { text: 'Resigned', value: 4 },
      { text: 'Applied', value: 5 },
    ],
    // icons
    icons: {
      mdiPlus,
    },

    statusColor: {
      /* eslint-disable key-spacing */
      Current: 'primary',
      Professional: 'success',
      Rejected: 'error',
      Resigned: 'warning',
      Applied: 'info',
      /* eslint-enable key-spacing */
    },
    userList: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.userList = JSON.parse(JSON.stringify(data))
    },

    editItem(item) {
      this.editedIndex = this.userList.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.userList.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.userList.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.userList[this.editedIndex], this.editedItem)
      } else {
        this.userList.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
