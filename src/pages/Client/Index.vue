<template>
    <Content>
        <div class="landing-banner">
            <div class="bg">
                <div class="container-fluid contain">
                    <div class="row">
                        <div class="col-lg-7">
                            <h1 class="h1" style="font-family: 'Manrope', sans-serif; font-weight: 700;">
                                <strong>
                                    Become A Co-Investor with Pride Today
                                </strong>
                            </h1>
                            <h6 class="h6">We believe influencers, when worked with authentically, they produce the best brand stories. ViralGet handles all aspects of influencer programs from start to finish, and our suite of services can help you host a successful influencer
                            campaign. <br><br> Let’s Handle Yours!</h6>
                        </div>
                        <div class="col-lg-5 d-none d-lg-block">
                            <img style="width: 80%" src="img/coinvest1.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statictics section -->
            <section class="profile-section spad">
                <div class="container-fluid contain">
                    <div class="profile-agent-content">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="profile-agent-info">
                                    <div class="pi-pic">
                                        <!-- <img src="img/agents/profile-agent.jpg" alt=""> -->
                                        <div class="total-property">
                                            {{total_property}}
                                        </div>
                                        <!-- <div class="rating-point">
                                            4.5
                                        </div> -->
                                    </div>
                                    <div class="pi-text">
                                        <p class="mt-3">Total</p>
                                        <h5>Properties</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 scroll-area-xs">
                                <div class="profile-agent-widget">
                                    <ul>
                                        <li v-for="(a, index) in analytics" :key="index">
                                            {{a.property_name}}
                                            <span>{{a.property_count}}</span>
                                        </li>
                                        <!-- <li>Land <span>21</span></li>
                                        <li>House <span>35</span></li>
                                        <li>Shop <span>40</span></li> -->
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="profile-agent-newslatter">
                                    <h5>Search Property</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Search..">
                                        <button type="submit"><i class="fa fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        <!-- -->

        <!-- Property list section -->
        <section class="property-section profile-page spad">
            <div class="container-fluid contain">
                <div class="row">
                    <div class="col-lg-4" v-for="(p, i) in data.data" :key="i">
                        <div class="property-item">
                            <div class="pi-pic set-bg" :style="`background-image: url(&quot;${p.image[0].image}&quot;);`">
                            <!-- <div class="label">For rent</div> -->
                            </div>
                            <div class="pi-text">
                                <div class="pt-price">$ {{p.price.toLocaleString()}}</div>
                                <h5><b-link :to="{ name: 'MainPropertyDetails', params: { mainPropertyId: p.id}}">{{p.name}}</b-link></h5>
                                <p><span class="mdi mdi-map-marker-outline"></span> {{getLocation(p) && getLocation(p).value}}</p>
                                <table class="table">
                                    <tr  v-for="(m,i) in p.more_infos" :key="i">
                                        <th v-if="m.name.toLowerCase() != 'location'">{{m.name}}</th>
                                        <th v-if="m.name.toLowerCase() != 'location'">{{m.value }}</th>
                                    </tr>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- end of property list -->

    </Content>
</template>

<script>
import Content from '@/pages/Client/Layout/Content'
import { mapState, mapActions, mapGetters } from 'vuex';
import axios from "axios"
export default {
    components: {
        Content
    }, 
    data(){
        return {
            data:{}
        }
    },
    methods :{
        ...mapActions('analytics', ['getPropertiesAnalytics', 'getProperties']),
        fetchData()
        {
            axios.post(this.dynamic_route('/client/all-main-properties', {
                client_request:true
            })).then(res => {
                this.data = res.data.data.original.data;
            }).catch(() => {
            })
        },
        getLocation(data) {
            var dt = data.more_infos.find((el) => {
                return el.name.toLowerCase() == "location"
            });
            return (typeof dt == 'undefined')?null:dt
        },
    }, 
    mounted (){
        this.getPropertiesAnalytics(this.dynamic_route('/analytic/properties'));
        // this.getProperties(this.dynamic_route('/properties/all'));
        this.fetchData();
    },
    computed : {
        ...mapState('analytics', ['analytics', 'total_property', 'properties']),
    }
}
</script>

