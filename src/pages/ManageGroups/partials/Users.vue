/* eslint-disable no-console */
<template>
    <div class="_body">
        <form action="" class="p" @submit.prevent="save" v-if="data.group_name">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
          <table class="table table-responsive-sm table-sriped">
              <tr>
                  <th>Fullname</th>
                  <th class="text-center">Total Slot</th>
                  <th>Bought Since</th>
                  <th>Action</th>
              </tr>
              <tr v-for="(u,i) in data.users" :key="i">
                  <td>
                      <p>{{u.fname + ' ' + u.lname}}</p>
                      <p class="d-flex justify-content-between">
                          {{u.email}} 
                          <span class="badge" :class="{
                              'badge-warning': u.gender == 'female',
                              'badge-success': u.gender == 'male',
                              }">{{u.gender}}</span>
                      </p>
                  </td>
                  <td class="text-center">
                      {{u.total_slot}}
                  </td>
                  <td>
                      {{u.created_at}}
                  </td>
                  <td>
                    <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                        :close-on-content-click="closeOnContentClick"
                    >
                        <template #activator="{ on, attrs }">
                            <button  type="button" v-bind="attrs" v-on="on" class="btn btn-primary">
                              <i class="text-white mdi mdi-cog-outline"></i>

                            </button>
                        <!-- <v-btn
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <i class="text-white mdi mdi-cog-outline"></i>
                        </v-btn> -->
                        </template>

                        <v-list>
                            <v-list-item>
                                <v-list-item-title
                                style="cursor:pointer"
                                @click="pass_current(u);openConfirm1=true;"
                                >
                                <i class="mdi mdi-eye-outline mr-1"></i> Remove user from group
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title
                                style="cursor:pointer"
                                @click="passData(u);$bvModal.show('AddToGroup');"
                                >
                                <i class="mdi mdi-square-edit-outline mr-1"></i> Add User To Group
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                 </td>
              </tr>
          </table>

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
        <!--  -->
         <v-dialog
            v-model="openConfirm1"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                Remove user from group
                </v-card-title>

                <v-card-text>
                Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm1 = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="removeFromGroup(current);openConfirm1=false"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
          <!-- <v-dialog
            v-model="openConfirm2"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h5">
                    <div class="alert alert-danger">
                        <b>Note</b> this action is irreversable.
                    </div>
                </v-card-title>

                <v-card-text>
                    In order to proceed, please type the text below 
                </v-card-text>
                 <v-card-text>
                    <span id="rt"></span>
                    <input type="text" class="form-control" name="" id="valInp">
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm2 = false"
                >
                    Exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="removeFromGroup(current);openConfirm2=false"


                >
                    Remove user
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>
<script>
import 'quill/dist/quill.snow.css';
import { quillEditor } from 'vue-quill-editor';
import VueElementLoading from 'vue-element-loading'
import axios from 'axios'
// import ChangeGroup from "./addToGroup.vue"
export default {
    props:['my_model', 'data', 'authToken'],
    components:{ quillEditor,VueElementLoading },
    data() {
        return {
            loading:false,
            dialog_modal:this.dialog,
            form:{},
            current:{},
            closeOnContentClick: true,
            openConfirm1:false,
            openConfirm2:false,
            randomString:'',

        }
    },
    mounted() {
        
    },
    methods:{
        closeMe() {
            this.$bvModal.hide("groupUsers");
        },
        removeFromGroup(data) {
            // return console.log(data);
            this.loading = true;
            let payload = {
                user_id: data.user_id,
                mpg_id: this.data.id,
                slot: data.total_slot
            }
            axios
            .post(this.dynamic_route('/admin/manage-groups/remove-user'), payload, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(() => {
                this.loading = false;
                this.closeMe()
                this.$emit('updated')
                this.$toast.success('User removed from group successfully!', {
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
                this.loading = false
            })

            // }
        },
        pass_current(data) {
            this.current = data
        },
        passData(data){
            this.$emit('data-passed', data);
        },
        generateRandomString(length){
            let result = "", seeds

            for(let i = 0; i < length - 1; i++){
                seeds = [
                    Math.floor(Math.random() * 25) + 65,
                    Math.floor(Math.random() * 25) + 97
                ]
                result += String.fromCharCode(seeds[Math.floor(Math.random() * 2)])
            }
            this.randomString= result.toLowerCase();
            console.log(document.getElementById('rt'));
            document.getElementById('rt').innerHTML = result.toLowerCase();
            return result.toLowerCase()
        }
    },
    mounted(){
        
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