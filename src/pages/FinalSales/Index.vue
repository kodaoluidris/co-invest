<template>
    <v-app class="p-4">
        <h2 class="page-title">Property sale requests</h2>
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
                    <h5>Total Properties =</span> <span class="text-success font-weight-bolder" style="font-size: 22px">{{data.length}}</span></h5>
                    <div class="row" v-if="data.length">
                        <div 
                            class="col-md-3 mb-3"
                            v-for="(asset, i) in data"
                            :key="i" 
                        >
                            <div class="card">
                                <div class="card-body">
                                    <img :src="asset.image[0].image" style="width:100%" alt="">
                                    <div class="">
                                        <h5 class="mt-2">{{asset.name}}</h5>
                                        <div class="d-flex justify-content-between"><span class="badge badge-">{{asset.group_name}}</span> <span>Slot: {{asset.details.total_slot}}</span></div>
                                        <button v-if="asset.mpg_status == 'active'" @click="buyAssetDialog=true;asset_id=asset.mpg_id" class="btn btn-lg btn-outline-primary btn-block mt-5 font-weight-bolder">BUY</button>
                                        <div class="alert alert-sm alert-light-info text-h6 text-center mt-5 mb-0" v-else>
                                          Property Sold  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="alert alert-secondary shadow-sm">
                        You have no property sale requests
                    </div>
                </div>
                </Widget>
            </b-col>
        </b-row>

        <!-- delete user dialog -->
    <v-dialog
        v-model="buyAssetDialog"
        max-width="510"
    >
        <v-card>
            <v-card-title class="text-h5">
                <p class="text-success">Buy current property. </p>
                <p><small><b>Note: </b> This action is irreversible and will deactivate current group selling
                this property.</small></p>
            </v-card-title>

            <v-card-text>
            Are you sure you want to perform this operation ?
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color=" darken-1"
                text
                @click="buyAssetDialog = false"
            >
                No, exit
            </v-btn>

            <v-btn
                color="primary darken-1"
                text
                @click="buyAsset(asset_id);buyAssetDialog=false"


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
            asset_id: '',
            buyAssetDialog: false
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
            .get(this.dynamic_route('/main_properties/property_sale/list'),
            {
                headers:{
                    authorization: `Bearer ${this.auth_token}`
                }
            }
            )
            .then(res => {
                this.data=res.data;
            })
            .catch(err => {
            })
            .finally(() => {
                this.loading = false
            })
        },
        buyAsset(){
            this.loading = true
            axios.post(this.dynamic_route('/main_properties/property_sale/buy'), {id: this.asset_id}, {
                    headers:{
                        authorization: `Bearer ${this.auth_token}`
                    }
                }).then(()=> {
                    this.$toast.success('Property bought successfully!', {
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
                    this.fetchData()
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
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>