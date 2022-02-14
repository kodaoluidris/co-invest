<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <p class="text-2xl mb-6">
        Property Types
      </p>
      <v-card>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-card-title>Property Types</v-card-title>
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
                <span>Add Property type</span>
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
            v-if="property_types.data"
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
                      Property Name
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
                    v-for="(p,i) in property_types.data"
                    :key="i"
                  >
                    <td>{{ i + 1 }}</td>
                    <td class="text-center">
                      {{ p.name }}
                    </td>
                    <td class="text-center">
                      {{ p.p_name }}
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
                      <div class="dropdown">
                        <button
                          class="border-none btn text-muted dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <i class="text-muted mdi mdi-cog-outline"></i>
                        </button>
                        <div class="dropdown-menu  dropdown-menu-right">
                          <div
                            class="dropdown-item"
                            style="cursor:pointer"
                            @click="pass_current(p);$bvModal.show('view_property_type');"
                          >
                            <i class="mdi mdi-square-edit-outline mr-1"></i> View Details
                          </div>
                          <div
                            class="dropdown-item"
                            style="cursor:pointer"
                            @click="pass_current(p); $bvModal.show('edit_property')"
                          >
                            <i class="mdi mdi-toggle-switch-outline mr-2"></i>Edit
                          </div>
                          <div
                            v-if="p.status == 'active'"
                            class="dropdown-item"
                            style="cursor:pointer"
                            @click="toggle_status(p.id, 'inactive')"
                          >
                            <i class="mdi mdi-toggle-switch-outline mr-2"></i>Deactivate
                          </div>
                          <div
                            v-else
                            class="dropdown-item"
                            style="cursor:pointer"
                            @click="toggle_status(p.id, 'active')"
                          >
                            <i class="mdi mdi-toggle-switch-outline mr-2"></i>Activate
                          </div>
                          <div
                            class="dropdown-item"
                            style="cursor:pointer"
                            @click="deletePropertyType(p.id)"
                          >
                            <i class="mdi mdi-delete-forever-outline mr-2"></i>Delete
                          </div>
                        </div>
                      </div>
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
        :properties="properties"
        @submited="fetchData"
      />
    </b-modal>
    <b-modal
      id="view_property_type"
      hide-footer
      :title="'Property type ' + current.name"
    >
      <viewpropertytypes
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
        :properties="properties"
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
import viewpropertytypes from './partials/View.vue'

export default {
  components: {
    add,
    VueElementLoading,
    viewpropertytypes,
    edit,
  },

  data: () => ({
    icons: {
      mdiDeleteOutline,
      mdiPencilOutline,
    },
    property_types: { data: [] },
    filters: {},
    loading: false,
    current: {},
    properties: [],
  }),

  mounted() {
    this.fetchData()
    this.fetchProperties()
  },

  methods: {
    pass_current(data) {
      this.current = data
    },
    fetchData() {
      this.loading = true
      axios
        .post(this.dynamic_route('/property_types/all'), {
          filters: this.filters,
        })
        .then(res => {
          this.loading = false
          this.property_types = res.data.data
          this.loading = false
        })
        .catch(err => {
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
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchProperties() {
      axios
        .post(this.dynamic_route('/properties/all'), {
          not_paginated: true,
          active_only: true,
        })
        .then(res => {
          this.properties = res.data.data
        })
        .catch(err => {
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
          console.log(err)
        })
        .finally(() => {})
    },
    toggle_status(id, status) {
      swal({
        title: `Change Property type status to ${status} ?`,
        text: 'Are you sure you want to perform this operation?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(result => {
        if (result) {
          this.loading = true
          axios
            .put(this.dynamic_route(`/property_types/toggle-status/${id}`), { id, status })
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
        } else {
          swal('Cancelled', 'Operation Canceled', 'info')
        }
      })
    },
    deletePropertyType(id) {
      swal({
        title: 'Delete Property type ?',
        text: 'Are you sure you want to perform this operation?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then(result => {
        if (result) {
          this.loading = true
          axios
            .delete(this.dynamic_route(`/property_types/${id}`))
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
                return this.$toast.error('Unable to delete property type it has been used in many places!', {
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
        } else {
          swal('Cancelled', 'Operation Canceled', 'info')
        }
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
