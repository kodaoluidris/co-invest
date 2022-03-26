<template>
    <v-app class="p-4">
        <h2 class="page-title">Main Properties</h2>
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Main Properties</span></h5>
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
                <div class="mt-3" v-if="main_properties.data">
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
                                     Property Type Name
                                </th>
                                <th class="text-left">
                                     Price
                                </th>
                                <th class="text-center">
                                     Group No
                                </th>
                                <th class="text-center">
                                    Status
                                </th>
                                <th class="text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(p,i) in main_properties.data"
                                :key="i" 
                            >
                               <td>{{ i + 1 }}</td>
                                <td>
                                {{ p.name }}
                                </td>
                                <td>
                                {{ p.pt_name }}
                                </td>
                                <td>
                                    {{Number(p.price).toLocaleString()}}
                                </td>
                                <td class="text-center">
                                    {{p.groups}}
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
                                <td class="text-right">
                                    <v-menu
                                        bottom
                                        origin="center center"
                                        transition="scale-transition"
                                        :close-on-content-click="closeOnContentClick"
                                    >
                                        <template #activator="{ on, attrs }">
                                        <v-btn
                                            color="primary"
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
                                                @click="pass_current(p);$bvModal.show('view');"
                                                >
                                                <i class="mdi mdi-eye-outline mr-1"></i> View more info
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item v-if="!p.group_allocated">
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current(p);$bvModal.show('groups');"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Manage Groups
                                                </v-list-item-title>
                                            </v-list-item>
                                             <v-list-item v-else>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current(p);$bvModal.show('edit_groups');"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Edit allocated groups
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current_img(p.image,p.name);$bvModal.show('view_image');"
                                                >
                                                <i class="mdi mdi-eye-outline mr-1"></i> View Images
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current(p); $bvModal.show('edit')"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Edit
                                                </v-list-item-title>
                                            </v-list-item>
                                             <v-list-item>
                                                <v-list-item-title
                                                    style="cursor:pointer"
                                                    @click="pass_current(p); $bvModal.show('more_info')"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Add more info
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
                </Widget>
            </b-col>
        </b-row>

        <!-- Modals -->
        <b-modal size="lg" style="background:white" title="Main Property" id="create" hide-footer>
            <create :my_model="$bvModal" :authToken="authToken" :property_types="property_types" @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="lg" style="background:white" :title="'Manage  groups ( total price ₦ ' + c_price + ')'" id="groups" hide-footer>
            <manageGroup :my_model="$bvModal" :authToken="authToken" :main_property="current" @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="lg" style="background:white" :title="'Add More Info to ' + current.name" id="more_info" hide-footer>
            <addMoreInfo :my_model="$bvModal" :authToken="authToken" :main_property="current" @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="lg" style="background:white" :title="'Edit  groups allocation (total price ₦ ' + price + ')'" id="edit_groups" hide-footer>
            <editGroup :my_model="$bvModal" :authToken="authToken" :main_property="current" @submitted="fetchData()"  />
        </b-modal>
        <b-modal size="lg" style="background:white" title="View Main Property" id="view" hide-footer>
            <viewModal :my_model="$bvModal" :data="current" :property_types="property_types"  />
        </b-modal>
         <b-modal size="lg" style="background:white" title="View Main Property Image" id="view_image" hide-footer>
            <viewImageModal :my_model="$bvModal" :data="current_img" :main_name="main_name" />
        </b-modal>
        <b-modal size="lg" style="background:white" title="Edit Main Property" id="edit" hide-footer>
            <edit :my_model="$bvModal" :authToken="authToken" :data="current" :property_types="property_types" @updated="fetchData()"  />
        </b-modal>
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="550"
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
                    @click="deleteMainProperty(del_id);openConfirm2=false"


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
import manageGroup from "./partials/ManageGroups.vue"
import addMoreInfo from "./partials/AddMoreInfo.vue"
import editGroup from "./partials/EditGroups.vue"
import viewModal from "./partials/View.vue"
import viewImageModal from "./partials/Images.vue"
import edit from "./partials/Edit.vue"
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';

export default {
    components:{
        Widget,create,edit,viewModal,
        VueElementLoading,viewImageModal,
        manageGroup,editGroup,addMoreInfo
    },
    data(){
        return {
            current_img:[],
            main_name:'',
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            openConfirm2:false,
            dialog:false,
            current:{},
            main_properties: { data: [] },
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,
            property_types:[],
            c_price:'',
            price:'',

        }
    },
    computed:{
        ...mapState('page',['authToken']),
        filter_price(val) {
            return val.toLocaleString()
        }
    },
    mounted() {
        this.fetchData();
        this.fetchPropertyTypes();
        this.getAuthData();
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        pass_current(data) {
            this.c_price = data.price.toLocaleString()
            this.current = data
        },
        pass_current_img(data,name) {
        this.current_img = data;
        this.main_name=name;
        },
        fetchData() {
        this.loading = true
        axios
            .post(this.dynamic_route('/main_properties/all'), {
            filters: this.filters,
            }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(res => {
            this.loading = false
            this.main_properties = res.data.data
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
        fetchPropertyTypes() {
        axios
            .post(this.dynamic_route('/property_types/all'), {
            not_paginated: true,
            active_only: true,
            }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(res => {
            this.property_types = res.data.data;
            })
            .catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
            // eslint-disable-next-line no-console
            console.log(err)
            })
            .finally(() => {})
        },
        toggle_status(id, status) {
        this.loading = true
        axios
            .put(this.dynamic_route(`/main_properties/toggle-status/${id}`), { id, status }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
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
            .catch((err) => {
            this.loading = false;
            if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
            }
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
        deleteMainProperty(id) {
        this.loading = true
        axios
            .delete(this.dynamic_route(`/main_properties/${id}`), {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
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
            this.loading = false;
            if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
            }
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