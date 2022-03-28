<template>
    <Content>
        <div class="details-banner">
            <div class="wrapper">
                <div>
                    <div class="row">
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-2.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-2.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-4.jpg" alt="">
                        </div>
                        <div class="col-md-3 p-0">
                            <img src="/img/property/slider/ps-5.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- details -->
        <div class="container-fluid contain">
            <div class="row">
                <div class="col-lg-8">
                    <div class="pd-text">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="pd-title">
                                    <!-- <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
                                    <div class="label">For rent</div> -->
                                    <div v-if="data.name" class="pt-price">₦ {{data.group_price.toLocaleString()}} / ₦ {{calculatePaymentPrice}}</div>
                                    <h3 v-if="data.name">{{data.name}}</h3>
                                    <p><span class=",mdi mdi-map-marker-outline"></span> 3 Middle Winchendon Rd, Rindge, NH 03463</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="pd-social" >
                                    
                                    <button class="btn-special btn-lg" @click="buyNow"> BUY NOW</button> 
                                    <button class="btn-special btn-lg ml-3" @click="toggleShare" >
                                        <span class="fa fa-share "></span>
                                        SHARE</button>
                                            <span v-if="shareStatus" class="d-block mt-3">
                                                <ShareNetwork
                                                    v-for="network in networks"
                                                    :network="network.network"
                                                    :key="network.network"
                                                    :url="data.url"
                                                    :quote="sharing.quote"
                                                    :hashtags="sharing.hashtags"
                                                    :twitterUser="sharing.twitterUser"
                                                    :title="sharing.title"
                                                    :class="'btn btn-outline-primary ml-2'"
                                                >
                                                <i :class="network.icon"></i>
                                                </ShareNetwork>
                                            </span>       
                                </div>
                            </div>
                        </div>
                        <div class="pd-board">
                            <div class="tab-board">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Overview</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Description</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Amenities</a>
                                    </li> -->
                                </ul><!-- Tab panes -->
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="tab-details">
                                            <ul class="left-table"> 
                                                <li>
                                                    <span class="type-name">Paid Price</span>
                                                    <span class="type-value">₦ {{calculatePaymentPrice}}</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Property Type</span>
                                                    <span class="type-value">{{data.p_name}}</span>
                                                </li>
                                               
                                                <li>
                                                    <span class="type-name">Main property Price </span>
                                                    <span class="type-value">&nbsp; {{data.price}}</span>
                                                </li>
                                                 <li>
                                                    <span class="type-name">No of groups </span>
                                                    <span class="type-value">&nbsp;{{ data.groups}}</span>
                                                </li>
                                                <li>
                                                    <span class="type-name">Status</span>
                                                    <span class="type-value">{{data.status}}</span>
                                                </li>
                                                 <li>
                                                    <span class="type-name">Appreciated Amount (%)</span>
                                                    <span class="type-value">{{getAppPercentAmount().toLocaleString()}}</span>
                                                </li>
                                            </ul>
                                            <ul class="right-table" v-if="data.more_infos != null">
                                                <li v-for="(m, i) in data.more_infos" :key="i">
                                                    <span class="type-name">{{m.name}}</span>
                                                    <span class="type-value">{{m.value}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                                        <div class="tab-desc">
                                            <div v-html="data.description">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="property-sidebar scroll-area-xl">
                        <div class="single-sidebar">
                            <div class="section-title sidebar-title">
                                <h5>Group Members ({{data.members.length}})</h5>
                            </div>
                            <div class="top-agent" v-if="data.members.length">
                                <div class="ta-item" v-for="(member,i) in data.members" :key="i">
                                    <div class="ta-pic set-bg"   style="background-image: url(&quot;https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYhGP5eN3CABVLqXCjVZT_CfIC_wzNK_f4M9Bc4Yd4E6NchqqZfWegamZO77KedEldT0&usqp=CAU&quot;);"></div>
                                    <div class="ta-text" >
                                        <h6 class="pr-1">
                                            <a href="#">{{member.fname + ' ' + member.lname}}</a> 
                                            <span 
                                                v-if="auth_data && member.user_id == auth_data.id"
                                                class="badge float-right text-white badge-sm badge-secondary"
                                            >
                                                You
                                            </span> 
                                        </h6>
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
        <!--  End of details-->
        <!-- Modal -->
        <b-modal id="authenticateUser" size="md" hide-footer title="Authentication">
            <authenticateUser :my_moal="$bvModal" @authenticated="contiueProcess" />
        </b-modal>
    </Content>
</template>

<script>
import Content from '@/pages/Client/Layout/Content'
import axios from "axios";
import { mapState, mapActions} from "vuex";
import authenticateUser from "@/pages/Auth/Authenticate.vue"
export default {
    components: {
        Content,authenticateUser
    },
    data() {
        return {
            data:{},
            shareStatus: false,
            link :'https://youtube.com',
              sharing: {
                url: 'https://youtube.com',
                title: 'This is *CoInvest* Platform where people come together to get investment at an affordable amount ',
                description: 'This is *CoInvest* your number one Real Estate Agency Platform',
                quote: 'Get investnment today and be safe',
                hashtags: 'vuejs,vite,javascript',
                twitterUser: 'youyuxi'
            },
            networks: [
                { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f' },
                { network: 'linkedin', name: 'LinkedIn', icon: 'fab fah fa-lg fa-linkedin' },
                { network: 'messenger', name: 'Messenger', icon: 'fab fah fa-lg fa-facebook-messenger' },
                { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype' },
                { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane' },
                { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter' },
                { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp' },
            ],
        }
    },
    computed : {
        calculatePaymentPrice(){
            return Math.floor(parseInt(this.data.group_price/this.data.no_of_people)).toLocaleString();
        },
        ...mapState('auth', ['auth_token', 'auth_data']),

    },
     mounted(){
        this.getAuthData()
        this.fetchData(parseInt(this.$route.params.mainGroupPropertyId));
    },
    methods: {
        ...mapActions('auth', ['getAuthData']),
        fetchData(id){
            axios.get(this.dynamic_route(`/client/main-property-group/${id}`))
            .then(res => {
                if(res.status == 208) {
                    this.$toast.error('There\'s no slot left in this Main property !', {
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

                    return this.$router.push({name: 'MainPropertyDetails', params:{mainPropertyId: res.data.data.mp_id}})
                }
                this.data = res.data.data;
            }).catch((err) => {
                if(err.response.status == 404) {
                    this.$toast.error('Main property group not found!', {
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
                }
              
            })
        },
        buyNow() {
            this.getAuthData()
            if(!this.auth_token) {
                return this.authenticateUser()
            }
            this.$router.push({name: 'BuyNow', params:{id:this.data.id}});
            localStorage.setItem('checkout_data', JSON.stringify(this.data))
        },
        authenticateUser() {
            this.$bvModal.show('authenticateUser');
        },
        toggleShare(){
            this.shareStatus = !this.shareStatus
        },
        closeMe(){
            this.$bvModal.hide('authenticateUser')

        },
        contiueProcess() {
            this.closeMe();
            this.$router.push({name: 'BuyNow', params:{id:this.data.id}});
            localStorage.setItem('checkout_data', JSON.stringify(this.data))

        },
         getAppPercentAmount(){
             var group_price =parseInt(this.data.group_price/this.data.no_of_people);
             var appreciate = this.data.more_infos.find(ele=>{
                return ele.name.toLowerCase() == 'percent' 
            });

            return (Number(group_price)/100) * Number(appreciate.value)+group_price
            
        },
    }
}
</script>
<style scoped>
.wrapper {
    padding: 5.9rem 0;
}
.pd-text .pd-title {
    position: relative;
    margin-bottom: 65px;
}
.pd-text .pd-title .pt-price {
    font-size: 20px;
    font-weight: 700;
    color: #00C89E;
    margin-bottom: 10px;
    display: inline-block;
}
.pd-text .pd-title .pt-price span {
    font-size: 14px;
    color: #666666;
    font-weight: 400;
}
.pd-text .pd-title h3 {
    margin-bottom: 6px;
    font-weight: 700;
    color: #111111;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
    font-size: 30px;
}
.pd-text .pd-title p {
    font-weight: 500;
}
.pd-text .pd-title p span {
    color: #00C89E;
}
.pd-text .pd-social {
    text-align: right;
    padding-top: 40px;
    margin-bottom: 30px;
}
.btn-special {
    height: 50px;
    width: 150px;
    background: #00C89E;
    color: #ffffff;
    font-size: 18px;
}
.btn-special:hover {
    background: #06a784;
}
.pd-text .pd-board {
    margin-bottom: 65px;
}
.pd-text .pd-board .tab-board .nav-tabs {
    background: #113220;
    border-bottom: none;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item {
    margin-bottom: 0;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item a.active {
    color: #ffffff;
    background: #00C89E;
    border-top-right-radius: 0 !important;
}
.pd-text .pd-board .tab-board .nav-tabs .nav-item a {
    font-size: 17px;
    color: #ffffff;
    display: inline-block;
    padding: 22px 32px;
    border: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    font-weight: 700;
}
.pd-text .pd-board .tab-board .tab-content .tab-details {
    border: 1px solid #e1e1e1;
    overflow: hidden;
    border-top: none;
}
ul, ol {
    padding: 0;
    margin: 0;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul {
    width: 50%;
    float: left;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li {
    font-size: 15px;
    list-style: none;
    font-weight: 500;
    color: #000000;
    padding: 18px 0;
    padding-left: 30px;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul.left-table li:nth-child(even) {
    background: #f7f7f7;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li .type-name {
    color: #111111;
    width: 148px;
    display: inline-block;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul li .type-value {
    color: #00C89E;
    display: inline-block;
}
.pd-text .pd-board .tab-board .tab-content .tab-details ul.right-table li:nth-child(odd) {
    background: #f7f7f7;
}

.property-sidebar .single-sidebar {
    margin-bottom: 68px;
}
.section-title.sidebar-title {
    margin-bottom: 36px;
}
.section-title.sidebar-title h5 {
    font-family: "Lato", sans-serif;
}
.section-title h4, .section-title h5, .section-title h6 {
    color: #111111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 20px;
}
.section-title.sidebar-title h5:after {
    height: 36px;
    top: -8px;
}
.section-title h4:after, .section-title h5:after, .section-title h6:after {
    position: absolute;
    left: 0;
    /* top: -9px; */
    width: 5px;
    /* height: 46px; */
    background: #00C89E;
    content: "";
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
.pd-text .pd-board .tab-board .tab-content .tab-desc {
    border: 1px solid #e1e1e1;
    overflow: hidden;
    border-top: none;
    padding: 22px 20px;
}
.pd-text .pd-board .tab-board .tab-content .tab-desc p {
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    color: #666666;
    font-weight: 400;
    line-height: 24px;
    margin: 0 0 15px 0;
}
.tab-content > .tab-pane {
    padding: 0 !important;
}
.scrollable-element {
  scrollbar-width: thin;
}
</style>