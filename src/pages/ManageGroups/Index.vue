<template>
    <v-app class="p-4">
        <h2 class="page-title">Property Groups And Users</h2>
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                <!-- <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Main Properties</span></h5> -->
                <!-- <v-btn
                    depressed
                    color="primary"
                    class="float-right"
                    @click="$bvModal.show('create')"
                >
                    <i class="mdi mdi-plus-circle"></i> Create
                </v-btn> -->
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                <div class="mt-3" v-if="userGroups.data">
                    <v-simple-table  >
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Index
                                </th>
                                <th style="width:27%" class="text-left">
                                    Property Details
                                </th>
                                <th class="text-left">
                                    Group Details And User Details
                                </th>
                                <!-- <th class="text-center">
                                    Status
                                </th>
                                <th class="text-right">
                                    Action
                                </th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(p,i) in userGroups.data"
                                :key="i" 
                            >
                               <td>{{ i + 1 }}</td>
                                <td>
                                    <div class="mt-4 d-flex">
                                        <img :src="p.image[0].image" 
                                            style="
                                                width:15%;
                                                float:lseft;
                                                
                                            " 
                                            alt=""
                                        >
                                        <div class="ml-2">
                                            <h4 class="mb-1" style="font-weight:300">

                                                {{p.name}}
                                            </h4>
                                            <p class="mb-1">₦ {{Number(p.price).toLocaleString()}}</p>
                                            <div class="d-flex justify-content-between">
                                                <b>Groups</b> <span>{{p.groups}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p data-toggle="collapse" :data-target="'#demo'+i" class="mt-2 mb-0" style="cursor:pointer">Click to view  description</p>
                                        <div :id="'demo'+i" class="collapse">
                                            <p class="pt-2 text-muted" v-html="p.description">
                                                
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   <div> 
                                       <div v-if="p.all_groups.length"> 
                                            <table class="mb-0 shadow-sm table table-responsive-sm"  >
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <!-- <th>Price</th> -->
                                                        <th>Slot & Registered</th>
                                                        <th>User</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(g,i) in p.all_groups" :key="i">
                                                        <td>{{g.group_name}}</td>
                                                        <!-- <td>₦ {{Number(g.group_price).toLocaleString()}}</td> -->
                                                        <td> 
                                                            <div class="d-flex justify-content-between">
                                                                <div>
                                                                    Slot <span class="badge badge-info">{{g.no_of_people}}</span>
                                                                </div>
                                                                    <div>
                                                                    Reg <span class="badge badge-info">{{g.no_of_people_reg}}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {{g.users.length}} users
                                                        </td>
                                                        <td>
                                                            <span
                                                                class="badge"
                                                                :class="{
                                                                'badge-success' : g.status == 'active',
                                                                'badge-danger' : g.status == 'inactive',
                                                                }"
                                                            >
                                                                {{ g.status }}
                                                            </span>
                                                        </td>
                                                        <td>
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
                                                                        <v-list-item v-if="g.users.length"> 

                                                                            <v-list-item-title
                                                                            style="cursor:pointer"
                                                                            @click="pass_current(g);$bvModal.show('groupUsers');"
                                                                            >
                                                                            <i class="mdi mdi-eye-outline mr-1"></i> Manage Users
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-title
                                                                            style="cursor:pointer"
                                                                            @click="pass_current(p);$bvModal.show('groups');"
                                                                            >
                                                                            <i class="mdi mdi-square-edit-outline mr-1"></i> Manage Groups Settings
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item>
                                                                            <v-list-item-title
                                                                                v-if="g.status =='active'"
                                                                                style="cursor:pointer"
                                                                                @click="openConfirm=true;current=g;dynamic_status='inactive'"
                                                                            >
                                                                            <i class="mdi mdi-square-edit-outline mr-1"></i> Deactivate group status
                                                                            </v-list-item-title>
                                                                              <v-list-item-title
                                                                                v-else
                                                                                style="cursor:pointer"
                                                                                @click="openConfirm=true;current=g;dynamic_status='active'"
                                                                            >
                                                                            <i class="mdi mdi-square-edit-outline mr-1"></i> Activate group status
                                                                            </v-list-item-title>

                                                                        </v-list-item>
                                                                    </v-list>
                                                                </v-menu>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                               
                                            </table>
                                             <div v-if="p.all_groups.length > 2">
                                                    <button class="btn btn-block btn-susccess"> View More</button>
                                                </div>
                                       </div>
                                      
                                       <div class="alert alert-info" v-else>
                                           <p>No Groups Found.</p>
                                       </div>
                                   </div>
                                </td>
                                <!-- <td class="text-center">
                                    <span
                                        class="badge"
                                        :class="{
                                        'badge-success' : p.status == 'active',
                                        'badge-danger' : p.status == 'inactive',
                                        }"
                                    >
                                        {{ p.status }}
                                    </span>
                                </td> -->
                                <!-- <td class="text-right">
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
                                    </v-menu>
                                </td> -->
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
     
        <!-- User Groups Modals -->
         <b-modal size="xl" style="background:white" title="List of property and their respective groups " id="AddToGroup" hide-footer>
            <addToGroup :my_model="$bvModal" :authToken="authToken" :data="userGroups.data" :user="selecteduser" @updated="fetchData()"  />
        </b-modal>
          <!-- User Groups Modals -->
         <b-modal size="lg" style="background:white" :title="'Manage ' + current.group_name + ' Users'" id="groupUsers" hide-footer>
            <userGroup :my_model="$bvModal" :authToken="authToken" :data="current" @data-passed="passEventData"  @updated="fetchData()"  />
        </b-modal>
        <!-- Modals end -->
        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width="550"
        >
            <v-card>
                <v-card-title class="text-h5">
                Change Group status to {{dynamic_status}}
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
                    @click="deactivate();openConfirm=false"

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
import userGroup from "./partials/Users.vue"
import addToGroup from "./partials/addToGroup.vue"
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';

export default {
    components:{
        Widget,
        VueElementLoading,
        addToGroup,userGroup,
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
            userGroups: { data: [] },
            filters: {},
            loading: false,
            isDialogVisible: false,
            closeOnContentClick: true,
            c_price:'',
            price:'',
            selecteduser:{}

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
        this.getAuthData();
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        pass_current(data) {
            this.current = data
        },
        
        fetchData() {
        this.loading = true
           axios
            .post(this.dynamic_route('/admin/manage-groups/all'), {
            filters: this.filters,
            }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(res => {
              this.loading = false
              this.userGroups = res.data
            })
            .catch(err => {
            // eslint-disable-next-line no-console
            })
            .finally(() => {
            this.loading = false
            })
        },
        deactivate(id) {
        this.loading = true
        let payload={
            status: this.dynamic_status,
            id: this.current.id,
        }
        axios
            .post(this.dynamic_route(`/admin/manage-groups/change-status`),payload, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
            this.fetchData()
            this.$toast.success('Updated successfully!', {
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
        getVal(data) {
            return [data[0], data[1]];
        },
        passEventData(data) {
            this.selecteduser=data
        }
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>