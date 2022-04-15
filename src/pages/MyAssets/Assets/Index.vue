<template>
    <v-app class="p-4">
        <h2 class="page-title">Your Investment</h2>
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
                    <h5>Total Investment {{data.length}}</h5>
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
                                        <div class="d-flex justify-content-between"><span class="badge badge-mprimary">{{asset.group_name}}</span> <span>Slot: {{asset.total_slot}}</span></div>
                                        <button @click="view_single_investment(asset.id)" class="btn btn-lg btn-primary btn-block mt-2 ">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="alert alert-secondary shadow-sm">
                        You have no investment
                    </div>
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
            .post(this.dynamic_route('/client/my-investments/all'),
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
            })
            .catch(err => {
            })
            .finally(() => {
                this.loading = false
            })
        },
        view_single_investment(id)
        {
            this.$router.push({name: 'ViewInvestment', params:{id: id}})
        }
    },
}
</script>
<style scoped>
   .modal-body {
       background: white !important;
   }
</style>