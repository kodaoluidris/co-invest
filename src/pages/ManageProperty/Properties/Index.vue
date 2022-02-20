<template>
    <v-app class="p-4">
        <h2 class="page-title">Properties</h2>
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                    <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Properties</span></h5>
                    <v-btn
                        depressed
                        color="primary"
                        class="float-right"
                        @click="$bvModal.show('create')"
                    >
                        <i class="mdi mdi-plus-circle"></i> Create
                    </v-btn>
                    <VueElementLoading
                        :active="loading"
                        spinner="bar-fade-scale"
                        color="var(--primary)"
                        text="Loading.."
                        duration="0.6"
                    />
                    <div class="mt-3" v-if="properties.data">
                        <v-simple-table  >
                            <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        Index
                                    </th>
                                    <th class="text-left">
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Status
                                    </th>
                                    <th class="text-left">
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
                                    <td >
                                        {{ p.name }}
                                    </td>
                                    <td >
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
                                    <td >
                                        
                                        <v-menu
                                            bottom
                                            origin="center center"
                                            transition="scale-transition"
                                            :close-on-content-click="closeOnContentClick"
                                        >
                                            <template #activator="{ on, attrs }">
                                            <v-btn
                                                v-bind="attrs"
                                                color="primary"
                                                v-on="on"
                                            >
                                                <i class="text-white mdi mdi-cog-outline"></i>
                                            </v-btn>
                                            </template>

                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current(p);$bvModal.show('view');"
                                                    >
                                                    <i class="mdi mdi-square-edit-outline mr-1"></i> View
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current(p); $bvModal.show('edit')"
                                                    >
                                                    <i class="mdi mdi-toggle-switch-outline mr-1"></i> Edit
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-if="p.status == 'active'">
                                                    <v-list-item-title

                                                    style="cursor:pointer"
                                                    @click="openConfirm=true;dynamic_status='inactive';status_id=p.id"
                                                    >
                                                        <button
                                                            class="text-left p-0 btn"
                                                        >
                                                            <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important"> Deactivate</span>
                                                        </button>
                                                    <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Deactivate -->
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item v-else>
                                                    <v-list-item-title
                                                        style="cursor:pointer"
                                                        @click="openConfirm=true;dynamic_status='active';status_id=p.id"
                                                    >
                                                        <button
                                                            class="text-left p-0 btn"
                                                        >
                                                            <i class=" mdi mdi-toggle-switch-outline"></i> <span style="font-size:13px !important"> Activate</span>
                                                        </button>
                                                    <!-- <i class="mdi mdi-toggle-switch-outline mr-1"></i> Activate -->
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="openConfirm2=true;del_id=p.id"
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
                    <div class="col-md-12">
                        <laravelVuePagination :data="properties" @pagination-change-page="fetchData" />
                    </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        <b-modal size="" style="background:white" title="Create Property" id="create" hide-footer>
            <create :my_model="$bvModal" @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="" style="background:white" title="View Property" id="view" hide-footer>
            <viewModal :my_model="$bvModal" :data="current" />
        </b-modal>
        <b-modal size="" style="background:white" title="Edit Property" id="edit" hide-footer>
            <edit :my_model="$bvModal" :data="current" @updated="fetchData()"  />
        </b-modal>
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Change property status to {{dynamic_status}}
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="toggle_status(status_id, dynamic_status);openConfirm=false"

                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="openConfirm2"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Delete property
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm2 = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="deleteProperty(del_id);openConfirm2=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- V Dialog End -->
    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import create from "./partials/Create.vue"
import viewModal from "./partials/View.vue"
import edit from "./partials/Edit.vue"
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import laravelVuePagination from 'laravel-vue-pagination'

export default {
    components:{Widget,create,edit,viewModal,VueElementLoading,laravelVuePagination},
    data(){
        return {
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            properties: { data: [] },
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,

        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
    pass_current(data) {
      this.current = data
    },
    fetchData(page=1) {
      this.loading = true
      axios
        .post(this.dynamic_route('/properties/all?page'+page), {
          filters: this.filters,
        })
        .then(res => {
          this.loading = false
          this.properties = res.data.data
          this.loading = false
        })
        .catch(err => {
          // eslint-disable-next-line no-console
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
   .modal-body {
       background: white !important;
   }
</style>