<template>
    <v-app class="p-4">
        <h2 class="page-title">Marketplace</h2>
        <b-row>
            <b-col cols="12">
                <Widget
                title=""
                customHeader
                >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                <div class="py-2">
                   <template>
                        <v-tabs
                        v-model="tabs"
                        centered
                        >
                        <v-tab
                            v-for="n in ['Quick Sales', 'Your Quick Sales']"
                            :key="n"
                        >
                            {{ n }}
                        </v-tab>
                        </v-tabs>
                    </template>
                      <v-tabs-items v-model="tabs">
                        <v-tab-item>
                            <v-card flat class="py-3">
                                <div v-if="allMarketPlace.length">
                                    <div 
                                        v-for="(m, i) in allMarketPlace" 
                                        :key="i"
                                        class=" px-md-3 py-md-3 border-bottom"
                                    >
                                        <div class="head">
                                            <span class="b-avatar badge-secondary rounded-circle" style="width: 1.2rem; height: 1.2rem;"><svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="person fill" aria-hidden="true" alt="avatar" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-person-fill b-icon bi"><g><path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></g></svg>
                                            </span>
                                            <span class="ml-2"><b>{{m.fname + ' ' + m.lname}}</b></span>

                                        </div>
                                        <div class="sub-desc pt-5">
                                            <p class="mb-2 text-muted">Price</p>
                                            <div class="mt-2 d-md-flex justify-content-between ">
                                            <h3 class="font-weight-light">₦  {{m.amount}}</h3>
                                                <div v-if="m.mpg_status =='active'">
                                                    <div v-if="m.status_action == null">
                                                        <button class="mx-1 btn btn-success btn-sm" @click="reply_to_notification('interested',m.id, m.mpg_id)">Interested</button>
                                                        <button class="mx-1 btn btn-danger btn-sm" @click="reply_to_notification('notInterested',m.id,m.mpg_id)">Not Interested</button>
                                                        
                                                    </div>
                                                    <div v-else>
                                                        <button 
                                                            class="btn" 
                                                            disabled
                                                            :class="{
                                                                'btn-danger': m.status_action =='notInterested',
                                                                'btn-success': m.status_action =='interested',
                                                            }
                                                        ">{{m.status_action}}</button>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <p class="text-danger">
                                                        Group Deactivated, no actions can be made.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pt-5 desc">
                                            <p class="mb-2 text-muted">Description</p>

                                            <h4>{{m.name}}</h4>
                                            <span class="badge badge-info">{{m.group_name}}</span>
                                            <p data-toggle="collapse" :data-target="'#demo'+i" class="mt-2 mb-0" style="cursor:pointer">click to view sale description</p>
                                            <div :id="'demo'+i" class="collapse">
                                                <p class="pt-2 text-muted">
                                                    {{m.description}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center alert alert-secondary">
                                    <h4>No record found</h4>
                                </div>
                               
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <div v-if="marketPlaceTransaction.length">
                                    <div 
                                        v-for="(m, i) in marketPlaceTransaction" 
                                        :key="i"
                                        class=" px-md-3 py-md-3 border-bottom"
                                    >
                                       
                                        <div class="sub-desc pt-5">
                                            
                                            <div class="mt-2 ">
                                                <div class="head">
                                                    <h5>{{m.mp_name}} <span class="badge badge-info badge-pill">{{m.group_name}}</span></h5>
                                                    
                                                    <!-- <span class="ml-2"><b>{{m.buyer_fname + ' ' + m.buyer_lname}}</b></span> -->
                                                    <p class="mb-1 mt-4 text-muted">Price</p>
                                                    <h5 class="font-weight-light">₦  {{Number(m.amount).toLocaleString()}}</h5>
                                                    <p class="mt-5 mb-1 text-muted">Interactors</p>
                                                    <div v-if="m.mpg_status == 'active'">
                                                        <table 
                                                            v-if="m.interactors.length"
                                                            style="width:100% !important" 
                                                            class=" table table-responsive-sm table-hover table-striped">
                                                            <tr>
                                                                <th>Contact Info</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            <tr v-for="(inv, index) in m.interactors" :key="index">
                                                                <td>
                                                                    <p class="text-muted mb-1">{{inv.buyer_fname + ' ' + inv.buyer_lname}}</p>
                                                                    <p class="text-muted mb-1">{{inv.buyer_email}}</p>

                                                                </td>
                                                                <td>
                                                                    <span
                                                                        class="badge badge-spill"
                                                                        :class="{
                                                                            'badge-danger': inv.status_action =='notInterested',
                                                                            'badge-warning': inv.status_action =='interested',
                                                                        }"
                                                                        
                                                                    >
                                                                        {{inv.status_action =='notInterested' ? 'Not Interested' : inv.status_action}}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                        :disabled="inv.status_action =='notInterested'" 
                                                                        class="btn btn-success btn-sm"
                                                                        @click="
                                                                            openConfirm1=true;
                                                                            currentMarketPlaceTransaction={
                                                                                quick_sale_id:m.id,
                                                                                user_id: m.owner_id,
                                                                                buyer_id:inv.user_id,
                                                                                quick_sale_history_id:inv.id,
                                                                                status_action:inv.status_action,
                                                                                fullName: inv.buyer_fname + ' ' + inv.buyer_lname
                                                                            }
                                                                        "
                                                                    >
                                                                        {{inv.status_action == 'notInterested' ? 'No Action' : 'Sell to'}}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                        <div v-else class="alert alert-secondary shadow-sm">
                                                            <h4>No Interactors Yet</h4>
                                                        </div>
                                                        <div v-if="m.no_interest" class="alert alert-info">
                                                            <p>
                                                                Our system has flagged this quick sale as <b>None Interactive.</b>
                                                            </p>
                                                            <p>
                                                                Since no one in your group showed interest to buy, dont worry. Your quick sale details has been pushed
                                                                to the Admin. They will take it from there.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="m.mpg_status =='inactive'" class="alert alert-danger shadow-sm">
                                                            <h4>This group has being deactivated, contact the admin for more info</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center alert alert-secondary">
                                    <h4>No record found</h4>
                                </div>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                </div>
                
                </Widget>
            </b-col>
             <b-col cols="12">
            <h5>Histories</h5>

                <Widget
                title=""
                customHeader
                >
                <VueElementLoading
                    :active="loading"
                    spinner="bar-fade-scale"
                    color="var(--primary)"
                    text="Loading.."
                    duration="0.6"
                />
                <div class="">
                   <template>
                        <v-tabs
                        v-model="tab2"
                        centered
                        >
                        <v-tab
                            v-for="n in ['Property sold for group member', 'Sold for Admin']"
                            :key="n"
                        >
                            {{ n }}
                        </v-tab>
                        </v-tabs>
                    </template>
                    <v-tabs-items v-model="tab2">
                        <v-tab-item>
                            <v-card flat class="py-3">
                                <div v-if="allMarketPlace.length">
                                    <div 
                                        v-for="(m, i) in allMarketPlace" 
                                        :key="i"
                                        class=" px-md-3 py-md-3 border-bottom"
                                    >
                                        <div class="head">
                                            <span class="b-avatar badge-secondary rounded-circle" style="width: 1.2rem; height: 1.2rem;"><svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="person fill" aria-hidden="true" alt="avatar" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-person-fill b-icon bi"><g><path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></g></svg>
                                            </span>
                                            <span class="ml-2"><b>{{m.fname + ' ' + m.lname}}</b></span>

                                        </div>
                                        <div class="sub-desc pt-5">
                                            <p class="mb-2 text-muted">Price</p>
                                            <div class="mt-2 d-md-flex justify-content-between ">
                                            <h3 class="font-weight-light">₦  {{m.amount}}</h3>
                                                <div v-if="m.status_action == null">
                                                    <button class="mx-1 btn btn-success btn-sm" @click="reply_to_notification('interested',m.id, m.mpg_id)">Interested</button>
                                                    <button class="mx-1 btn btn-danger btn-sm" @click="reply_to_notification('notInterested',m.id,m.mpg_id)">Not Interested</button>
                                                    
                                                </div>
                                                <div v-else>
                                                    <button 
                                                        class="btn" 
                                                        disabled
                                                        :class="{
                                                            'btn-danger': m.status_action =='notInterested',
                                                            'btn-success': m.status_action =='interested',
                                                        }
                                                    ">{{m.status_action}}</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="pt-5 desc">
                                            <p class="mb-2 text-muted">Description</p>

                                            <h4>{{m.name}}</h4>
                                            <span class="badge badge-info">{{m.group_name}}</span>
                                            <p data-toggle="collapse" :data-target="'#demo'+i" class="mt-2 mb-0" style="cursor:pointer">click to view sale description</p>
                                            <div :id="'demo'+i" class="collapse">
                                                <p class="pt-2 text-muted">
                                                    {{m.description}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center alert alert-secondary">
                                    <h4>No record found</h4>
                                </div>
                               
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <div v-if="marketPlaceTransaction.length">
                                    <div 
                                        v-for="(m, i) in marketPlaceTransaction" 
                                        :key="i"
                                        class=" px-md-3 py-md-3 border-bottom"
                                    >
                                       
                                        <div class="sub-desc pt-5">
                                            
                                            <div class="mt-2 ">
                                                <div class="head">
                                                    <h5>{{m.mp_name}} <span class="badge badge-info badge-pill">{{m.group_name}}</span></h5>
                                                    
                                                    <!-- <span class="ml-2"><b>{{m.buyer_fname + ' ' + m.buyer_lname}}</b></span> -->
                                                    <p class="mb-1 mt-4 text-muted">Price</p>
                                                    <h5 class="font-weight-light">₦  {{Number(m.amount).toLocaleString()}}</h5>
                                                    <p class="mt-5 mb-1 text-muted">Interactors</p>
                                                    <table 
                                                        v-if="m.interactors.length"
                                                        style="width:100% !important" 
                                                        class=" table table-responsive-sm table-hover table-striped">
                                                        <tr>
                                                            <th>Contact Info</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        <tr v-for="(inv, index) in m.interactors" :key="index">
                                                            <td>
                                                                <p class="text-muted mb-1">{{inv.buyer_fname + ' ' + inv.buyer_lname}}</p>
                                                                <p class="text-muted mb-1">{{inv.buyer_email}}</p>

                                                            </td>
                                                            <td>
                                                                <span
                                                                    class="badge badge-spill"
                                                                    :class="{
                                                                        'badge-danger': inv.status_action =='notInterested',
                                                                        'badge-warning': inv.status_action =='interested',
                                                                    }"
                                                                    
                                                                >
                                                                    {{inv.status_action =='notInterested' ? 'Not Interested' : inv.status_action}}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <button 
                                                                    :disabled="inv.status_action =='notInterested'" 
                                                                    class="btn btn-success btn-sm"
                                                                    @click="
                                                                        openConfirm1=true;
                                                                        currentMarketPlaceTransaction={
                                                                            quick_sale_id:m.id,
                                                                            user_id: m.owner_id,
                                                                            buyer_id:inv.user_id,
                                                                            quick_sale_history_id:inv.id,
                                                                            status_action:inv.status_action,
                                                                            fullName: inv.buyer_fname + ' ' + inv.buyer_lname
                                                                        }
                                                                    "
                                                                >
                                                                    {{inv.status_action == 'notInterested' ? 'No Action' : 'Sell to'}}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <div v-else class="alert alert-secondary shadow-sm">
                                                        <h4>No Interactors Yet</h4>
                                                    </div>
                                                    <div v-if="m.no_interest" class="alert alert-info">
                                                        <p>
                                                            Our system has flagged this quick sale as <b>None Interactive.</b>
                                                        </p>
                                                        <p>
                                                            Since no one in your group showed interest to buy, dont worry. Your quick sale details has been pushed
                                                            to the Admin. They will take it from there.
                                                        </p>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="text-center alert alert-secondary">
                                    <h4>No record found</h4>
                                </div>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                </div>
                
                </Widget>
            </b-col>
           
            <v-dialog
            v-model="openConfirm1"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h4">
                    Confirm  Action
                </v-card-title>

                <v-card-text>
                 Are you sure you want to sell this property to {{currentMarketPlaceTransaction.fullName}}  ?
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
                    @click="openConfirm1=false;soldTo()"


                >
                    Yes
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </b-row>

    </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
