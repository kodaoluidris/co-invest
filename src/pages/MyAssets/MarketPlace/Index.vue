<template>
    <v-app class="p-4">
        <h2 class="page-title">Marketplace</h2>
        <b-row>
            <b-col>
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
                                <div 
                                    v-for="(m, i) in data" 
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
                                                <button class="mx-1 btn btn-danger btn-sm" @click="reply_to_notification('notInterested',m.id)">Not Interested</button>
                                                <button class="mx-1 btn btn-success btn-sm" @click="reply_to_notification('interested',m.id)">Interested</button>

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
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                            <v-card-text>
                                An awesome title
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                            <v-card-text>
                               <h1> An even better title</h1>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>

                </div>
                </Widget>
            </b-col>
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
            data:[],
            tabs:null,

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
        this.fetchData();

    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        fetchData() {
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
                this.data=res.data[0];
            })
            .catch(err => {
            })
            .finally(() => {
                this.loading = false
            })
        },
        reply_to_notification(msg,id){
            this.fetchData();
            let payload = {
                msg,
                id,
                userId: this.authData.id
            }

            axios.post(this.dynamic_route('/client/my-investments/reply-sale-notification'),payload,{
                headers:{
                authorization: `Bearer ${this.authToken}`
                }
            })
            .then(res => {
                this.fetchData();
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
        }
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>