<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <p class="text-2xl mb-6">
        Properties
      </p>
      <v-card>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-card-title>Properties</v-card-title>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <div class="d-flex align-center flex-wrap">
              <v-btn
                color="primary"
                class=""
                @click="$bvModal.show('add')"
              >
                <v-icon>{{ icons.mdiPlus }}</v-icon>
                <span>Add Property</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <div>
          <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <div
            v-if="properties.data"
            class="col-md-12"
          >
            <v-simple-table dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-uppercase text--primary">
                      Index
                    </th>
                    <th class="text-center text-uppercase text--primary">
                      Name
                    </th>
                    <th class="text-center text-uppercase text--primary">
                      Status
                    </th>
                    <th class="text-center text-uppercase text--primary">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(p,i) in properties.data"
                    :key="i"
                  >
                    <td>{{ i + 1 }}</td>
                    <td class="text-center">
                      {{ p.name }}
                    </td>
                    <td class="text-center">
                      <span
                        class="badge"
                        :class="{
                          'badge-success' : p.status == 'active',
                          'badge-danger' : p.status == 'inactive',
                        }"
                      >
                        {{ p.status }}
                      </span>
                    </td>
                    <td class="text-center">
                      <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                      >
                        <template #activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                          >
                            <i class="text-white mdi mdi-cog-outline"></i>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor:pointer"
                              @click="pass_current(p);$bvModal.show('view_property');"
                            >
                              <i class="mdi mdi-square-edit-outline mr-1"></i> View
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor:pointer"
                              @click="pass_current(p); $bvModal.show('edit_property')"
                            >
                              <i class="mdi mdi-toggle-switch-outline mr-1"></i> Edit
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item v-if="p.status == 'active'">
                            <v-list-item-title

                              style="cursor:pointer"
                              @click="toggle_status(p.id, 'inactive')"
                            >
                              <v-dialog
                                v-model="isDialogVisible"

                                width="500"
                              >
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    class="text-left p-0"
                                    v-on="on"
                                  >
                                    <v-list-item-title
                                      class="text-transform-capitalize"
                                    >
                                      <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important">Deactivate</span>
                                    </v-list-item-title>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-card-title
                                    class="headline"
                                    style="font-size:1.1rem !important"
                                  >
                                    Change Property status to inactive ?
                                  </v-card-title>
                                  <v-card-text>Are you sure you want to perform this operation.</v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="error"
                                      outlined
                                      @click="isDialogVisible = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="success"
                                      @click="isDialogVisible = false;toggle_status(p.id, 'inactive')"
                                    >
                                      Change
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Deactivate -->
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item v-else>
                            <v-list-item-title>
                              <v-dialog
                                v-model="isDialogVisible"

                                width="500"
                              >
                                <template #activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    class="text-left p-0"
                                    v-on="on"
                                  >
                                    <v-list-item-title
                                      class="text-transform-capitalize"
                                    >
                                      <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important">Activate</span>
                                    </v-list-item-title>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-card-title
                                    class="headline"
                                    style="font-size:1.1rem !important"
                                  >
                                    Change Property status to active ?
                                  </v-card-title>
                                  <v-card-text>Are you sure you want to perform this operation.</v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="error"
                                      outlined
                                      @click="isDialogVisible = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="primary"
                                      outlined
                                      @click="isDialogVisible = false;toggle_status(p.id, 'active')"
                                    >
                                      Change
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Activate -->
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title
                              style="cursor:pointer"
                              @click="deleteProperty(p.id)"
                            >
                              <i class="mdi mdi-delete-forever-outline mr-1"></i> Delete
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
          <div
            v-else
            class="col-md-12 alert alert-info text-center"
          >
            <p>No record found</p>
          </div>
        </div>
      </v-card>
    </v-col>
    <!-- Modals -->
    <b-modal
      id="add"
      hide-footer
      title="Add property"
    >
      <add
        :my_modal="$bvModal"
        @submitted="fetchData"
      />
    </b-modal>
    <b-modal
      id="view_property"
      hide-footer
      :title="'Property ' + current.name"
    >
      <viewproperty
        :my_modal="$bvModal"
        :data="current"
      />
    </b-modal>
    <b-modal
      id="edit_property"
      hide-footer
      :title="'Edit Property ' + current.name"
    >
      <edit
        :my_modal="$bvModal"
        :data="current"
        @updated="fetchData"
      />
    </b-modal>
  </v-row>
</template>

<script>
import { mdiPencilOutline, mdiDeleteOutline, mdiPlus } from '@mdi/js'
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import swal from 'sweetalert'
import add from './partials/Create.vue'
import edit from './partials/Edit.vue'
import viewproperty from './partials/View.vue'

export default {
  components: {
    add,
    VueElementLoading,
    viewproperty,
    edit,
  },

  data: () => ({
    icons: {
      mdiDeleteOutline,
      mdiPencilOutline,
    },
    properties: { data: [] },
    filters: {},
    loading: false,
    current: {},
    isDialogVisible: false,
  }),

  mounted() {
    this.fetchData()

    // this.$notification('Good job!', 'You clicked the button!', 'success', 'A minute ago')
  },

  methods: {
    pass_current(data) {
      this.current = data
    },
    fetchData() {
      this.loading = true
      axios
        .post(this.dynamic_route('/properties/all'), {
          filters: this.filters,
        })
        .then(res => {
          this.loading = false
          this.properties = res.data.data
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    toggle_status(id, status) {
      this.loading = true
      axios
        .put(this.dynamic_route(`/properties/toggle-status/${id}`), { id, status })
        .then(() => {
          this.fetchData()
          this.$toast.success('Status updated successfully!', {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        })
        .catch(() => {
          this.loading = false
          this.$toast.error('An error occurred please try again!', {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    deleteProperty(id) {
      this.loading = true
      axios
        .delete(this.dynamic_route(`/properties/${id}`))
        .then(() => {
          this.fetchData()
          this.$toast.success('Deleted successfully!', {
            position: 'top-center',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          })
        })
        .catch(err => {
          this.loading = false
          if (err.response.status == 500) {
            return this.$toast.error('Unable to delete property  it has been used in many places!', {
              position: 'top-center',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: 'button',
              icon: true,
              rtl: false,
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
.badge-success {
  background-color: #28a745 !important;
}
.badge-danger {
  background-color: #dc3545 !important;
}
</style>
