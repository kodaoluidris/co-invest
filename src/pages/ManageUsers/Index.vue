<template>
  <div class="tables-basic" data-app>
    <h2 class="page-title">Manage <span class="fw-semi-bold">Users</span></h2>
    <b-row>
      <b-col>
          <Widget
                title="<h5>All <span class='fw-semi-bold'>Users</span></h5>"
                bodyClass="widget-table-overflow"
                customHeader
            >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                />
                <div class="table-responsive mt-4">
                    <table class="table table-hover table-sm mb-0 requests-table">
                        <thead>
                            <tr>
                                <th class="hidden-sm-down">#</th>
                                <th class="hidden-sm-down">Users Info</th>
                                <th class="hidden-sm-down">Username</th>
                                <th class="hidden-sm-down">Phone </th>
                                <th class="hidden-sm-down">Gender</th>
                                <th class="hidden-sm-down">Country</th>
                                <th class="hidden-sm-down">User Type</th>
                                <th class="hidden-sm-down">Status</th>
                                <th class="hidden-sm-down text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user.id">
                                <td>{{index+1}}</td>
                                <td>
                                    <span class="d-flex pt-2">
                                        <span>
                                            <span class="b-avatar rounded-circle" :class="getRandomBadgeClass()" 
                                                style="width: 38px; height: 38px; font-weight: 600">
                                                {{getInitials(user.fullname)}}
                                            </span>
                                        </span>
                                        <span class="ml-3">
                                            <!-- <p class="mb-0"> -->
                                                    <span class="fw-semi-bold">&nbsp; {{user.fullname}}</span>
                                            <!-- </p> -->
                                            <p>
                                                <small>
                                                    <span class="text-semi-muted">&nbsp; {{user.email}}</span>
                                                </small>    
                                            </p>
                                        </span>
                                    </span>
                                </td>
                                <td class="text-dark">
                                    {{user.username ? user.username : '-'}}
                                </td>
                                <td class="text-dark">
                                    {{user.phone ? user.phone : '-'}}
                                </td>
                                <td class="text-dark text-capitalize">
                                    {{user.gender}}
                                </td>
                                <td class="text-dark">
                                    {{user.country ? user.country : '-'}}
                                </td>
                                <td class="font-weight-bolder">
                                    <span class="badge badge-pill"
                                        :class="user.user_type.name == 'user' ? 'badge-light-info' : 'badge-light-warning'"> 
                                        {{user.user_type.name}} 
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-pill"
                                        :class="user.status == 'active' ? 'badge-light-primary' : 'badge-light-danger'"> 
                                        {{user.status}} 
                                    </span>
                                </td>
                                <td class="text-center" style="font-size: 18px">
                                    <v-menu
                                        bottom
                                        origin="center center"
                                        transition="scale-transition"
                                        :close-on-content-click="closeOnContentClick"
                                    >
                                        <template #activator="{ on, attrs }">
                                            <v-btn
                                                color="black"
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <i class="fa fa-list-ul"></i>
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="pass_current(user);$bvModal.show('view');"
                                                >
                                                <i class="mdi mdi-eye-outline mr-1"></i> View more info
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title
                                                style="cursor:pointer"
                                                @click="setCurrent(user); $bvModal.show('edit')"
                                                >
                                                <i class="mdi mdi-square-edit-outline mr-1"></i> Edit Details
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item v-if="user.status == 'active'">
                                                <v-list-item-title

                                                style="cursor:pointer"
                                                @click="openConfirm=true;dynamic_status='inactive';status_id=user.id"
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
                                                    @click="openConfirm=true;dynamic_status='active';status_id=user.id"
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
                                                @click="openConfirm2=true;del_id=user.id"
                                                >
                                                <i class="mdi mdi-delete-forever-outline mr-1"></i> Delete
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Widget>
      </b-col>
    </b-row>

    <b-modal size="md" style="background:white" title="Edit user details" id="edit" hide-footer>
        <edit :authToken="auth_token" :user="currentUser" @updated="getUsers" />
    </b-modal>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
import edit from '@/pages/ManageUsers/Partials/EditUser'

export default {
  name: 'Tables',
  components: { Widget, VueElementLoading, edit },
  data() {
    return {
        loading: false,
        users: {},
        status_id:0,
        del_id:0,
        dynamic_status:'',
        openConfirm:false,
        openConfirm2:false,
        dialog:false,
        isDialogVisible: false,
        closeOnContentClick: true,
        currentUser: {}
    };
  },
  computed:{
    ...mapState('auth', ['auth_data','auth_token']),
  },
  methods: {
    ...mapActions('auth', ['getAuthData']),
    getInitials(fullname) {
        const allNames = fullname.trim().split(' ');
        const initials = allNames.reduce((acc, curr, index) => {
            if(index === 0 || index === allNames.length - 1){
                acc = `${acc}${curr.charAt(0).toUpperCase()}`;
            }
            return acc;
        }, '');
        return initials;
    },
    getUsers(){
        this.loading = true
        axios.get(this.dynamic_route('/users/fetch'), {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }).then((res)=> {
                this.users = res.data
                res.data.forEach(user => {
                    if(user.mname) {
                        Object.assign(user, { fullname: user.lname + ' '  + user.fname + ' ' + user.mname})
                    } else {
                        Object.assign(user, { fullname: user.lname + ' '  + user.fname })
                    }
                });
            })
            .finally(() => this.loading = false)
    },
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    setCurrent(data) {
        this.currentUser = data
    },
    getRandomBadgeClass() {
    //   const {primary, success, info, danger} = this.appConfig.colors;
      const colors = ['badge-light-info', 'badge-light-primary', 'badge-light-danger', 
                    'badge-light-success', 'badge-light-warning', 'badge-light-secondary'];
      return colors[Math.floor(Math.random() * colors.length)]
    }
  },
  mounted() {
    this.getAuthData()
    this.getUsers()
  }
};
</script>

<style scoped>
.tables-basic .widget {
    border: none;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    border-radius: 0.7rem !important;
    background-color: #ffffff !important;
}
.requests-table td {
    font-size: 14px;
    vertical-align: middle;
    padding-top: 1px !important;
    padding-bottom: 1px !important;
}
</style>

