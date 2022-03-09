<template>
    <Content>
        <div class="details-banner" style="margin-top: 100px;">
            <div class="wrapper">
                <div class="container" v-if="auth_data.lname">
                   <div class="card border-0 shadow-sm">
                       <div class="card-body px-5">
                            <h3>Hi, {{auth_data.fname + ' ' + auth_data.lname}}</h3>
                            <div class="alert alert-secondary my-3">
                                <b>Note </b> You're about to pay ₦ {{calculatePaymentPrice}} for this main property. Below are some
                                brief details about the main property.
                            </div>
                           <div class="row">
                            <div class="col-md-6 my-2">
                                <table class="p-4 border  table-response-sm table table-striped">
                                    <tbody>
                                        <tr class="mb-5">
                                            <th>Main Property Name</th>
                                            <td>{{data.name}}</td>
                                        </tr>
                                        <tr>
                                            <th>Property Type Name</th>
                                            <td>{{data.p_name}}</td>
                                        </tr>
                                            <tr>
                                            <th>Actual Price</th>
                                            <td>₦{{data.price.toLocaleString()}}</td>
                                        </tr>
                                        <tr>
                                            <th>Group Price</th>
                                            <td>₦{{data.group_price.toLocaleString()}}</td>
                                        </tr>
                                        <tr>
                                            <th>Paid Amount</th>
                                            <td>₦{{calculatePaymentPrice}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div style="height:100%" class="d-flex  justify-content-center align-items-center text-center">
                                    <button 
                                        @click="checkout"
                                        class="shadow-sm btn btn-lg btn-block btn-success"
                                    >
                                        Proceed <b-spinner v-if="isLoading"/>
                                    </button>
                                </div>
                            </div>
                           </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    </Content>
</template>

<script>
import Content from '@/pages/Client/Layout/Content'
import { mapState, mapActions } from 'vuex';
import axios from "axios"

export default {
    components: {
        Content
    }, 
    data(){return {
        data:{},
        isLoading:false,
    }},
    computed:{
        ...mapState('auth', ['auth_data','auth_token']),
        calculatePaymentPrice(){
            return Math.floor(parseInt(this.data.group_price/this.data.no_of_people)).toLocaleString();
        },
    },
    methods:{
        ...mapActions('auth', ['getAuthData']),
        checkout() {
            this.isLoading=true;
            let payload ={
                user_id: this.auth_data.id,
                main_property_group_id:this.data.id,
                amount: Math.floor(parseInt(this.data.group_price/this.data.no_of_people))
            }

            axios.post(this.dynamic_route('/client/checkout'),payload,{
                headers:{
                    authorization: `Bearer ${this.auth_tokens}`
                }
            }).then(res => {
                if(res.status ==200) {
                    this.$toast.success('Main property bought successful', {
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
                    this.$router.push({name:'Investment'})
                    return this.isLoading=false;
                }
                this.isLoading=false;
            }).catch(err => {
                if(err.response.status == 401 && err.response.statusText == "Unauthorized") {
                    this.$toast.error('Login expired, please login again!', {
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
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                    return this.$router.push({name: 'Home'});
                }
                this.$toast.error('Something went wrong while processing your request, please try again later', {
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
                this.isLoading=false;
            })


        },
    },
    created (){
        this.data = JSON.parse(localStorage.getItem('checkout_data'))
    },
    mounted(){
        this.getAuthData()
    },
    
}
</script>