<template>
    <v-app class="p-4">
        <h2 class="page-title">Admin Quick Sales</h2>
        <div class="alert alert-info shadow-sm">
            <h4>Below.</h4>
            <p>Is where you find list of investors that needs urgent sale on thier property portion but no prospective buyers in thier groups.</p>
            <p><b>You can take it from here</b></p>
        </div>
        <b-row>
            <b-col>
                <Widget
                title=""
                customHeader
                >
                <h5 class="d-inline-block">{{investorsSale.data.length}} <span class='fw-semi-bold'>Investors found</span></h5>
               
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                <div class="mt-3" v-if="investorsSale.data.length">
                    <v-simple-table  >
                        <template v-slot:default>
                        <thead>
                            <tr class="pt-2">
                                <th class="text-left">
                                    Index
                                </th>
                                <th class="text-left">
                                    User's Info
                                </th>
                                <th class="text-left">
                                     Property Info
                                </th>
                                <th class="text-left">
                                     Paid Price
                                </th>
                                <th class="text-center">
                                    Sale Status
                                </th>
                                <th class="text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(p,i) in investorsSale.data"
                                :key="i" 
                            >
                               <td>{{ i + 1 }}</td>
                                <td>
                                    <div>
                                        <p>{{p.lname + ' ' +p.fname}}</p>
                                        <p>{{p.email}}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p>{{p.name}}</p>
                                        <p>{{p.pt_name}} <span class="float-right badge badge-info">{{Number(p.price).toLocaleString()}}</span></p>
                                        <!-- <p>{{p.pt_name}} <span class="badge badge-info">{{p.groups}}</span></p> -->
                                    </div>
                                </td>
                                 <td>
                                    {{Number(p.paid_price).toLocaleString()}}
                                </td>
                                <td class="text-center">
                                    <span
                                        class="badge"
                                        :class="{
                                        'badge-warning' : p.sale_status == 'processing',
                                        'badge-success' : p.sale_status == 'approved',
                                        }"
                                    >
                                        {{ p.sale_status }}
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
                                                @click="current=p;openConfirm=true"
                                                >
                                                Buy
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

        <!-- V Dialog -->
        <v-dialog
            v-model="openConfirm"
            max-width=550
        >
            <v-card>
                <v-card-title class="text-h5">
                Buy property
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
                    @click="toggle_status();openConfirm=false"

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
import axios from 'axios'
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';

export default {
    components:{
        Widget,
        VueElementLoading,
    },
    data(){
        return {
            main_name:'',
            status_id:0,
            del_id:0,
            dynamic_status:'',
            openConfirm:false,
            dialog:false,
            current:{},
            investorsSale: { data: [] },
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
        ...mapState('page',['authToken', 'authData']),
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
            .get(this.dynamic_route('/admin/investors-sale/all'), {
            filters: this.filters,
            }, {
                headers:{
                    authorization: `Bearer ${this.authToken}`

                }
            })
            .then(res => {
            this.loading = false
            this.investorsSale = res.data
            this.loading = false
            })
            .catch(err => {
                this.$toast.error(err.response.data.message, {
                    position: 'top-center',
                    timeout: 3000,
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
        toggle_status() {
            this.getAuthData();
            this.loading = true
            let payload = {
                user_id: this.current.user_id,
                mpg_id: this.current.mpg_id,
                user_property_id: this.current.user_property_id,
                buyer_id: this.authData.id,
                amount: this.current.paid_price
            }
            axios
            .post(this.dynamic_route('/admin/investors-sale/buy'), payload, {
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
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>