<style scoped>
.landing-banner {
    /* background-color: #1abc9c; */
    background-color: #F3ECEA;
    color: #ffffff;
    background: #282A35 url(https://www.w3schools.com/spaces/files/priscilla-du-preez-XkKCui44iM0-unsplash.921aa0c0.jpg) no-repeat fixed center;
}
.bg {
    /* background-color: #282A35; */
    background-color: #017db3;
    opacity: 0.96;
    margin: auto;
    padding: 7rem 0;
}
.h1 {
    font-size: 45px;
    font-weight: 800;
    line-height: 1.5;
    color: #fff;
}
.h6 {
    color: #fff;
    margin: 20px 0 0 0;
    font-size: 15px;
    line-height: 24px;
    width: 80% !important;
}
.property-section.profile-page {
    padding-top: 50px;
}
.spad {
    padding-top: 100px;
    padding-bottom: 100px;
}
.property-item {
    margin-bottom: 40px;
}
.property-item .pi-pic {
    height: 240px;
    position: relative;
    margin-bottom: 25px;
}
.set-bg {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
}
.property-item .pi-text {
    position: relative;
}
.property-item .pi-text .pt-price {
    font-size: 19px;
    font-weight: 700;
    color: #017db3;
    margin-bottom: 10px;
}
.property-item .pi-text .pt-price span {
    font-size: 14px;
    color: #666666;
    font-weight: 400;
}
.property-item .pi-text h5 {
    margin-bottom: 6px;
}
.property-item .pi-text h5 a {
    font-size: 20px;
    font-weight: 700;
    color: #111111;
    font-family: "Montserrat", sans-serif;
}
.property-item .pi-text p {
    font-weight: 500;
}
.property-item .pi-text p span {
    color: #017db3;
}
.property-item .pi-text ul {
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
}
.property-item .pi-text ul li {
    font-size: 15px;
    color: #111111;
    font-weight: 600;
    list-style: none;
    display: inline-block;
    margin-right: 45px;
}
.property-item .pi-text ul li i {
    font-size: 14px;
    color: #666666;
    margin-right: 5px;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
}
.property-pagination {
    text-align: center;
    padding-top: 10px;
}
.property-pagination a {
    display: inline-block;
    height: 46px;
    width: 46px;
    background: #f2f2f2;
    color: #111111;
    font-size: 20px;
    font-weight: 600;
    line-height: 46px;
    text-align: center;
    border-radius: 50%;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    margin-right: 6px;
}
.property-pagination a:last-child {
    margin-right: 0;
}
.property-pagination a.icon span {
    position: relative;
    top: 5px;
}
.property-pagination a span {
    font-size: 27px;
}
a {
    text-decoration: none !important;
}
.profile-section {
    padding-bottom: 0;
}
.profile-agent-content {
    padding: 30px 50px 30px 30px;
    border: 1px solid #e1e1e1;
}
.profile-agent-content .profile-agent-info {
    position: relative;
}
.profile-agent-content .profile-agent-info .pi-pic {
    width: 120px;
    height: 120px;
    float: left;
    margin-right: 30px;
}
.profile-agent-content .profile-agent-info .pi-pic img {
    border-radius: 50%;
    max-width: 100%;
}
.profile-agent-content .profile-agent-info .pi-pic .total-property {
    width: 120px;
    height: 120px;
    font-size: 34px;
    font-weight: 600;
    padding: 40px 0;
    color: #ffffff;
    background-image: linear-gradient(243deg, #343a40, #01a1e3);
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
}
.profile-agent-content .profile-agent-info .pi-pic .rating-point {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background: #00C89E;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
}
.profile-agent-content .profile-agent-info .pi-text {
    overflow: hidden;
    padding-top: 20px;
}
.profile-agent-content .profile-agent-info .pi-text h5 {
    color: #111111;
    font-weight: 700;
    margin-top: 10px;
    font-size: 20px;
}
.profile-agent-content .profile-agent-info .pi-text span {
    font-size: 12px;
    color: #2897bb;
    font-weight: 500;
}
.profile-agent-content .profile-agent-info .pi-text p {
    margin-bottom: 0;
    color: #111111;
    margin-top: 8px;
}
.profile-agent-content .profile-agent-info:after {
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 120px;
    background: #ebebeb;
    content: "";
}
.profile-agent-content .profile-agent-widget {
    padding-right: 50px;
    position: relative;
}
.profile-agent-content .profile-agent-widget ul {
    padding-top: 5px;
}
.profile-agent-content .profile-agent-widget ul li {
    list-style: none;
    font-size: 16px;
    color: #000000;
    font-weight: 500;
    line-height: 36px;
    overflow: hidden;
    -webkit-transition: all 22s;
    transition: all 0.2s;
}
.profile-agent-content .profile-agent-widget ul li span {
    font-weight: 600;
    float: right;
}
.profile-agent-content .profile-agent-widget:after {
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 120px;
    background: #ebebeb;
    content: "";
}
.profile-agent-content .profile-agent-newslatter {
    padding-top: 10px;
}
.profile-agent-content .profile-agent-newslatter h5 {
    color: #111111;
    font-weight: 700;
    margin-bottom: 25px;
}
.profile-agent-content .profile-agent-newslatter form {
    position: relative;
}
.profile-agent-content .profile-agent-newslatter form input {
    height: 50px;
    padding-left: 20px;
    font-size: 14px;
    color: #111111;
    background: #f5f5f5;
    border: none;
    width: 100%;
    font-weight: 500;
}
.profile-agent-content .profile-agent-newslatter form button {
    height: 50px;
    width: 50px;
    background-image: linear-gradient(243deg, #343a40, #01a1e3);
    color: #ffffff;
    font-size: 18px;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
}
</style>