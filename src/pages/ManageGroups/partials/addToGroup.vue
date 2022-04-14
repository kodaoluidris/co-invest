/* eslint-disable no-console */
<template>
    <div class="_body">
        <form action="" class="p">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <div class="alert alert-info shadow-sm">
               <p><b>Note</b> Below are the list of <b>only</b> active group for any selected Main property</p>
               <h4>You are about to Add user <span class="text-warning">{{user.fname + ' ' + user.lname}}</span> to a new group.</h4>
          </div>
            <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <div class="input-group-text">Main Property</div>
                </div>
                <select @change="groupData()" v-model="filters.main_property_id" name="" class="form-control custom-select" id="">
                    <option   v-for="(m,i) in data" :value="m.id" :key="i">{{m.name}}</option>
                </select>
               
            </div>
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <table class="table table-responsive-sm table-hover">
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                <th class="text-center">Slots</th>
                                <th class="text-center">Group price</th>
                                <th class="text-center">Belong's Here</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(g,i) in groupData()" :key="i">
                                <td>{{g.group_name}}</td>
                                <td> 
                                    <div class="d-flex justify-content-between">
                                        <p class="mb-0">Slot <span class="badge badge-secondary">{{g.no_of_people}}</span></p>
                                        <p class="mb-0">Available <span class="badge badge-secondary">{{g.no_of_people - g.no_of_people_reg}}</span></p>
                                    </div>
                                </td>
                                <td class="text-center">₦ {{Number(g.group_price).toLocaleString()}}</td>
                                <td class="text-center">
                                    <span>{{user.main_property_group_id == g.id ? 'Yes' : 'No'}}</span>
                                </td>
                                <td>
                                    <button 
                                    type="button"
                                    @click="openConfirm1=true;current=g"
                                    :disabled="g.no_of_people == g.no_of_people_reg || user.main_property_group_id == g.id" 
                                    class="btn btn-primary">Add Here</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <v-card-actions style="margin-top:100px">
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="closeMe()"
                >
                    Close
                </v-btn>
                <!-- <button
                    class="btn btn-primary"
                    type="submit"
                >
                    Save
                </button> -->
            </v-card-actions>

        </form>
          <v-dialog
            v-model="openConfirm1"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h6">
                Number of slot to acquire in this group
                </v-card-title>

                <v-card-text>
                    <p>Group available slot <b>{{current.no_of_people - current.no_of_people_reg}}</b></p>
                    <input type="text" v-model="form.slot" class="form-control" name="" id="">
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm1 = false"
                >
                    Exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="addToGroup()"


                >
                    Add
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
          <v-dialog
            v-model="loadModal"
            hide-overlay
            persistent
            width="300"
        >
            <v-card
                color="primary"
                dark
            >
                <v-card-text class="pt-2">
                Processing your request, please stand by
                <b-spinner />
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mt-3 mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'

export default {
    props:['my_model', 'data', 'authToken', 'user'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            openConfirm1:false,
            loadModal:false,
            current:{},
            loading:false,
            dialog_modal:this.dialog,
            nameRules: [
                v => !!v || 'No of people is required',
            ],
            groupRules: [
                v => !!v || 'Group price is required',
            ],
            form:{slot:1},
            filters:{main_property_id:this.data[0].id},
            groups:[]
        }
    },
    mounted() {
        console.log(this.user);
    //    console.log(this.groupData());
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("AddToGroup");
        },
        addToGroup() {
            if(this.form.slot >(this.current.no_of_people - this.current.no_of_people_reg)) {
                this.$toast.error('Not enough slot, try reduce the user slot and try again!', {
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
            } else {
                
                this.loadModal = true;
                let payload = {
                    main_property_group_id: this.current.id,
                    user_id: this.user.user_id,
                    slot: this.form.slot,
                    amount: this.current.group_price
                }
                axios
                .post(this.dynamic_route('/admin/manage-groups/add-user'), payload, {
                    headers:{
                      authorization: `Bearer ${this.authToken}`
    
                    }
                })
                .then(() => {
                    this.loadModal = false;
                    this.openConfirm1=false
                    this.$toast.success('Added successfully!', {
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
                    this.loadModal = false;
                    if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                        return this.logoutUser();
                    }
                    this.$toast.error('An error occurred, try again later!', {
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
                    this.loadModal = false
                })
            }
                

            // }
        },
        groupData(){
            return this.data.find(el => {
                if(el.id == this.filters.main_property_id) return 2
            }).all_groups.filter(item => item.status == 'active')
        }
    }
}
</script>
<style scoped>
    .modal-body {
       background: white !important;
    }

    ._body {
        height:auto !important;
    }
</style>