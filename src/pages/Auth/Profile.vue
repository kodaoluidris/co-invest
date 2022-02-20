/* eslint-disable no-console */
/* eslint-disable no-console */
<template>
    <v-app class="p-4">
        <h2 class="page-title">Profile Page</h2>
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                <!-- <h5 class="d-inline-block">Manage  <span class='fw-semi-bold'>Your Profile</span></h5> -->
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                    <h1 class="text-muted font-weight-light">Hi, {{form.fname}}</h1>
                    <V-form class="mt-4" @submit.prevent="save">
                        <v-row>
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="First name*"
                                v-model="form.fname"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="Last name*"
                                v-model="form.lname"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="Middle name*"
                                v-model="form.mname"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <!--  -->
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="User name*"
                                v-model="form.username"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="Email*"
                                v-model="form.email"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="4"
                                md="4"
                                class="mb-2"
                            >
                                <v-text-field
                                label="Phone*"
                                v-model="form.phone"
                                :rules="nameRule"
                                required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                class="mb-2"
                            >
                                <v-select
                                    v-model="form.gender"
                                    :items="['male', 'female']"
                                    label="Gender*"
                                    :rules="nameRule"
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="6"
                                class="mt-4"
                            >
                               <v-select
                                    v-model="form.country"
                                    :items="countries"
                                    label="Country*"
                                    item-text="name"
                                    item-value="name"
                                    :rules="nameRule"
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <button
                                class="btn btn-primary"
                                type="submit"
                            >
                                Save
                            </button>
                        </v-card-actions>
                    </V-form>
                </Widget>
            </b-col>
        </b-row>

    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import countries from './Countries.json';
export default {
    components:{VueElementLoading,Widget},
    data(){
        return {
            loading: false,
            form: {},
            countries: countries,
            nameRule: [
                v => !!v || 'Field is required',
            ],
        }
    },
    computed:{
        ...mapState('page', ['authData','authToken'])
    },
    mounted() {
        delete this.authData.created_at;
        delete this.authData.email_verified_at;
        delete this.authData.updated_at;
        delete this.authData.user_type_id;
        this.form = this.authData;
        this.fetchData();

    },
    methods: {
        ...mapActions([]),
        fetchData() {
        this.loading = true
        axios
            .post(this.dynamic_route('/main_properties/all'), {
            filters: this.filters,
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
        
        save() {
            // if(Object.keys(this.form).length != 8) {
            //     return this.$toast.error('All fields are required!', {
            //         position: 'top-center',
            //         timeout: 5000,
            //         closeOnClick: true,
            //         pauseOnFocusLoss: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         draggablePercent: 0.6,
            //         showCloseButtonOnHover: false,
            //         hideProgressBar: true,
            //         closeButton: 'button',
            //         icon: true,
            //         rtl: false,
            //     })
            // }
            this.loading=true;

            axios.post(this.dynamic_auth_route('/complete-profile'), this.form, {
                headers:{
                    authorization: `Bearer ${this.authToken}`
                }
            })
            .then(res => {
                this.$toast.success(res.data.message, {
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
                });
                this.loading=false;
                this.$router.push({name: 'AnalyticsPage'});
            }).catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                this.$toast.error(err.response.data.message, {
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
                });
                this.loading=false;
            }).finally(() => {
                this.loading=false;
            })
        }
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>