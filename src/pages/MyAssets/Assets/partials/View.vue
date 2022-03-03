<template>
   <v-app>
       <!-- <Widget></Widget> -->
       <div class="row px-2" style="margin-top:20px">
           <div class="col-md-8 mb-3">
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
                        <h2 class="my-3">{{data.name}}</h2>
                        <p class="text-muted" v-html="data.description">
                        </p>
                   </div>
               </div>
           </div>
           <div class="col-md">
               <div class="client-area">
                    <div class="property-sidebar scroll-area-xl">
                        <div class="single-sidebar">
                            <div class="section-title sidebar-title">
                                <h5>Group Members ({{data.members.length}})</h5>
                            </div>
                            <div class="top-agent" v-if="data.members.length">
                                <div class="ta-item" v-for="(member,i) in data.members" :key="i">
                                    <div class="ta-pic set-bg"   style="background-image: url(&quot;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYhGP5eN3CABVLqXCjVZT_CfIC_wzNK_f4M9Bc4Yd4E6NchqqZfWegamZO77KedEldT0&usqp=CAU&quot;);"></div>
                                    <div class="ta-text" >
                                        <h6><a href="#">{{member.fname + ' ' + member.lname}}</a></h6>
                                        <span>Member</span>
                                        <div class="ta-num">{{member.phone}}</div>
                                        <div class="ta-num mt-1">Total Slot: {{member.total_slot}}</div>
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
    data() {
        return {
            data:{},
            items:[],
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
                this.items = this.data.image.map(item => {
                    return {src: item.image}
                })
            })
            .catch(err => {
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
        height: 130px;
        width: 130px;
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
        height: 130px;
        padding-top: 26px;
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