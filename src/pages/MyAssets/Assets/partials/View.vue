/* eslint-disable no-console */
<template>
   <v-app>
       <!-- <Widget></Widget> -->
       <div class="float-right text-right">
            <div class="dropdown">
            <button class="btn " role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="mdi mdi-menu" style="font-size:1.4rem"></i>

            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <button class="dropdown-item color-inherit" v-if="propertyYearInfo[0].value == currentYear" @click="openConfirm3=true" >Sell Property</button>
                <button class="dropdown-item color-inherit" v-else @click="openConfirm1=true" >Sell your portion</button>
                <button class="dropdown-item" >Track quick sale history</button>
                <button class="dropdown-item" >Something else here</button>
            </div>
        </div>
       </div>
       <div class="row px-2" style="margin-top:20px">
            <VueElementLoading
            :active="loading"
            spinner="bar-fade-scale"
            color="var(--primary)"
            text="Loading.."
            duration="0.6"
          />
           <div class="col-md-8 mb-3">
               <div class="alert alert-info" v-if="data.final_sale_user_id == this.auth_data.id">
                   <h6>
                       <i class="fa fa-info-circle mr-2"></i>
                       You have initiated a sell request for this property. Awaiting confirmation from
                       other group members
                   </h6>
               </div>
               <div v-if="data.final_sale_user_id && data.final_sale_user_id != this.auth_data.id">
                   <div class="alert alert-info pb-1" v-if="getUserStatus(data.accepts_user_id, auth_data.id) == 'pending approval'">
                        <h6>
                            <i class="fa fa-info-circle mr-2"></i>
                            A sell request has been initiated for this property by a group member and awaiting your approval.
                            <button @click="approveSale=true" class="btn btn-success font-weight-bold ml-3"><i class="fa fa-check"></i> Approve</button>
                        </h6>
                    </div>
                    <div class="alert alert-warning pb-1" v-else>
                        <h5>
                            <i class="fa fa-info-circle mr-2"></i>
                            You have approved the sale of this property
                        </h5>
                    </div>
               </div>
               <div class="card shadow-sm border-0">
                   <div class="card-body">
                        <v-carousel v-if="items.length >0">
                            <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item.src"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                            ></v-carousel-item>
                        </v-carousel>
                        <h2 class="my-3">{{data.name}} <span class="badge badge-info">{{data.group_name}}</span></h2>
                        <p class="text-muted" v-html="data.description">
                        </p>
                   </div>
               </div>
           </div>
           <div class="col-md-4">
               <div class="client-area">
                    <div class="property-sidebar scroll-area-xl">
                        <div class="single-sidebar">
                            <div class="section-title sidebar-title">
                                <h5>Group Members ({{data.members.length}})</h5>
                            </div>
                            <div class="top-agent" v-if="data.members.length">
                                <div class="ta-item" v-for="(member,i) in data.members" :key="i">
                                    <div class="ta-pic set-bg" style="background-image: url(&quot;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYhGP5eN3CABVLqXCjVZT_CfIC_wzNK_f4M9Bc4Yd4E6NchqqZfWegamZO77KedEldT0&usqp=CAU&quot;);"></div>
                                    <div class="ta-text" >
                                        <h6 class="pr-1">
                                            <a href="#">{{member.fname + ' ' + member.lname}}</a>
                                             <span 
                                                v-if="member.mem_user_id == auth_data.id"
                                                class="badge float-right text-white badge-sm badge-secondary"
                                            >
                                                You
                                            </span> 
                                        </h6>
                                        <span>Member</span>
                                        <div class="ta-num">{{member.email}}</div>
                                        <div class="ta-num mt-1">Total Slot: {{member.total_slot}}
                                        </div>
                                        <div class="mt-1" style="width: 60%">
                                            <span v-if="data.accepts_user_id" style="font-size: 12px; font-weight: normal" class="badge badge-pill text-capitalize text-white badge-sm badge-warning">
                                                {{getUserStatus(data.accepts_user_id, member.mem_user_id )}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="alert alert-secondary shadow-sm">
                                Currently, this group doesn't have any member.
                                <p class="mt-3">BE THE FIRST MEMBER</p>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
       </div>
       <div class="row px-2" style="margin-top:20px">
           <!-- <div class="col-12">
            <Chat @messagesent="fetchMessages"  :user="auth_data" :token="auth_token" :mainPropertyId="data.mpg_id"/>

            </div> -->
       </div>

       <!-- DIALOGS -->
       <v-dialog
            v-model="openConfirm1"
            max-width="390"
        >
            <v-card>
                <v-card-title class="text-h4 text-success">
                    Quick Sale
                </v-card-title>

                <v-card-text>
                 Are you sure you want to sell your portion in this property ?
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
                    @click="openConfirm1=false;openConfirm2=true;"


                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
        v-model="openConfirm2"
        max-width="500px"
      >
        <v-card>
          <v-card-title style="font-weight:300">
            Tell us why you want to sell your property portion.
          </v-card-title>
          <v-card-text>
            <v-textarea
                solo
                v-model="description"
                rows="3"
                row-height="30"
                label="In a brief sentence."
                auto-grow
                shaped
                name="input-7-4"
             ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="promptPortionSale();openConfirm2=true"
            >
              Continue
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
        <v-dialog
            v-model="openConfirm3"
            max-width="560"
        >
            <v-card>
                <v-card-title class="text-h5 text-success">
                    <p>Sell Property </p>
                    <p><small><b>Note: </b> Selling this property requires the consent and confirmation of all other group members.
                    Your confirmation only notifies the other group members of the sale.
                    </small></p>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="openConfirm3 = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="initializeSales();openConfirm3=false"
                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="approveSale"
            max-width="560"
        >
            <v-card>
                <v-card-title class="text-h5 text-success">
                    <p>Approve Property Sale </p>
                    <p><small><b>Note: </b> This action cannot be reversed once initiated.
                    </small></p>
                </v-card-title>

                <v-card-text>
                    Are you sure you want to perform this operation ?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color=" darken-1"
                    text
                    @click="approveSale = false"
                >
                    No, exit
                </v-btn>

                <v-btn
                    color="primary darken-1"
                    text
                    @click="approveSales();approveSale=false"
                >
                    Yes, continue
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
   </v-app>
</template>
<script>
import Widget from '@/components/Widget/Widget';
import VueElementLoading from 'vue-element-loading'
import Chat from './Chat.vue'
import { mapState, mapActions } from 'vuex';
import axios from "axios"
export default {
    name: 'ViewInvestemt',
    components:{
        Widget,
        VueElementLoading, 
        Chat
    },
    data() {
        return {
            data:{ members:[]},
            items:[],
            openConfirm1:false,openConfirm2:false,openConfirm3:false,approveSale: false,
            description:'',
            loadModal:false,
            amount:0,
            currentYear: '',
            propertyYearInfo: {},
            processedProperty: {},
            group_users: [],
            loading: false
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
        this.fetchData(this.$route.params.id);
    },
    methods:{
        ...mapActions('auth', ['getAuthData']),
        closeMe() {
            this.$bvModal.hide("view");
        },
        fetchData(id) {
            this.loading = true
            axios
            .post(this.dynamic_route(`/client/my-investments/${id}`),
            {
                user_id: this.auth_data.id
            },
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
                this.data=res.data;
                this.amount =  Math.floor(parseInt(this.data.group_price/this.data.no_of_people));
                this.items = this.data.image.map(item => {
                    return {src: item.image}
                })
                const d = new Date();
                this.currentYear = d.getFullYear();
                this.propertyYearInfo = res.data.info.filter(el => el.name=='appreciate')
                this.group_users = res.data.info.filter(el => el.user_id =='appreciate')
            })
            .catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    return this.logoutUser();
                }
                if(err.status == 404) {
                    this.$toast.error('Cannot find an investment with the given Id!', {
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
                    return this.$router.push({name: 'Investment'});
                }
            })
            .finally(() => {
                this.loading = false
            })
        },
        promptPortionSale()
        {
            if(this.description == ""){
                this.$toast.error('Cannot process your request, you need to set a description to continue your process', {
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
                return;
            }
            this.loadModal=true;
            let payload ={
                user_property_id: this.$route.params.id,
                amount: this.amount,
                description: this.description
            }
            axios
            .post(this.dynamic_route(`/client/my-investments/quick-sale`),
            payload,
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
              if(res.status == 200) {
                this.loadModal=false;
                this.openConfirm2 = false;
                this.$toast.success('Action successful, you can click on track quick sale history to track your status  ', {
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
              }
            })
            .catch(err => {
                if(err.response.status == 405) {
                    this.$toast.error('Cannot process request. You have a pending sale', {
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
                    return;
                }
                this.$toast.error('Something went wrong please try again', {
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
            })
            .finally(() => {
                this.loadModal = false
                this.description=""
            })
        },
        initializeSales(){
            this.loading = true
            axios.post(this.dynamic_route('/client/my-investments/property-sale/initialize'), this.data, {
                    headers:{
                        authorization: `Bearer ${this.auth_token}`
                    }
                }).then(()=> {
                    this.$toast.success('Property sale initiated successfully!', {
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
                    this.fetchData(this.$route.params.id)
                })
                .catch((err) => {
                    if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                        return this.logoutUser();
                    }
                    this.$toast.error('An error occurred. Please try again!', {
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
                .finally(() => this.loading = false)
        },
        approveSales(){
            this.loading = true
            axios.post(this.dynamic_route('/client/my-investments/property-sale/approve'), this.data, {
                    headers:{
                        authorization: `Bearer ${this.auth_token}`
                    }
                }).then(()=> {
                    this.$toast.success('Property sale approved successfully!', {
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
                    this.fetchData(this.$route.params.id)
                })
                .catch((err) => {
                    if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                        return this.logoutUser();
                    }
                    this.$toast.error('An error occurred. Please try again!', {
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
                .finally(() => this.loading = false)
        },
        getUserStatus(data, userID) {
            let status = 'pending approval';
            data.forEach(el => {
                if(el.user_id == userID) {
                    status = el.status + ' property sale'
                }
            });
            return status
        },
        // confirmationFunction()
        // {

        // },
        
        // fetchMessages(){

        // }
    }
}
</script>
<style>
    .property-sidebar .single-sidebar {
        margin-bottom: 68px;
    }

        
    .property-sidebar .single-sidebar .top-agent .ta-item {
        overflow: hidden;
        margin-bottom: 30px;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-pic {
        height: 150px;
        width: 140px;
        float: left;
    }
    .set-bg {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: top center;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-text {
        overflow: hidden;
        border: 1px solid #ebebeb;
        border-left: none;
        height: 150px;
        padding-top: 16px;
        padding-left: 20px;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-text h6 {
        margin-bottom: 8px;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-text h6 a {
        color: #111111;
        font-weight: 700;
        text-transform: uppercase;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-text span {
        font-size: 14px;
        color: #888888;
        display: block;
        margin-bottom: 8px;
    }
    .property-sidebar .single-sidebar .top-agent .ta-item .ta-text .ta-num {
        font-size: 14px;
        color: #00C89E;
        font-weight: 500;
    }
</style>