export default {
    components:{
        Widget,
        VueElementLoading
    },
    data(){
        return {
            filters: {},
            loading: false,
            allMarketPlace:[],
            marketPlaceTransaction:[],
            tabs:null,
            tab2:null,
            openConfirm1:false,
            currentMarketPlaceTransaction:{}

        }
    },
    computed:{
        ...mapState('auth',['auth_token', 'auth_data']),
        filter_price(val) {
            return val.toLocaleString()
        }
    },
    mounted() {
        this.getAuthData();
        this.fetchMarkets();
        this.fetchMyQuickSales();
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        fetchMarkets() {
            this.loading = true
            axios
            .post(this.dynamic_route('/client/market-place/all'),
            {
                id: this.auth_data.id
            },
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
                this.allMarketPlace=res.data;
            })
            .catch(err => {
             console.log(err)

            })
            .finally(() => {
                this.loading = false
            })
        },
        fetchMyQuickSales() {
            this.loading = true
            axios
            .post(this.dynamic_route('/client/market-place/my-quick-sales'),
            {
                id: this.auth_data.id
            },
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
                this.marketPlaceTransaction=res.data;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.loading = false
            })
        },
        reply_to_notification(msg,id, mpg){
            this.fetchMarkets();
            let payload = {
                msg,
                mpg,
                id,
                userId: this.auth_data.id
            }

            axios.post(this.dynamic_route('/client/my-investments/reply-sale-notification'),payload,{
                headers:{
                authorization: `Bearer ${this.authToken}`
                }
            })
            .then(res => {
                this.fetchMarkets();
            }).catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
                }
                this.$toast.error('Something went wrong, please try again later!', {
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
        },
        view_single_Marketplace(id)
        {
            this.$router.push({name: 'ViewMarketplace', params:{id: id}})
        },
        soldTo(){
            delete this.currentMarketPlaceTransaction.fullName

            axios.post(this.dynamic_route('/client/market-place/final-quick-sale'),this.currentMarketPlaceTransaction,{
                headers:{
                authorization: `Bearer ${this.authToken}`
                }
            })
            .then(res => {
                this.$toast.success('Congratulations. You have successfully sold this property!', {
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
                this.fetchMarkets();
                this.fetchMyQuickSales();
            }).catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                return this.logoutUser();
                }
                this.$toast.error('Something went wrong, please try again later!', {
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
        }
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>